

"use strict";

var $window = $(window),
    $document = $(document),
    $body = $('body'),
    $fullScreen = $('.fullscreen-banner') || $('.section-fullscreen'),
    $halfScreen = $('.halfscreen-banner');


$.fn.exists = function() {
    return this.length > 0;
};



function preloader() {
    $('#ht-preloader').fadeOut();
};


function dropdown() {
    $('.dropdown-menu a.dropdown-toggle').on('click', function(e) {
        if (!$(this).next().hasClass('show')) {
            $(this).parents('.dropdown-menu').first().find('.show').removeClass("show");
        }
        var $subMenu = $(this).next(".dropdown-menu");
        $subMenu.toggleClass('show');

        $(this).parents('li.nav-item.dropdown.show').on('hidden.bs.dropdown', function(e) {
            $('.dropdown-submenu .show').removeClass("show");
        });

        return false;
    });
};



function fullScreen() {
    if ($fullScreen.exists()) {
        $fullScreen.each(function() {
            var $elem = $(this),
                elemHeight = $window.height();
            if ($window.width() < 768) $elem.css('height', elemHeight / 1);
            else $elem.css('height', elemHeight);
        });
    }
    if ($halfScreen.exists()) {
        $halfScreen.each(function() {
            var $elem = $(this),
                elemHeight = $window.height();
            $elem.css('height', elemHeight / 2);
        });
    }
};


function counter() {
    $('.count-number').countTo({
        refreshInterval: 2
    });
};


function bannerslider() {
    $('.banner-slider').each(function() {
        var $carousel = $(this);
        $carousel.owlCarousel({
            items: 1,
            loop: true,
            dots: $carousel.data("dots"),
            nav: $carousel.data("nav"),
            autoplay: true,
            autoplayTimeout: 6000,
            navText: ['<span class="las la-angle-left"><span>', '<span class="las la-angle-right"></span>'],
        });
    });
};




function owlcarousel() {
    $('.owl-carousel').each(function() {
        var $carousel = $(this);
        $carousel.owlCarousel({
            items: $carousel.data("items"),
            slideBy: $carousel.data("slideby"),
            center: $carousel.data("center"),
            loop: true,
            margin: $carousel.data("margin"),
            dots: $carousel.data("dots"),
            nav: $carousel.data("nav"),
            autoplay: $carousel.data("autoplay"),
            autoplayTimeout: $carousel.data("autoplay-timeout"),
            navText: ['<span class="las la-long-arrow-alt-left"><span>', '<span class="las la-long-arrow-alt-right"></span>'],
            responsive: {
                0: {
                    items: $carousel.data('xs-items') ? $carousel.data('xs-items') : 1
                },
                576: {
                    items: $carousel.data('sm-items')
                },
                768: {
                    items: $carousel.data('md-items')
                },
                1024: {
                    items: $carousel.data('lg-items')
                },
                1200: {
                    items: $carousel.data("items")
                }
            },
        });
    });
};



function magnificpopup() {
    $('.popup-gallery').magnificPopup({
        delegate: 'a.popup-img',
        type: 'image',
        tLoading: 'Loading image #%curr%...',
        mainClass: 'mfp-img-mobile',
        gallery: {
            enabled: true,
            navigateByImgClick: true,
            preload: [0, 1] 
        },
        image: {
            tError: '<a href="%url%">The image #%curr%</a> could not be loaded.',
            titleSrc: function(item) {
                return item.el.attr('title') + '<small>by Marsel Van Oosten</small>';
            }
        }
    });
    if ($(".popup-youtube, .popup-vimeo, .popup-gmaps").exists()) {
        $('.popup-youtube, .popup-vimeo, .popup-gmaps').magnificPopup({
            disableOn: 700,
            type: 'iframe',
            mainClass: 'mfp-fade',
            removalDelay: 160,
            preloader: false,
            fixedContentPos: false
        });
    }

};


function scrolltop() {
    var pxShow = 300,
        goTopButton = $(".scroll-top")
    // Show or hide the button
    if ($(window).scrollTop() >= pxShow) goTopButton.addClass('scroll-visible');
    $(window).on('scroll', function() {
        if ($(window).scrollTop() >= pxShow) {
            if (!goTopButton.hasClass('scroll-visible')) goTopButton.addClass('scroll-visible')
        } else {
            goTopButton.removeClass('scroll-visible')
        }
    });
    $('.smoothscroll').on('click', function(e) {
        $('body,html').animate({
            scrollTop: 0
        }, 1000);
        return false;
    });
};


