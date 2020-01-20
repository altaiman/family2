'use strict';

(function (root) {

	// Параметры слайдеров
	var dataSliders = {
		index: {
			arrows: true,
			dots: true,
			fade: true
		},
		specialist: {
			arrows: true,
			dots: true,
			slideToShow: 1
		},
		specialistspage: {
			slidesToShow: 3,
			slidesToScroll: 1,
			vertical: true,
			verticalSwiping: true,
			arrows: true,
			infinite: false,
			responsive: [{
				breakpoint: 769,
				settings: {
					vertical: false,
					slidesToShow: 1,
					slidesToScroll: 1
				}
			}]
		},
		certificate: {
			arrows: true,
			dots: true,
			slideToShow: 1
		},
		reviews: {
			arrows: true,
			dots: true,
			slideToShow: 1,
			fade: true
		},
		specialists: {
			arrows: true,
			dots: false,
			slidesToShow: 3,
			slidesToScroll: 3,
			variableWidth: true,
			centerMode: true
		},
		service: {
			arrows: true,
			dots: true,
			slidesToShow: 4,
			slidesToScroll: 1,
			variableWidth: true,
			infinite: false,
			responsive: [{
				breakpoint: 1001,
				settings: 'unslick'
			}]
		},
		serviceb: {
			arrows: true,
			dots: true,
			slidesToShow: 3,
			slidesToScroll: 1,
			variableWidth: true,
			infinite: false,
			responsive: [{
				breakpoint: 1001,
				settings: 'unslick'
			}]
		},
		calendar: {
			slidesToShow: 3,
			slidesToScroll: 1,
			arrows: false,
			vertical: true,
			verticalSwiping: true,
			infinite: false,
			draggable: false
		},
		time: {
			arrows: true,
			variableWidth: true
		}
	};

	function sliders() {

		// Активация слайдеров
		$('.slider').each(function (i, s) {
			var slider = $(s).data('slider'),
			    scroll = $(s).find('.slider__scroll').get(0);

			if (scroll) {
				var slides = $(s).find('.slider__slides').children().length - 2;

				$(scroll).find('span').css('height', 100 / slides + '%');

				$(s).find('.slider__slides').slick(dataSliders[slider]);

				$(s).find('.slider__slides').on('beforeChange', function (e, slick, currentSlide, nextSlide) {

					var step = 100 / slides * nextSlide;

					$(scroll).find('span').css('top', step + '%');
				});
			} else {
				$(s).find('.slider__slides').slick(dataSliders[slider]);
			}
		});
	}

	sliders();

	// Перестройка слайдеров при ресайзе окна
	function resizeSliders() {
		var sliders = $('[data-slider] .slider__slides');

		$(sliders).each(function (i, slider) {
			$(slider).slick('unslick');
			$(slider).slick(dataSliders[$(slider).parent().data('slider')]);
		});
	}

	$(window).on('resize', resizeSliders);

	// Скролл в слайдере

	$('.section__nav .arrow').on('click', function (e) {
		e.preventDefault();

		if ($(this).hasClass('arrow_down')) {
			fullpage_api.moveSectionDown();
		} else {
			fullpage_api.moveSectionUp();
		}
	});

	// Табы
	$('[data-tabs] > *').on('click', function (e) {
		e.preventDefault();

		$(this).parent().find('.active').removeClass('active');
		$(this).addClass('active');

		var data = $(this).parent().data('tabs'),
		    index = $(this).index(),
		    tab = $('[data-tabs-content="' + data + '"]').children().get(index);

		$('[data-tabs-content="' + data + '"] > *').hide();

		$(tab).show();

		var slider = $(tab).find('[data-slider] .slider__slides').get(0);

		$(slider).slick('unslick');
		$(slider).slick(dataSliders[$(slider).parent().data('slider')]);

		setTimeout(function () {
			$(tab).find('.slick-slide').first().find('div > li').trigger('click');
		}, 10);
	});

	$('[data-tabs]').each(function (i, tabs) {
		$(tabs).children().first().trigger('click');
	});

	$(document).on('click', '[data-show]', function () {
		var hide = $(this).find('[data-hide]').html(),
		    data = $(this).data('show');

		$(this).closest('.slider__slides').find('.active').removeClass('active');
		$(this).addClass('active').siblings('.active').removeClass('active');
		$('[data-show-view="' + data + '"]').empty().html(hide);
	});

	// Модалки

	if ($(window).width() > 1000 && !$('body').hasClass('page_shop')) {
		new fullpage('#fullpage', {
			licenseKey: 'OPEN-SOURCE-GPLV3-LICENSE',
			scrollingSpeed: 1500,
			onLeave: function onLeave(origin, destination, direction) {
				$('.lepestok').addClass('animate');
				$('.fp-table').removeClass('down up');
				$('.fp-table').addClass(direction);
			},
			afterLoad: function afterLoad() {

				$('.lepestok').removeClass('animate');
			}
		});
	}

	// Услуги

	var colors = ['#acefaa', '#6fe6f1', '#f498be', '#8a8edd'];

	$('.s-item').each(function (i, service) {
		var img = $(service).data('img'),
		    color = colors[i % colors.length];

		if ($(this).closest('[data-colors]').get(0)) {
			$(service).css('background', color + ' url(' + img + ')');
		} else {
			$(service).css('background', 'url(' + img + ')');
		}
	});

	$('.select-service__list_price li').on('click', function () {
		$('.info').addClass('show');
	});

	$('.info .btn_back').on('click', function () {
		$('.info').removeClass('show');
	});

	// Календарь

	setTimeout(function () {
		$('.slider_calendar .slick-current .event').trigger('click');
		$('.slider_spec-page .slick-current .spec').trigger('click');
	}, 100);

	$('.event').on('click', function () {
		$('.event_active').removeClass('event_active');
		$(this).addClass('event_active');

		var index = $(this).closest('.slick-slide').index(),
		    detail = $('.event-detail').get(index);

		$(detail).show().siblings('hide');

		if (!detail) {
			$('.event-detail').hide();
		}
	});

	$('.slider__arrow').on('click', function () {
		var next,
		    slider = $(this).closest('.slider').find('.slider__slides');

		if ($(this).hasClass('slider__arrow_down')) {
			next = $('.event_active').closest('.slick-slide').next().get(0);

			if (next == undefined) return;

			$('.event_active').removeClass('event_active');
			$(next).find('.event').addClass('event_active');

			$(slider).slick('slickNext');
		} else {
			next = $('.event_active').closest('.slick-slide').prev().get(0);

			if (next == undefined) return;

			$('.event_active').removeClass('event_active');
			$(next).find('.event').addClass('event_active');

			$(slider).slick('slickPrev');
		}
	});

	$('.slider__scroll span').on('mousedown', function (e) {
		var t = this,
		    p = Number($(t).css('top').split('px')[0]),
		    h = $(t).parent().height() - $(t).height(),
		    start = e.clientY,
		    slider = $(this).closest('.slider').find('.slider__slides'),
		    slides = $(this).closest('.slider').find('.slick-track').children().length,
		    oneSlide = 100 / slides;

		$(window).on('mousemove', function (e) {
			var d = e.clientY - start + p;

			if (d >= h) {
				d = h;
			} else if (d <= 0) {
				d = 0;
			}

			$(t).css('top', d + 'px');

			var nextSlide = Math.round(d * 100 / h / oneSlide);

			$(slider).slick('slickGoTo', nextSlide);
		});
	});

	$(window).on('mouseup', function () {
		$(this).off('mousemove');
	});

	$('.spec').on('click', function () {
		$('.spec_active').removeClass('spec_active');
		$(this).addClass('spec_active');

		var index = $(this).closest('.slick-slide').index(),
		    detail = $('.spec-detail').get(index);

		$(detail).show().siblings('hide');

		if (!detail) {
			$('.spec-detail').hide();
		}
	});

	// Карта

	// var map;
	//
	// function initMap() {
	//   map = new google.maps.Map(document.getElementById('map'), {
	//     center: {lat: 52.517619, lng: 103.840673},
	//     zoom: 14,
	// 		disableDefaultUI: true
	//   });
	//
	// 	var marker = new google.maps.Marker({
	//     position: {lat: 52.517619, lng: 103.840673},
	//     map: map,
	//     title: 'Hello World!'
	//   });
	//
	// 	marker.setMap(map);
	// }
	//
	// if ($('#map').get(0)) initMap()

	// datepicker
	// пример с допустимыми датами

	var eventDates = [1, 9, 10, 12, 17, 22],
	    $picker = $('#datepicker');

	$picker.datepicker({
		onRenderCell: function onRenderCell(date, cellType) {
			var currentDate = date.getDate();

			if (cellType == 'day' && eventDates.indexOf(currentDate) != -1) {

				return {
					disabled: false
				};
			} else {
				return {
					disabled: true
				};
			}
		}
	});

	$('.time').on('click', function () {
		$(this).closest('.slick-list').find('.time_select').removeClass('time_select');
		$(this).addClass('time_select');
		console.log(this);
	});

	$('.service-list__toggle').on('click', function () {
		$(this).closest('.service-list__item').toggleClass('service-list__item_show').siblings().removeClass('service-list__item_show');
	});

	// timetable

	if ($('.timetable').get(0)) {
		$('.timetable__main .timetable__cell p').each(function (i, p) {
			var l = $(p).html().length;

			if (l > 28) {
				$(this).closest('.timetable__cell').addClass('timetable__cell_small');
			}
		});
	}

	// scroll

	var scrollNav = '<div class="scroll-nav"><button class="scroll-nav__arrow scroll-nav__arrow_down"></button><button class="scroll-nav__arrow scroll-nav__arrow_up"></button></div>';

	$('[data-simplebar]').each(function (i, scroll) {
		$(scroll).append(scrollNav);
	});

	$(document).on('mousedown', '.scroll-nav__arrow', function (e) {
		e.preventDefault();

		var s = $(this).closest('[data-simplebar]'),
		    content = $(s).find('.simplebar-scroll-content'),
		    scrollT = $(content).scrollTop(),
		    int;

		if ($(this).hasClass('scroll-nav__arrow_down')) {
			int = setInterval(function () {
				$(content).scrollTop(++scrollT);
			}, 5);

			$(this).on('mouseup', function () {
				clearInterval(int);
			});
		} else {
			int = setInterval(function () {
				$(content).scrollTop(--scrollT);
			}, 5);

			$(this).on('mouseup', function () {
				clearInterval(int);
			});
		}
	});

	// nav

	$('.nav__mob').on('click', function (e) {
		e.preventDefault();

		$(this).parent().toggleClass('nav_show');
	});

	$('.select').niceSelect();

	// mobile

	var w = $(window).width();

	$('.section__block_left .select-service__list li').on('click', function () {

		if (w <= 1000) {
			$('.section__block_right .select-service').show();
		}
	});

	// range

	if ($('.range').get(0)) {
		var range = $('.range'),
		    slider = $('.range__slider'),
		    minInput = $(range).find('[data-input="min"]'),
		    maxInput = $(range).find('[data-input="max"]');

		slider.ionRangeSlider({
			hide_min_max: true,
			hide_from_to: true,
			onChange: function onChange() {
				updateRange(slider);
			}
		});

		updateRange(slider);
	}

	function updateRange(slider) {
		var min = $(slider).data('from'),
		    max = $(slider).data('to');

		$(minInput).val(min + ' р.');
		$(maxInput).val(max + ' р.');
	};

	$('.range__input input').on('change', function () {
		var data = $(this).data('input'),
		    range = $(".range__slider").data("ionRangeSlider"),
		    val = $(this).val().split(' ')[0],
		    min = range.options.min,
		    max = range.options.max;

		if (data === 'min') {
			if (val < min) val = min;
			$(this).val(val + ' р.');

			range.update({
				from: val
			});
		} else {
			if (val > max) val = max;
			$(this).val(val + ' р.');

			range.update({
				to: val
			});
		}
	});

	// select

	$('select').niceSelect();
})(window);