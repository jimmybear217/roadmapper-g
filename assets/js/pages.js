function loaderPageOverlay(status) {
    if (status == true) {
        document.getElementById('loader-page').style.display = "block";
    } else {
        document.getElementById('loader-page').style.display = "none";
    }
}

function switchPage(page) {
    if (page != 'loading') switchPage('loading')
    Array.from(document.getElementsByClassName('page')).forEach( (elem) => {
        elem.setAttribute('enabled', 'false');
    })
    document.getElementById('page-' + page).setAttribute('enabled', 'true');
}


switchPage(document.getElementById('page').getAttribute('data-homePage'));
loaderPageOverlay(false)