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

        $('div#summary a').each(function(){
            var href = $(this).attr('href');
            if(href == activeSection && !$(this).hasClass('active')) {
                $(this).addClass("active");
            } else {
                $(this).removeClass('active');
            }
        });
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

$(document).bind('scroll',function(e){
    $('h2').each(function(){
        if (
            $(this).offset().top < window.pageYOffset + 10
            //begins before top
            && $(this).offset().top + $(this).height() > window.pageYOffset + 10
            //but ends in visible area
            //+ 10 allows you to change hash before it hits the top border
        ) {
            window.location.hash = $(this).attr('id');
        }
    });
});

// Detect adblock
if( window.canRunAds === undefined ){
    // adblocker detected, show fallback
    console.info("ADBLOCK DETECTED :)");
}

//----------------------------------------------------------
// Quotes
//----------------------------------------------------------
// Returns a random number betweein min (incl) and max (excl)
function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
}

$(document).ready(function(){

    $.getJSON( "../../quotes.json", function( data ) {
        console.log(data);
        var index = getRandomArbitrary(0, data.length);
        $('footer > blockquote').text('');
        $('footer > blockquote').append(data[index].quote, '<span class="typed-cursor"></span>', '<p class="white-text right author">'+data[index].author+'</p>');

    });


});

