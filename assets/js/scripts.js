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

// HOWTO Page


$(function() {

    if ( $( "#howtos-container" ).length ) {
        var mixer = mixitup('#howtos-container');
    }

    $('h2').each(function(){
        var title = $(this).text();
        console.log(title);

        var section = $('<a href="#'+title+'" class="collection-item">'+title+'</a>');
        $('div#summary').append(section);
    });
});

