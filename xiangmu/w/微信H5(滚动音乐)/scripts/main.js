var window_w = $(window).width();
var score = 0,
	$r_img = $('#result'),
	$sr_img = $('#shareImg'),
	r_type = 1;
$('html').css({
	'font-size':(window_w > 750 ? 750 : window_w)/10+'px'
})
window.addEventListener('resize',function () {
	window_w = $(window).width()
	$('html').css({
		'font-size':(window_w > 750 ? 750 : window_w)/10+'px'
	})
});
$('document').ready(function () {
	function loadAssets(updating,callBack) {
		var imgs = [
			'imgs/bg.jpg',
			'imgs/poster/poster_btn.png',
			'imgs/poster/poster_danmu.png',
			'imgs/poster/poster_icons.png',
			'imgs/poster/poster_title.png',
			'imgs/question/a.png',
			'imgs/question/b.png',
			'imgs/question/c.png',
			'imgs/question/pic_box.png',
			'imgs/question/q1.png',
			'imgs/question/q2.png',
			'imgs/question/q3.png',
			'imgs/question/q4.png',
			'imgs/question/q5.png',
			'imgs/question/q6_01.png',
			'imgs/question/q6_02.png',
			'imgs/question/q6_03.png',
			'imgs/question/q7_01.png',
			'imgs/question/q7_02.png',
			'imgs/question/q7_03.png',
			'imgs/question/q8.png',
			'imgs/question/q9_01.png',
			'imgs/question/q9_02.png',
			'imgs/question/q9_03.png',
			'imgs/question/q10.png',
			'imgs/question/q11.png',
			'imgs/question/question_box.png',
			'imgs/result/link.png',
			// 'imgs/result/r1.png',
			// 'imgs/result/r2.png',
			// 'imgs/result/r3.png',
			// 'imgs/result/r4.png',
			// 'imgs/result/sr_1.jpg',
			// 'imgs/result/sr_2.jpg',
			// 'imgs/result/sr_3.jpg',
			// 'imgs/result/sr_4.jpg',
			'imgs/result/restart.png',
			'imgs/result/share.png'
		];
		function loadImage(src, callback) {
			var image = new Image();
			image.onload = callback;
			image.src = src;
		}
		var imgLoadCount = 0;
		imgs.map(function (item) {
			loadImage(item,function () {
				imgLoadCount++;
			})
		});
		var complete = setInterval(function() {
			if(imgLoadCount === imgs.length){
				clearInterval(complete);
				callBack && callBack();
			}
			else {
				var num = parseInt(imgLoadCount*100/imgs.length);
				if(num<100){
					updating && updating(num);
				}
			}
		},20);
	}

	function logic() {

		var mainSwiper = new Swiper ('#mainSwiper', {
			direction: 'horizontal', // 垂直切换选项
			loop: false, // 循环模式选项
		})

		var swiper06 = new Swiper ('#swiper06', {
			direction: 'horizontal', // 垂直切换选项
			loop: true, // 循环模式选项,
			autoplay:{
				delay: 2000,
				stopOnLastSlide: false,
				disableOnInteraction: true,
			}
		})

		var swiper07 = new Swiper ('#swiper07', {
			direction: 'horizontal', // 垂直切换选项
			loop: true, // 循环模式选项,
			autoplay:{
				delay: 2000,
				stopOnLastSlide: false,
				disableOnInteraction: true,
			}
		})

		var swiper09 = new Swiper ('#swiper09', {
			direction: 'horizontal', // 垂直切换选项
			loop: true, // 循环模式选项,
			autoplay:{
				delay: 2000,
				stopOnLastSlide: false,
				disableOnInteraction: true,
			}
		})

		$('#play').on('click',function () {
			document.querySelector('#audio').play();
		});
		$('#restart').on('click',function () {
			$('.answer').removeClass('selected');
			score = 0;
			$sr_img.attr('src','');
			mainSwiper.slideTo(0, 0, false);
		});

		$('#share').on('click',function () {
			$sr_img.attr('src','imgs/result/sr_'+r_type+'.jpg')
			$('#shareModal').show();
		});

		$('#close').on('click',function () {
			$('#shareModal').hide();
		});

		$('#start').on('click',function () {
			alert(1);
			mainSwiper.slideNext()
		});

		$('#arrow').on('click',function () {
			mainSwiper.slideNext();
		})

		$('.answer').on('click',function () {
			$(this).addClass('selected').siblings().removeClass('selected')
		})

		$('.next-btn').on('click',function () {
			var selected = $(this).parent().find('.answer-box .answer.selected'),
				s = selected.attr('data-score');
			if (selected.length == 0){
				alert('请选择答案');
				return;
			}else {
				score += parseInt(s);
				if (score <= 20){
					r_type = 1
					$r_img.attr('src','imgs/result/r1.png')
				}else if (score > 20 && score <=30){
					r_type = 2
					$r_img.attr('src','imgs/result/r2.png')
				}else if (score > 30 && score <=40){
					r_type = 3
					$r_img.attr('src','imgs/result/r3.png')
				}else if (score > 40){
					r_type = 4
					$r_img.attr('src','imgs/result/r4.png')
				}
				mainSwiper.slideNext()
			}
		})

		$('#back').on('click',function () {
			mainSwiper.slidePrev();
		});
	}

	loadAssets(function (percent) {
		$('#loading').find('.modal-inner').html(percent+'%')
	},function () {
		$('#loading').find('.modal-inner').html(100+'%');
		$('#loading').fadeOut();
		$('#mainSwiper').show();
		$('#danmu').addClass('move');
		var bgm = document.querySelector('#bgm');
		(function (id){
			// var audio = document.getElementById(id),
			// 	play = function(){
			// 		audio.play();
			// 		document.removeEventListener("touchstart",play, false);
			// 	};
			// audio.play();
			// document.addEventListener("WeixinJSBridgeReady", function () {
			// 	play();
			// }, false);
			// document.addEventListener('YixinJSBridgeReady', function() {
			// 	play();
			// }, false);
			// document.addEventListener("touchstart",play, false);
		})('bgm');
		// bgm.addEventListener('play',function () {
		// 	$('#music-icon').removeClass('closeState');
		// })
		// bgm.addEventListener('pause',function () {
		// 	$('#music-icon').addClass('closeState');
		// })
		// $('#music-icon').on('click',function () {
		// 	if ($(this).hasClass('closeState')){
		// 		bgm.play()
		// 	}else {
		// 		bgm.pause();
		// 	}
		// })
		setTimeout(function () {
			$('#start').fadeIn();
			logic();
		},3000);
	})
});