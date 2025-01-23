// FORMAT PRICE FUNCTION
function formatPrice(price) {
    return new Intl.NumberFormat('en-US', {
        style: 'decimal',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    }).format(price);
}

// FETCH PRICES FROM COINGECKO API
function updatePrices() {
    const priceElements = {
        bitcoin: document.querySelectorAll('[id^="bitcoin"]'),
        ethereum: document.querySelectorAll('[id^="ethereum"]'),
        dogecoin: document.querySelectorAll('[id^="dogecoin"]')
    };

    const settings = {
        async: true,
        crossDomain: true,
        url: "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin%2Cethereum%2Cdogecoin&vs_currencies=usd",
        method: "GET",
        headers: {}
    };

    Object.values(priceElements).forEach(elements => {
        elements.forEach(el => el.innerHTML = "Loading...");
    });

    $.ajax(settings)
        .done(function (response) {
            Object.entries(priceElements).forEach(([coin, elements]) => {
                const price = formatPrice(response[coin].usd);
                elements.forEach(el => el.innerHTML = price);
            });
        })
        .fail(function (error) {
            console.error("Failed to fetch prices:", error);
            Object.values(priceElements).forEach(elements => {
                elements.forEach(el => el.innerHTML = "Error");
            });
        });
}

updatePrices();

setInterval(updatePrices, 30000);


// CODE FOR MOBILE NAVIGATION
document.querySelector('.hamburger').addEventListener('click', function() {
    this.classList.toggle('active');
    document.querySelector('.mobile-nav').classList.toggle('active');
    document.querySelector('.overlay').classList.toggle('active');
});

document.querySelector('.overlay').addEventListener('click', function() {
    document.querySelector('.hamburger').classList.remove('active');
    document.querySelector('.mobile-nav').classList.remove('active');
    this.classList.remove('active');
});

window.addEventListener('resize', function() {
    if (window.innerWidth > 768) {
        document.querySelector('.hamburger').classList.remove('active');
        document.querySelector('.mobile-nav').classList.remove('active');
        document.querySelector('.overlay').classList.remove('active');
    }
});

// CODE FOR MOBILE NAVIGATION LINKS TO CLOSE NAVIGATION ON CLICK
document.querySelectorAll('.mobile-nav ul li a').forEach(link => {
    link.addEventListener('click', () => {
        document.querySelector('.hamburger').classList.remove('active');
        document.querySelector('.mobile-nav').classList.remove('active');
        document.querySelector('.overlay').classList.remove('active');
    });
});

document.querySelectorAll('.mobile-nav h2 a').forEach(link => {
    link.addEventListener('click', () => {
        document.querySelector('.hamburger').classList.remove('active');
        document.querySelector('.mobile-nav').classList.remove('active');
        document.querySelector('.overlay').classList.remove('active');
    });
});