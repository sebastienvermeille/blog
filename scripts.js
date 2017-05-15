function locationHashChanged() {
    if (location.hash.indexOf("#filter=") > -1) {

        var filter = location.hash;
        var splitted = filter.split('=');
        filter = splitted[1];

        if(filter){
            //
            // $('#howtos-container > li').each(function(){
            //     var tags = JSON.parse($(this).attr('data-tags'));
            //     console.log(tags);
            //     if($.inArray(filter, tags)> -1){
            //         // is concerned
            //         if($(this).is(":hidden")){
            //             $(this).show();
            //         }
            //     } else{
            //         if($(this).is(":visible")){
            //             $(this).fadeOut( "slow" );
            //         }
            //     }
            // });
        }

    }
}

window.addEventListener("hashchange", locationHashChanged, false);