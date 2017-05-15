function locationHashChanged() {
    if (location.hash.indexOf("#filter=") > -1) {

        var filter = location.hash;
        var splitted = filter.split('=');
        filter = splitted[1];

        if(filter){

            $('#howtos-container > li').each(function(){
                var tags = $(this).attr('data-tags');
                console.log(tags);
                if($.inArray(filter, tags)> -1){
                    // is concerned
                    $(this).style.display = 'hidden';
                } else{
                    $(this).style.display = 'block';
                }
            });
        }

    }
}

window.addEventListener("hashchange", locationHashChanged, false);