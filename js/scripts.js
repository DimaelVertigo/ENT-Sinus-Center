$(document).ready(function() {


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
	$("a.anchor").click(function(e) {
		var elementClick = $(this).attr("href");
		var destination = $(elementClick).offset().top;
		$('html, body').animate({
			scrollTop: destination
		}, 1100);
		e.preventDefault();
	});

	// Test table 
	$('.test-table__body-item').on('click', function() {
		$(this).addClass('test-table__body-item--focus').siblings().removeClass('test-table__body-item--focus');
	});

	
	var testENT = (function() {
		var resultPopup = $('#result-popup'),
			scoreResult = resultPopup.find('.rs-sum'),
			msgResult = resultPopup.find('.result-msg'),
			tableEnt = $('.test-table'),
			btnShowResult = tableEnt.next().find('.js-show-test-result'),
			numberQuestion = $('.test-question'),
			
			// Pregress bar
			contProgressBox = $('.status-progress'),
			stepBox = contProgressBox.find('.step-i-value'),
			stepValue = stepBox.children('.value'),
			stepBar = stepBox.next('.progress-bar').children('span'),
			scoreBox = contProgressBox.find('.score-i-value'),
			scoreValue = scoreBox.children('.value'),
			scoreBar = scoreBox.next('.progress-bar').children('span'),

			// Test data
			score = [],
			questSumm = null,
			resultNoProblem = 'No actions necessary or symptoms can be treated with OTC medication.',
			resultModerate = 'An appointment with a specialist or your PCP is recommended and/or prescription medicine can be taken to treat symptoms.',
			resultModerateSevere = 'An appointment with a specialist or your PCP is recommended and/or prescription medicine can be taken to treat symptoms.',
			resultAsBadAsItCanBe = 'And appointment with a specialist is recommended, treatment to be determined by doctor. Possible surgical candidate.';
		
		return {
			init: function() {
				_this = this;
				_this.listeners();
			},
			listeners: function() {
				tableEnt.on('change', '.test-table__hidden-radio', _this.saveAnswer);
			},
			saveAnswer: function() {
				var that = $(this),
					value = parseInt(that.attr('value')),
					tableQuest = that.closest('.test-table__body'),
					questNumber = tableQuest.data('quest-number');

				score[questNumber] = value;
				questSumm = questNumber +1;
				_this.showQuestion(tableQuest);
			},
			showQuestion: function(elem) {
				var nextQuestion = elem.next();

				if (nextQuestion.length) {
					nextQuestion.removeClass('test-table__body--hidden')
								.addClass('test-table__body--visible');
				} else {
					_this.detectResult(score);
				}
				_this.stepBarCalc(questSumm);
				_this.scoreBarCalc(score);
			},
			sumResult: function(scoreArr) {
				var sum = null;
				for (i=0; i<scoreArr.length; i++) {
					sum += scoreArr[i];
				}
				return sum;
			},
			stepBarCalc: function(stepSumm) {
				var barCalculate = (stepSumm / 20) * 100;
				stepValue.text(stepSumm);
				stepBar.css('width', barCalculate + '%');
			},
			scoreBarCalc: function(scoreArr) {
				var score = _this.sumResult(scoreArr);
					barCalculate = (score / 100) * 100;
				scoreValue.text(score);
				scoreBar.css('width', barCalculate + '%');
			},
			detectResult: function(score) {
				var result = _this.sumResult(score);

				if (result >= 0 && result <= 10) {
					_this.showResult(resultNoProblem);
				} else if (result >= 11 && result <= 40) {
					_this.showResult(resultModerate);
				} else if (result >= 41 && result <= 69) {
					_this.showResult(resultModerateSevere);
				} else if (result >= 70 && result <= 100) {
					_this.showResult(resultAsBadAsItCanBe);
				}
			},
			showResult: function(msg) {
				btnShowResult.text('Show result');
				$('.js-show-test-result').magnificPopup({
					type:'inline',
					callbacks: {
						open: function() {
							scoreResult.text(_this.sumResult(score));
							msgResult.text(msg);
						}
					}
				});
			}
		};
	}());

	testENT.init();

});