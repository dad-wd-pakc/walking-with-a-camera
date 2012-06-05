$(document).ready(function () {
    // Colorbox lightbox
    $(".lightboximg").colorbox({ transition: "none" });

    var currentPosition = 0;
    var currentPlusOne = currentPosition + 1;
    var slideWidth = 940;
    var slides = $('.slide');
    var numberOfSlides = slides.length;
    var captionTitle = $('.slide-image:eq(' + currentPosition + ')').attr('title');

    // Remove scrollbar in JS
    $('#slidesContainer').css('overflow', 'hidden');

    // Float left to display horizontally, readjust .slides width
    slides.css({
        'float': 'left',
        'width': slideWidth
    });

    // Set #slideInner width equal to total width of all slides
    $('#slideInner').css('width', slideWidth * numberOfSlides);

    $('#slide-caption').html('<h3>' + captionTitle + '</h3>');

    // Insert left and right arrow controls in the DOM
    $('#gallery-content')
	.prepend('<div class="control" id="previous-button">Previous</div>')
	.append('<div class="control" id="next-button">Next</div>');

    // Hide left arrow control on first load
    manageControls(currentPosition);

    // Create event listeners for .controls clicks
    $('.control')
	.bind('click', function () {
	    // Determine new position
	    currentPosition = ($(this).attr('id') == 'next-button')
		? parseInt(currentPosition) + 1 : parseInt(currentPosition) - 1;

	    captionTitle = $('.slide-image:eq(' + currentPosition + ')').attr('title');

	    $('#slide-caption').html('<h3>' + captionTitle + '</h3>');

	    $('.slide-thumb').children('img').removeClass('current-thumb-border').addClass('thumb-border');
	    $('.slide-thumb:eq(' + currentPosition + ')').children('img').removeClass('thumb-border').addClass('current-thumb-border');

	    // Hide / show controls
	    manageControls(currentPosition);
	    // Move slideInner using margin-left
	    $('#slideInner').animate({
	        'marginLeft': slideWidth * (-currentPosition)
	    });
	});

    $('.slide-thumb').bind('click', function () {
        // Determine new position

        $('.slide-thumb').children('img').removeClass('current-thumb-border').addClass('thumb-border');
        $(this).children('img').removeClass('thumb-border').addClass('current-thumb-border');

        currentPosition = ($(this).attr('rel'));
        captionTitle = $('.slide-image:eq(' + currentPosition + ')').attr('title');

        $('#slide-caption').html('<h3>' + captionTitle + '</h3>');

        // Hide / show controls
        manageControls(currentPosition);
        // Move slideInner using margin-left
        $('#slideInner').animate({
            'marginLeft': slideWidth * (-currentPosition)
        });

        return false;
    });

    // manageControls: Hides and shows controls depending on currentPosition
    function manageControls(position) {
        // Hide left arrow if position is first slide
        if (position == 0) {
            $('#previous-button').hide()
        } else {
            $('#previous-button').show()
        }
        // Hide right arrow if position is last slide
        if (position == numberOfSlides - 1) {
            $('#next-button').hide()
        } else {
            $('#next-button').show()
        }
    }

    if ($(".thumbnail-list").length) {
        //thumbnailRollover();
        $(".thumbnail-list li img").hoverpulse({
            size: 50,
            speed: 400
        });
    }

});

var thumbnailRollover = function () {
    $(".thumbnail-list li img").hover(function () {
        // hover in
        $(this).fadeTo(400, 1).parent().siblings().find("img").fadeTo(400, 0.25);
    }, function () {
        // hover out
        $(this).fadeTo(400, 1).parent().siblings().find("img").fadeTo(400, 1);
    });
};

/*
var thumbnailRollover = function () {
    $(".thumbnail-list li img").hover(function () {
        // hover in
        $(this)
        .parent("li").css("z-index", 999).siblings("li").css("z-index", 1);
        $(this)
        .stop().animate({
            height: "112",
            left: "-40px",
            top: "-28px",
            width: "160",
            opacity: "1"
        }, "fast").parent().siblings().find("img").fadeTo("slow", 0.25);
        //$(".thumbnail-list li img").stop().not($(this)).fadeTo("slow", 0.25);
    }, function () {
        // hover out
        $(this)
        .stop().animate({
            height: "73",
            left: "0",
            top: "0",
            width: "104",
            opacity: "1"
        }, "fast").parent().siblings().find("img").fadeTo("slow", 1);
        //$(this).stop().fadeTo("slow", 1);
        //$(".thumbnail-list li img").stop().fadeTo("slow", 1);
    });
};
*/