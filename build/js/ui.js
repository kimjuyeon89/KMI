$(function(){

    /* 자동 타이틀 달아주기 */
    $('a, .btn, .eps').each(function(){
        let attr = $(this).text().trim();
        attr = attr.replace(/(\r\n|\n|\r)/gm,""); //줄바꿈 제거
        attr = attr.replace(/\s{2,}/g, ' '); //공백 2칸이상일경우 1칸으로

        if (!$(this).is('[title]')) {
            $(this).attr("title", attr);
        }

        if($('.eps').find('a').length > 0){ //eps 하위에 a 태그가 있을경우 eps에 title 제거
            $('.eps').removeAttr('title');
        }
    });

    /* 탭 리스트 */
    $('.tabList li').on({
        "click": function () {
            $(this).addClass('active').siblings('li').removeClass('active');
            $(this).closest('.tabNav').siblings('.tabCont').eq($(this).index())
            .addClass('active').siblings('.tabCont').removeClass('active');
        }
    });

    /* input 맞춤법 검사 제거 */
    $('input[type="text"]').attr('spellcheck', false);

    /* input disabled 자동 타이틀 */
    $('input[disabled].disabled').each(function(){
        $(this).attr('title', $(this).val());
    });

    /* textarea disabled 자동 타이틀 */
    $('textarea[disabled].disabled').each(function(){
        $(this).attr('title', $(this).text());
    });

});
