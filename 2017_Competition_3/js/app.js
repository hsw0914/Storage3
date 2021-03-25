function Application ()
{
	var self = this;

	// 애니메이션 슬라이드 위치
	this.position = 0;

	// 메뉴 스크롤
	this.scrollPosition = function (e) {

		// 페이지 이동으로 #독박을 쓰지 않으려면 이벤트를 없애야 합니다(매우중요)
		e.preventDefault();

		var index = $(this).parent().index() - 1;
			position = ['#result', '#photo', '#competition41', '#about'];

		$("html, body").animate({
			'scrollTop' : $(position[index]).offset().top
		}, 1000);
	}

	// 슬라이드 애니메이션
	this.refreshPosition = function () {
		$("#slider > div > div > div").animate({
			'margin-left':(self.position * -100) + "%"
		}, 1500);
	}

	// 빼럴뤡스 쓰크뢀링
	this.setParrellex = function () {
		var wTop = $(window).scrollTop();


		var about = 50 + (wTop - $("#about").offset().top) * 0.5;
		$("#about").css({
			'background-position': '80% '+about+'%'
		});

		var competition41 = 50 + (wTop - $("#competition41").offset().top) * 0.3;
		$("#competition41").css({
			'background-position': '20% '+competition41+'%'
		});

		var competition40 = 50 + (wTop - $("#competition40").offset().top) * 0.5;
		$("#competition40").css({
			'background-position': '80% '+competition40+'%'
		});
	}


	// read more
	this.readMore = function () {
		$(this).parent().find('.hidden-text').show('slow');
	}


	// results
	this.showResult = function () {
		var is = $(this),
			data = {
				gameInfo:is.parent().parent().parent().parent().children('h2').html(),
				name:is.html(),
				country:is.attr('data-country'),
				title:is.attr('title')
			},
			html = "";

		html += "<div>";
			// 이  이미지는 선수사진을 사용해야 합니다
			html += "<img src='i/Slide1.jpg' alt='slider' />"; 
			html += "<p>";
				html += "대회년도와 도시 : " + data.gameInfo;
			html += "</p>";
			html += "<p>";
				html += "선수이름 : " + data.name;
			html += "</p>";
			html += "<p>";
				html += "국가 : " + data.country;
			html += "</p>";
			html += "<p>";
				html += "메달 종류 : " + data.title;
			html += "</p>";
		html += "</div>";

		$(html).dialog({
			close:function () {
				$(".ui-dialog").remove();
			},
			width:720,
			height:500
		});
	}


	// 페이지 첫 로딩시 DOM 변경
	this.onload = function () {

		// 애니메이션 슬라이드 레이아웃
		var slider_div = $("#slider > div > div"),
			slider_area = "";

		slider_area += "<div>";
			slider_area += "<img src='i/Slide1.jpg' alt='slider' />";
			slider_area += "<img src='i/Slide2.jpg' alt='slider' />";
			slider_area += "<img src='i/Slide3.jpg' alt='slider' />";
		slider_area += "</div>";


		slider_div.eq(0).html("&lt;");
		slider_div.eq(1).html(slider_area);
		slider_div.eq(2).html("&gt;");


		// 애니메이션 슬라이드 스타일 부여
		slider_div.eq(1).css({
			'position':'releative',
			'overflow':'hidden'
		}).children('div').css({
			'width':'300%',
			'height':'100%',
			'margin':0
		}).children('img').css({
			'width':'33.333%',
			'height':'100%',
			'float':'left'
		});


		// 각 영역에 패럴렉스 스크롤링을 위한 백그라운드 적용
		$("#about").css({
			'background':'url(i/about.png)',
			'background-size': '30%',
			'background-repeat': 'no-repeat',
			'background-position': '80% 50%'
		});

		$("#competition41").css({
			'background':'url(i/41.png)',
			'background-size': '30%',
			'background-repeat': 'no-repeat',
			'background-position': '20% 50%'
		});

		$("#competition40").css({
			'background':'url(i/40.png)',
			'background-size': '30%',
			'background-repeat': 'no-repeat',
			'background-position': '80% 50%'
		});



		// read more 스타일을 위한 것들
		$("#competition40").css({
			'min-height':'460px'
		});

		$(".hidden-text").parent().append('<a href="javascript:void(0);" class="read-more">read more</a>');


		// photo 효과를 위한 것들
		$("#photo img").css({
			'transition':'0.5s all',
			'box-shadow':'0 0 10px rgba(0,0,0,0)'
		});

		self.setParrellex();
	}
}

$(document).ready(function() {

	var app = new Application;

	// 메뉴 스크롤
	$("nav ul li a").bind('click', app.scrollPosition);


	// 슬라이드 애니메이션
	$("#slider > div > div").eq(0).click(function () {
		app.position--;
		if(app.position < 0) app.position = 2;
		app.refreshPosition();
	});

	$("#slider > div > div").eq(2).click(function () {
		app.position++;
		if(app.position > 2) app.position = 0;
		app.refreshPosition();
	});


	// 빼럴뤡스 쓰크뢀링
	$(window).scroll(app.setParrellex);


	// read more
	$("body")
	.on('click', '.read-more', app.readMore);


	// photo section
	$("#photo")
	.on('mouseover', 'img', function () {
		$(this).css({
			'transform':'scale(1.2)',
			'box-shadow':'0 0 10px rgba(0,0,0,0.8)'
		},500);
	})
	.on('mouseout', 'img', function () {
		$(this).css({
			'transform':'scale(1)',
			'box-shadow':'0 0 10px rgba(0,0,0,0)'
		},500);
	})
	.on('click', 'img', function () {
		var src = $(this).attr('src'),
			html = "";

		src = 'i/big_' + src.replace('i/', '');

		html += '<div>';
			html += '<img src="'+src+'" alt="big_img"/>';
		html += '</div>';

		$(html).dialog({
			close:function () {
				$(".ui-dialog").remove();
			},
			width:690,
			height:500
		});
	});


	// results
	$("#result > div > div > ul > li > ul > li").click(app.showResult);


	app.onload();

});