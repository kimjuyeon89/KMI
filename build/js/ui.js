$(function () {
  /* 자동 타이틀 달아주기 */
  $("a, .btn, .eps").each(function () {
    let attr = $(this).text().trim();
    attr = attr.replace(/(\r\n|\n|\r)/gm, ""); //줄바꿈 제거
    attr = attr.replace(/\s{2,}/g, " "); //공백 2칸이상일경우 1칸으로

    if (!$(this).is("[title]")) {
      $(this).attr("title", attr);
    }

    if ($(".eps").find("a").length > 0) {
      //eps 하위에 a 태그가 있을경우 eps에 title 제거
      $(".eps").removeAttr("title");
    }
  });

  /* 탭 리스트 */
  $(".tabList li").on({
    click: function () {
      $(this).addClass("active").siblings("li").removeClass("active");
      $(this).closest(".tabNav").siblings(".tabCont").eq($(this).index()).addClass("active").siblings(".tabCont").removeClass("active");
    },
  });

  /* input 맞춤법 검사 제거 */
  $('input[type="text"]').attr("spellcheck", false);

  /* input disabled 자동 타이틀 */
  $("input[disabled].disabled").each(function () {
    $(this).attr("title", $(this).val());
  });

  /* textarea disabled 자동 타이틀 */
  $("textarea[disabled].disabled").each(function () {
    $(this).attr("title", $(this).text());
  });

  //header 이벤트
  function updateQmenuBtnPosition() {
    // 아이콘 클래스 변경
    if ($('.qmenu-wrap').hasClass('open') || $('.gnb-wrap').hasClass('open')) {
      $('.qmenu-btn i').removeClass('arrow-down').addClass('arrow-up');
    } else {
      $('.qmenu-btn i').removeClass('arrow-up').addClass('arrow-down');
    }
  }
  
  $(".qmenu-btn").on("click", function () {
    // qmenu-wrap와 gnb-wrap 모두 open 클래스를 가지고 있을 경우
    if ($('.qmenu-wrap').hasClass('open') && $('.gnb-wrap').hasClass('open')) {
      $('.qmenu-wrap, .gnb-wrap').removeClass('open'); // 두 요소에서 open 클래스 제거
      $('.q-allmenu').removeClass('close'); // q-allmenu에서 close 클래스 제거
    } else {
      // 그렇지 않으면 qmenu-wrap만 toggle
      $(".qmenu-wrap").toggleClass("open");
    }
    updateQmenuBtnPosition(); // 상태 업데이트
  });

  $(".menu-btn").on("click", function () {
    if ($(window).width() <= 1280) {
      // 화면 너비가 1280px 이하일 경우
      $(".mo-gnb").toggleClass("open"); 
    
    } else {
      // 화면 너비가 1280px 초과일 경우 기존 로직
      const isQmenuOpen = $('.qmenu-wrap').hasClass('open');
      const isGnbOpen = $('.gnb-wrap').hasClass('open');
  
      if (isQmenuOpen && isGnbOpen) {
        $('.menu-btn i').removeClass('header-close').addClass('header-menu');
        $('.qmenu-wrap, .gnb-wrap').removeClass('open'); 
      } else if (!isQmenuOpen && !isGnbOpen) {
      
        $('.qmenu-wrap, .gnb-wrap').addClass('open');
        $('.menu-btn i').removeClass('header-menu').addClass('header-close'); 
      } else {
      
        if (!isQmenuOpen) {
          $('.qmenu-wrap').addClass('open');
        }
        if (!isGnbOpen) {
          $('.gnb-wrap').addClass('open');
        }
        $('.menu-btn i').removeClass('header-menu').addClass('header-close'); 
      
      }
      updateQmenuBtnPosition(); 
    }
  });
  
  // 화면 크기 변경 시 mo-gnb open 제거
$(window).on("resize", function () {
  if ($(window).width() > 1280) {
    $(".mo-gnb").removeClass("open"); 
  }
});


  $(".mo-gnb .menu-header .close").on("click", function () {
    $(".mo-gnb").removeClass('open');
  })
  
  $(".q-allmenu").on("click", function () {
    $(".gnb-wrap").toggleClass("open");
    $(".item07").toggleClass("close");
    updateQmenuBtnPosition();
  });
  
  
  
  
  $("#header .search-btn").on("click", function () {
    // #header에 is-search 클래스 추가
    $("#header").addClass("is-search");
  });

  $(".search-close-btn").on("click", function () {
    // #header에 is-search 클래스 추가
    $("#header").removeClass("is-search");
  });

  $(".util-item.lang").on("click", function () {
    // open 클래스 토글
    $(this).toggleClass("open");

    const icon = $(this).find("i");
    if (icon.hasClass("arrow-down")) {
      icon.removeClass("arrow-down").addClass("arrow-up");
    } else {
      icon.removeClass("arrow-up").addClass("arrow-down");
    }
  });

  const $topButton = $("#topButton");

  // 스크롤 이벤트 감지
  $(window).scroll(function () {
    if ($(this).scrollTop() > 200) {
      $topButton.fadeIn(300); // 300ms 동안 버튼 페이드 인
    } else {
      $topButton.fadeOut(300); // 300ms 동안 버튼 페이드 아웃
    }
  });

  // 클릭 시 페이지 상단으로 부드럽게 이동
  $topButton.click(function () {
    $("html, body").animate({ scrollTop: 0 }, 500); // 500ms 부드러운 스크롤
    return false; // 링크 기본 동작 방지
  });




  //sidebar 이벤트
  $(".expand-section").on("click", function () {
    // .side-top과 .help-section에 close 클래스 토글
    $(".side-top").toggleClass("close");
    $(".help-section").toggleClass("close");
  
    // 아이콘 클래스 토글
    $(".expand-icon i").toggleClass("arrow-down-wh arrow-up-wh");
  });



  //셀렉 이벤트
  $(".nav-item").on("click", ".sub-nav-container ul li a", function (e) {
    e.preventDefault();

    const selectedText = $(this).text(); // 클릭한 항목의 텍스트
    const navItem = $(this).closest(".nav-item"); // 현재 nav-item 부모 요소

    // 현재 항목 업데이트
    navItem.find(".nav-current .nav-link").text(selectedText);

    // 드롭다운 닫기
    navItem.find(".sub-nav-container").addClass("d-none");
  });

  // 드롭다운 토글 (nav-current 클릭 시)
  $(".nav-item").on("click", ".nav-current", function (e) {
    e.stopPropagation(); // 이벤트 전파 방지

    const navItem = $(this).closest(".nav-item");
    const subNavContainer = navItem.find(".sub-nav-container");

    // 다른 드롭다운 닫기
    $(".sub-nav-container").not(subNavContainer).addClass("d-none");

    // 현재 드롭다운 열기/닫기
    subNavContainer.toggleClass("d-none");
  });


  
  // 페이지 클릭 시 드롭다운 닫기
  $(document).on("click", function () {
    $(".sub-nav-container").addClass("d-none");
  });



  // //사이드바  footer제어
  // const sideWrap = $(".side-wrap");
  // const pageContainer = $(".page-container");
  // const footer = $("footer");
  // const maxBottom = 600; // 푸터 기준 최대 bottom 값

  // $(window).on("scroll", function () {
  //   const scrollTop = $(window).scrollTop(); // 현재 스크롤 위치
  //   const footerTop = footer.offset().top; // 푸터의 상단 좌표
  //   const viewportHeight = $(window).height(); // 뷰포트 높이
  //   const sideWrapHeight = sideWrap.outerHeight(); // 사이드바 높이

  //   // 푸터에 도달했을 때 처리
  //   if (scrollTop + viewportHeight >= footerTop) {
  //     sideWrap.css({
  //       position: "absolute", // absolute로 바꿔 푸터 위에 멈춤
  //       top: "auto",
  //       bottom: `${maxBottom}px`, // 푸터 위에서 300px 위치
  //     });
  //   } else {
  //     // 스크롤 중일 때 fixed 상태 유지
  //     sideWrap.css({
  //       position: "fixed",
  //       top: "30%", // 초기 top 위치 유지
  //       bottom: "auto",
  //     });
  //   }
  // });




  //tabs
  /* layer tab */
function layerTab() {
	const layerTabArea = document.querySelectorAll('.tab-area.layer');

	/* 탭 접근성 텍스트 세팅 */
	const tabAccText = document.createTextNode(' 선택됨');
	const tabAccTag = document.createElement('i');
	tabAccTag.setAttribute('class', 'sr-only created');
	tabAccTag.appendChild(tabAccText);

	layerTabArea.forEach(e => {
		const layerTabEle = e.querySelectorAll('.tab > ul > li');
		const tabPanel = e.querySelectorAll('.tab-conts');

		function tab() {
			layerTabEle.forEach(ele => {
				const control = ele.getAttribute('aria-controls');
				const selectedTabPanel = document.getElementById(control);

				if (ele.classList.contains('active')) {
					//선택됨 텍스트 추가
					ele.querySelector('button').append(tabAccTag);
				}

				ele.addEventListener('click', () => {
					layerTabInitial(); //레이어탭 초기화

					ele.classList.add('active');
					ele.querySelector('button').append(tabAccTag); //선택됨 텍스트 추가
					ele.setAttribute('aria-selected', 'true');
					selectedTabPanel.classList.add('active');
				});
			});
		}

		//레이어탭 초기화
		function layerTabInitial() {
			layerTabEle.forEach(ele => {
				ele.classList.remove('active');
				ele.setAttribute('aria-selected', 'false');
				//ele.removeAttribute('style');
				if (ele.classList.contains('active')) {
					const text = ele.querySelector('.sr-only.created');
					ele.querySelector('button').removeChild(text);
				}
			});
			tabPanel.forEach(ele => {
				ele.classList.remove('active');
				//ele.removeAttribute('style');
			})
		}
		tab();
	});
}
layerTab();


//모바일 gnb
$('.mo-gnb .menu-list .menu-item').on('click', function () {

  $('.mo-gnb .menu-list .menu-item').not(this).each(function () {
    $(this).removeClass('active'); 
    $(this).find('i').removeClass('arrow-up').addClass('arrow-down'); 
    $(this).find('.submenu').slideUp(300); 
  });

  if (!$(this).hasClass('active')) { 
    $(this).addClass('active'); 
    $(this).find('i').removeClass('arrow-down').addClass('arrow-up'); 
    $(this).find('.submenu').stop(true, true).slideDown(300); 
  } else {
    $(this).removeClass('active');
    $(this).find('i').removeClass('arrow-up').addClass('arrow-down'); 
    $(this).find('.submenu').stop(true, true).slideUp(300); 
  }
});














const $subNav = $('.sub-nav');
const stickyThreshold = 1100;

$(window).on('scroll', function () {
  const scrollPosition = $(window).scrollTop();

  if (scrollPosition >= stickyThreshold) {
    $subNav.addClass('sticky')
           .css({
             'border-top': 'none' // border-bottom 추가
           });
  } else {
    $subNav.removeClass('sticky')
    .css({
      'border-block': '1px solid var(--grayscale-30)' // border-bottom 추가
    });
  }
});


// 페이지 탑 이미지 확대 이벤트
const $textbox = $("#textbox");
const $paragraph = $textbox.find("p");
const $image = $("#image");

// 텍스트 효과 변수
let initialTop = 220; // 초기 위치
let thresholdInput = 600; // 스크롤 기준 위치
const colorChangeThresholdTextbox = 200; // <div> 색상 변경 기준 위치
const colorChangeThresholdParagraph = 300; // <p> 색상 변경 기준 위치

// 초기 top 값 및 스크롤 기준 위치를 화면 너비에 따라 설정하는 함수
function setInitialValues() {
  if ($(window).width() <= 768) {
    initialTop = 100; // 화면 너비가 768px 이하일 때 초기 top 값 변경
    thresholdInput = 750; // 화면 너비가 768px 이하일 때 스크롤 기준 위치 변경
  } else {
    initialTop = 220; // 기본값
    thresholdInput = 600; // 기본값
  }
}

// 스크롤 이벤트 (텍스트 효과)
$(window).on("scroll", function () {
  const scrollY = $(window).scrollTop();

  // Textbox 위치 변경
  if (scrollY < thresholdInput) {
    $textbox.css({
      position: "fixed",
      top: `${initialTop}px`,
    });
  } else {
    $textbox.css({
      position: "absolute",
      top: `${thresholdInput + initialTop}px`,
    });
  }

  // <div> 텍스트 색상 변경
  if (scrollY >= colorChangeThresholdTextbox) {
    $textbox.css("color", "#fff");
  } else {
    $textbox.css("color", "#000");
  }

  // <p> 텍스트 색상 변경
  if (scrollY >= colorChangeThresholdParagraph) {
    $paragraph.css("color", "#fff");
  } else {
    $paragraph.css("color", "var(--point-50)");
  }
});

// 화면 리사이즈 이벤트
$(window).on("resize", function () {
  setInitialValues(); // 화면 크기 변경 시 초기 top 및 스크롤 기준 위치 재설정
});

// 초기 값 설정
setInitialValues();

// 이미지 효과 변수
const maxHeight = 880; // 최대 높이
const maxScrollImage = 400; // 스크롤 기준 위치
const initialBorderRadius = 40; // 초기 border-radius 값

// 초기 너비와 높이를 계산하는 함수
function calculateInitialDimensions() {
  const windowWidth = $(window).width();
  let initialWidth, initialHeight;

  if (windowWidth <= 768) {
    // 화면 너비가 768px 이하일 때 고정값 설정
    initialWidth = 380;
    initialHeight = 520;
  } else {
    // 화면 너비의 80%와 비율에 따라 계산
    initialWidth = windowWidth * 0.8;
    initialHeight = initialWidth * (880 / 1500); // 비율에 따른 높이
  }
  return { initialWidth, initialHeight };
}

// 초기 스타일 설정
function setInitialImageStyle() {
  const $image = $(".content img");
  const { initialWidth, initialHeight } = calculateInitialDimensions();
  $image.css({
    width: `${initialWidth}px`,
    height: `${initialHeight}px`,
    borderRadius: `${initialBorderRadius}px`,
  });
}

// 스크롤 이벤트 처리
$(window).on("scroll", function () {
  const $image = $(".content img");
  const { initialWidth, initialHeight } = calculateInitialDimensions();
  const scrollY = $(window).scrollTop();
  const maxWidth = $(window).width(); // 최대 너비 (화면 너비)

  if (scrollY <= maxScrollImage) {
    const progress = scrollY / maxScrollImage; // 스크롤 진행 비율
    const width = initialWidth + progress * (maxWidth - initialWidth);
    const height = initialHeight + progress * (maxHeight - initialHeight);
    const borderRadius = initialBorderRadius - progress * initialBorderRadius;

    $image.css({
      width: `${width}px`,
      height: `${height}px`,
      borderRadius: `${borderRadius}px`,
    });
  } else {
    // 최대 크기에 도달하면 border-radius를 0으로 설정
    $image.css({
      width: `${maxWidth}px`,
      height: `${maxHeight}px`,
      borderRadius: "0px",
    });
  }
});

// 화면 리사이즈 이벤트 처리
$(window).on("resize", function () {
  setInitialImageStyle(); // 화면 크기 변경 시 초기 이미지 스타일 재적용
});

// 초기 스타일 설정 실행
setInitialImageStyle();
});
