$(function() {

	$('#my-menu').mmenu({
		extensions: ['theme-black', 'effect-menu-slide', 'pagedim-black'],
		navbar: {
			title: 'Cалон красоты'
		},
		offCanvas: {
			position: 'left'
		}
	});
	//   Get the API mmenu
    var api = $("#my-menu").data( "mmenu" );
	api.bind('open:finish', function(){
		$('.hamburger').addClass('is-active');
	}).bind('close:finish', function(){
		$('.hamburger').removeClass('is-active');
	});

	//owl carousel
	$('.carousel-services').on('initialized.owl.carousel', function(){
		setTimeout(function(){
			//оптимизация изображения под блоки карусели
			carouselService()
		}, 100);
		
	});
	$('.carousel-services').owlCarousel({
		loop: false,
		nav: true,
		smartSpeed: 700,
		navText: ['<i class="fa fa-angle-double-left"></i>', '<i class="fa fa-angle-double-right"></i>'],
		responsiveClass: true,
		responsive: {
			0: {
				items: 1
			},
			800: {
				items: 2
			},
			1100: {
				items: 3
			}
		}
	});

	$('.reviews').owlCarousel({
		loop: true,
		items: 1,
		nav: false,
		smartSpeed: 700,
		autoHeight: true

	});

	carouselServiceText();
	onResize();
	window.onresize = function()
	{
		onResize()
	}

	$('select').selectize();

	//E-mail Ajax Send
	$("form.callback").submit(function() { //Change
		var th = $(this);
		$.ajax({
			type: "POST",
			url: "mail.php", //Change
			data: th.serialize()
		}).done(function() {
			$(th).find('.success').addClass('active').css('display', 'flex').hide().fadeIn();
			setTimeout(function() {
				// Done Functions
				$(th).find('.success').removeClass('active').fadeOut();
				th.trigger("reset");
			}, 3000);
		});
		return false;
	});

});

function carouselService()
{
	$('.carousel-services-item').each(function(){
		var ths = $(this),
			thsHeight = ths.find('.carousel-services-content').outerHeight();
		ths.find('.carousel-services-image').css('min-height', thsHeight);
	});
}

//Второе слово в заголовке оборачиваем в тег <span>
function carouselServiceText()
{
	$('.carousel-services-composition .h3').each(function(){
		var ths = $(this);
		ths.html(ths.html().replace(/(\S+)\s*$/, '<span>$1</span>'))
	});
	$('section .h2').each(function(){
		var ths = $(this);
		ths.html(ths.html().replace(/^(\S+)/, '<span>$1</span>'))
	});
}

function onResize()
{
	$('.carousel-services-content').equalHeights();
}