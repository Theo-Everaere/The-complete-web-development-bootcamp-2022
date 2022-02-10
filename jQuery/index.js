$(document).keypress(function (e) {
    console.log(e.key);
    $('h1').text(e.key);
});

// checker la doc sur w3School