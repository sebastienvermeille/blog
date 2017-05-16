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

    var url = window.location.href;

    if(url.indexOf("/howto/") > -1 && location.hash.indexOf("#") > -1) {
        var activeSection = location.hash;
        console.log("SECTION ACTIVE" + activeSection);
        $('div#summary a[href^='+activeSection+']').addClass("active");
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
        var id = $(this).attr('id');
        var section = $('<a href="#'+id+'" class="collection-item">'+title+'</a>');
        $('div#summary').append(section);
    });
});

// Smooth scroll
$(document).ready(function(){
    $('a[href^="#"]').on('click',function (e) {
        e.preventDefault();

        var target = this.hash;
        var $target = $(target);

        $('html, body').stop().animate({
            'scrollTop': $target.offset().top
        }, 900, 'swing', function () {
            window.location.hash = target;
        });
    });
});