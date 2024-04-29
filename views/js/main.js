
 /*         CREATED BY VATSONIO          */

;(function () {

	window.onload = function() {
		document.getElementById('blur-effect').classList.add('loaded');
	};

	/* ==================================================================
                                    Go to Top
       ================================================================== */



	 if ($('#back-to-top').length) {
        var scrollTrigger = 100,
                backToTop = function () {
                    var scrollTop = $(window).scrollTop();
                    if (scrollTop > scrollTrigger) {
                        $('#back-to-top').addClass('show');
                    } else {
                        $('#back-to-top').removeClass('show');
                    }
                };
        backToTop();
        $(window).on('scroll', function () {
            backToTop();
        });
        $('#back-to-top').on('click', function (e) {
            e.preventDefault();
            $('html,body').animate({
                scrollTop: 0
            }, 700);
        });
    }



	$('.vatsonioBtn-counter').on('click', function(event, count) {
		event.preventDefault();
		
		var $this = $(this),
			count = $this.attr('data-count'),
			active = $this.hasClass('active'),
			multiple = $this.hasClass('multiple-count');
		$.fn.noop = $.noop;
		$this.attr('data-count', ! active || multiple ? ++count : --count  )[multiple ? 'noop' : 'toggleClass']('active');
		
	  });

	'use strict';
	
	var isiPad = function(){
		return (navigator.platform.indexOf("iPad") != -1);
	};

	var isiPhone = function(){
	    return (
			(navigator.platform.indexOf("iPhone") != -1) || 
			(navigator.platform.indexOf("iPod") != -1)
	    );
	};

	// Main Menu Superfish
	var mainMenu = function() {

		$('#vatsonio-primary-menu').superfish({
			delay: 0,
			animation: {
				opacity: 'show'
			},
			speed: 'fast',
			cssArrows: true,
			disableHI: true
		});

	};

	// Parallax
	var parallax = function() {
		$(window).stellar();
	};


	// Offcanvas and cloning of the main menu
	var offcanvas = function() {

		var $clone = $('#vatsonio-menu-wrap').clone();
		$clone.attr({
			'id' : 'offcanvas-menu'
		});
		$clone.find('> ul').attr({
			'class' : '',
			'id' : ''
		});

		$('#vatsonio-page').prepend($clone);

		// click the burger
		$('.js-vatsonio-nav-toggle').on('click', function(){

			if ( $('body').hasClass('vatsonio-offcanvas') ) {
				$('body').removeClass('vatsonio-offcanvas');
			} else {
				$('body').addClass('vatsonio-offcanvas');
			}
			// $('body').toggleClass('vatsonio-offcanvas');

		});

		$('#offcanvas-menu').css('height', $(window).height());

		$(window).resize(function(){
			var w = $(window);


			$('#offcanvas-menu').css('height', w.height());

			if ( w.width() > 769 ) {
				if ( $('body').hasClass('vatsonio-offcanvas') ) {
					$('body').removeClass('vatsonio-offcanvas');
				}
			}

		});	

	}

	


	var mobileMenuOutsideClick = function() {
		$(document).click(function (e) {
	    var container = $("#offcanvas-menu, .js-vatsonio-nav-toggle");
	    if (!container.is(e.target) && container.has(e.target).length === 0) {
	      if ( $('body').hasClass('vatsonio-offcanvas') ) {
				$('body').removeClass('vatsonio-offcanvas');
			}
	    }
		});
	};


	// Animations

	var contentWayPoint = function() {
		var i = 0;
		$('.animate-box').waypoint( function( direction ) {

			if( direction === 'down' && !$(this.element).hasClass('animated') ) {
				
				i++;

				$(this.element).addClass('item-animate');
				setTimeout(function(){

					$('body .animate-box.item-animate').each(function(k){
						var el = $(this);
						setTimeout( function () {
							el.addClass('fadeInUp animated');
							el.removeClass('item-animate');
						},  k * 200, 'easeInOutExpo' );
					});
					
				}, 100);
				
			}

		} , { offset: '85%' } );
	};
	

	var scheduleTab = function() {
		$('.schedule-container').css('height', $('.schedule-content.active').outerHeight());

		$(window).resize(function(){
			$('.schedule-container').css('height', $('.schedule-content.active').outerHeight());
		});

		$('.schedule a').on('click', function(event) {
			
			event.preventDefault();

			var $this = $(this),
				sched = $this.data('sched');

			$('.schedule a').removeClass('active');
			$this.addClass('active');
			$('.schedule-content').removeClass('active');

			$('.schedule-content[data-one="'+sched+'"]').addClass('active');

		});
	};

	// Document on load.
	$(function(){
		mainMenu();
		parallax();
		offcanvas();
		mobileMenuOutsideClick();
		contentWayPoint();
		scheduleTab();
	});

	

}());