function headerheight() {
    $('.fullscreen-banner .align-center').each(function() {
        var headerHeight = $('.header').height();
        // headerHeight+=15; // maybe add an offset too?
        $(this).css('padding-top', headerHeight + 'px');
    });
};



function fxheader() {
    $(window).on('scroll', function() {
        if ($(window).scrollTop() >= 300) {
            $('#header-wrap').addClass('fixed-header');
        } else {
            $('#header-wrap').removeClass('fixed-header');
        }
    });
};



function databgcolor() {
    $('[data-bg-color]').each(function(index, el) {
        $(el).css('background-color', $(el).data('bg-color'));
    });
    $('[data-text-color]').each(function(index, el) {
        $(el).css('color', $(el).data('text-color'));
    });
    $('[data-bg-img]').each(function() {
        $(this).css('background-image', 'url(' + $(this).data("bg-img") + ')');
    });
};



function contactform() {
    // when the form is submitted
    $('#contact-form, #queto-form').on('submit', function(e) {

        if (!e.isDefaultPrevented()) {
            var url = "php/contact.php";

            $.ajax({
                type: "POST",
                url: url,
                data: $(this).serialize(),
                success: function(response) {
                    $("#formmessage").html(response.msg).show().delay(2000).fadeOut('slow');
                }
            });
            return false;
        }
    })
};


function progressbar() {
    var progressBar = $('.progress');
    if (progressBar.length) {
        progressBar.each(function() {
            var Self = $(this);
            Self.appear(function() {
                var progressValue = Self.data('value');

                Self.find('.progress-bar').animate({
                    width: progressValue + '%'
                }, 1000);
            });
        })
    }
};



function countdown() {
    $('.countdown').each(function() {
        var $this = $(this),
            finalDate = $(this).data('countdown');
        $this.countdown(finalDate, function(event) {
            $(this).html(event.strftime('<li><span>%-D</span><p>Days</p></li>' + '<li><span>%-H</span><p>Hours</p></li>' + '<li><span>%-M</span><p>Minutes</p></li>' + '<li><span>%S</span><p>Seconds</p></li>'));
        });
    });
};



function imagegallery() {
    $('#imageGallery').lightSlider({
        gallery: true,
        item: 1,
        verticalHeight: 450,
        thumbItem: 4,
        slideMargin: 0,
        speed: 600,
        autoplay: true,
    });
}



function btnproduct() {
    $('.btn-product-up').on('click', function(e) {
        e.preventDefault();
        var numProduct = Number($(this).next().val());
        if (numProduct > 1) $(this).next().val(numProduct - 1);
    });
    $('.btn-product-down').on('click', function(e) {
        e.preventDefault();
        var numProduct = Number($(this).prev().val());
        $(this).prev().val(numProduct + 1);
    });
};


function parallax() {
    $(".parallaxie").parallaxie({
        speed: 0.4,
        offset: 0,
    });
};



function search() {
    // Search Toggle
    $("#search-input-box").hide();
    $("#search").on("click", function() {
        $("#search-input-box").slideToggle();
        $("#search-input").focus();
    });
    $("#close-search").on("click", function() {
        $('#search-input-box').slideUp(500);
    });
};


function activeclass() {
    $('.featured-item, .service-item').mouseenter(function() {
        $('.featured-item.active, .service-item.active').removeClass('active');
        $(this).removeClass('.featured-item, .service-item').addClass('active');
    });
};


function wowanimation() {
    var wow = new WOW({
        boxClass: 'wow',
        animateClass: 'animated',
        offset: 0,
        mobile: false,
        live: true
    });
    wow.init();
}


$(document).ready(function() {
    fullScreen(),
        dropdown(),
        bannerslider(),
        owlcarousel(),
        counter(),
        magnificpopup(),
        scrolltop(),
        headerheight(),
        fxheader(),
        databgcolor(),
        contactform(),
        progressbar(),
        countdown(),
        imagegallery(),
        btnproduct(),
        parallax(),
        search(),
        activeclass();
});


$window.resize(function() {});


$(window).on('load', function() {
    preloader(),
        wowanimation();
});