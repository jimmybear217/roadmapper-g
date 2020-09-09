function loaderPageOverlay(status) {
    if (status == true) {
        document.getElementById('loader-page').style.display = "block";
    } else {
        document.getElementById('loader-page').style.display = "none";
    }
}

function switchPage(page) {
    if (page != 'loading')
    switchPage('loading');
    Array.from(document.getElementsByClassName('page')).forEach( (elem) => {
        elem.setAttribute('enabled', 'false');
    })
    if (document.getElementById('page-' + page)) {
        document.getElementById('page-' + page).dispatchEvent(new Event("load"))
        document.getElementById('page-' + page).setAttribute('enabled', 'true');
        navId = document.getElementById('page-' + page).getAttribute('data-navId');
        Array.from(document.getElementsByTagName('nav')[0].children).forEach( (elem) => {
            if (elem.id == 'nav-' + navId) {
                elem.setAttribute('enabled', 'true');
            } else {
                elem.setAttribute('enabled', 'false');
            }
            // console.log(elem.id, 'nav-' + navId, elem.getAttribute('enabled'));
        });
        history.pushState({ page: page }, "RoadMapper-G / " + page, "/webapp/#" + page);
    }
}

// on first load
if (document.location.hash) {
    page = document.location.hash.slice(1)
    // console.log("Loading #" + page)
    if (page == "loading")
        page = document.getElementById('page').getAttribute('data-homePage');
    switchPage(page)
} else {
    switchPage(document.getElementById('page').getAttribute('data-homePage'));
}
loaderPageOverlay(false)