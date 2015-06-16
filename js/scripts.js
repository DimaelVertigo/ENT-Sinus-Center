// Tabs
var allPanels = $('.content-3__hidden-text');
allPanels.hide();
$('.content-3__tabs .content-3__tab-trigger').on('click', function() {
	var _this = $(this),
		cont = _this.next('.content-3__hidden-text'),
		speed = 250;
	_this.parent().siblings().children('.content-3__tab-trigger').removeClass('content-3__tab-trigger--active');
	_this.parent().siblings().children('.content-3__hidden-text').slideUp(speed);
	if (cont.is(':visible')) {
		_this.removeClass('content-3__tab-trigger--active');
		cont.slideUp(speed);
	} else {
		_this.addClass('content-3__tab-trigger--active');
		cont.slideDown(speed);
	}
});
// Form validation

var form = $('form');

var validation = {
	init: function() {
		this.listeners();
	},
	listeners: function() {
		form.on('submit', validation.submitForm);
		form.on('keydown', 'input, textarea', validation.removeError);
	},
	submitForm: function(e) {

		var form = $(this),
			submitBtn = form.find('button[type="submit"]');

		if (validation.validateForm(form) === false) {
			e.preventDefault();
			return false;
		}

		submitBtn.attr('disabled', 'disabled');
	},
	validateForm: function(form) {
		var inputs = form.find('input:not(.novalid), textarea:not(.novalid)'),
			valid = true;

		$.each(inputs, function(idx, val) {
			var input = $(val),
				isValue = input.val();

			if (isValue.length === 0) {
				input.addClass('contact-form__input--has-error').removeClass('has-success');
				valid = false;
			} else {
				input.addClass('has-success').removeClass('contact-form__input--has-error');
			}
		});
		return valid;
	},
	removeError: function() {
		$(this).removeClass('contact-form__input--has-error');
	}
};
validation.init();

// Anchors 
$("a.navigation__link").click(function(e) { 
	var elementClick = $(this).attr("href");
	var destination = $(elementClick).offset().top;
	$('html, body').animate({
		scrollTop: destination 
	}, 1100);
	e.preventDefault();
});

// Test table 

$('.test-table').on('click', function() {
	if ($('.test-table__body').hasClass('test-table__body--hidden')) {
		$('.test-table__body').removeClass('test-table__body--hidden');
	}
});