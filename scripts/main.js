$(document).ready(function () {
	$("#headerTagLine").delay(1000).fadeIn(1000);
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
	
	$(".slide").first().addClass("current-slide");
	
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

		$('.slide').removeClass("current-slide");
		$('.slide:eq(' + currentPosition + ')').addClass("current-slide");
		
	    $('#slide-caption').html('<h3>' + captionTitle + '</h3>');
	    
	    positionControls($('.slide-image:eq(' + currentPosition + ')'));

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

		positionControls($('.slide-image:eq(' + currentPosition + ')'));

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

var positionControls = function (currentImage) {
	var offsetValue = currentImage.height() / 2,
		parentOffset = currentImage.parent().height() - currentImage.height();
	
	$('.control').css({
		'top': offsetValue + parentOffset + 'px'	
	});
	
	console.log(offsetValue);
	console.log(parentOffset);
};

window.onload = function () {
    equalHeight($(".slide"));
	
    $(".slide img").each(function (index, value) {
        var parentHeight = $(this).parent().height();
        var heightOffset = parentHeight - $(this).outerHeight();
        
        $(this).css({
            "margin-top": heightOffset
        });
    });
    positionControls($(".slide-image").first());
};

var equalHeight = function (group) {
    var tallest = 0;
    group.each(function () {
        var thisHeight = $(this).height();
        if (thisHeight > tallest) {
            tallest = thisHeight;
        }
    });
    group.height(tallest);
};