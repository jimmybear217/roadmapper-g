function loaderPageOverlay(status) {
    if (status == true) {
        document.getElementById('loader-page').style.display = "block";
    } else {
        document.getElementById('loader-page').style.display = "none";
    }
}

function switchPage(page) {
    if (page != 'loading') switchPage('loading');
    Array.from(document.getElementsByClassName('page')).forEach( (elem) => {
        elem.setAttribute('enabled', 'false');
    })
    if (document.getElementById('page-' + page)) {
        document.getElementById('page-' + page).setAttribute('enabled', 'true');
        navId = document.getElementById('page-' + page).getAttribute('data-navId');
        Array.from(document.getElementsByTagName('nav')[0].children).forEach( (elem) => {
            if (elem.id == 'nav-' + navId) {
                elem.setAttribute('enabled', 'false');
            } else {
                elem.setAttribute('enabled', 'false');
            }
        });
    }
}


switchPage(document.getElementById('page').getAttribute('data-homePage'));
loaderPageOverlay(false)