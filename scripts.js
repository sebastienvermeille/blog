function locationHashChanged() {
    if (location.hash.indexOf("#filter=") > -1) {

        var filter = location.hash;
        alert(filter);
    }
}

window.addEventListener("hashchange", locationHashChanged, false);