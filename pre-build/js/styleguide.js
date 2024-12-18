/* styleguide 페이지 에서만 사용됩니다. */
$(function(){
    const $root = $('#root');
    const $menuItemActive = $('.styleguideMenuItem.active');
    const $menuItemActiveIndex = $menuItemActive.index();
    const menuItemHeight = 54;
    const menuListGap = 25;
    let sum = 34;
    let activeSum = 34;

    /* 혹시나 root에 position이 fixed일경우 */
    if($root.find('.styleguideRoot').length > 0) {
        $root.css('position', 'static');
    }

    $('.styleguideMenuItem').on({
        'click': function() {
            let index = $(this).index();

            $(this).addClass('active').siblings().removeClass('active');
            
            if ($(this).hasClass('active')) {
                sum = index * (menuItemHeight + menuListGap) + 34;
                $('#styleguideMenuLine').css('top', `${sum}px`);
            }
        }
    });

    $('#styleguideMenuLine').each(function(){
        activeSum = $menuItemActiveIndex * (menuItemHeight + menuListGap) + 34;
        $(this).css('top', `${activeSum}px`);
    });

    $('.styleguideBtnCodingList').on({
        'click': function() {
            window.open(codingList, '_blank');
        }
    });

    const $firstMenuItem = $('.styleguideMenuItem:first-of-type a');
    let codingList = '../html/00_coding_list.html';
    let styleguideUrl = '../html/styleguide.html';

    if (location.pathname.includes('/html/styleguide.html')) {
        $firstMenuItem.attr('href', styleguideUrl);
        $('.styleguideLeftAreaLogo').attr('src', '../images/common/logo/img-if-logo.png');
    } else {
        styleguideUrl = '../styleguide.html';
        codingList = '../../html/00_coding_list.html';
        $firstMenuItem.attr('href', styleguideUrl);
        $('.styleguideLeftAreaLogo').attr('src', '../../images/common/logo/img-if-logo.png');

        //첫번째 styleguideMenuItem의 a를 제외한 나머지 a태그의 href 값을 현재 파일경로에 맞게 변경합니다.
        $('.styleguideMenuItem:not(:first-of-type) a').each(function(){
            const link = $(this).attr('href');
            const linkReplace = link.replace('../html', '..');
            $(this).attr('href', linkReplace);
        });
    }

    $('.styleguideLeftAreaLogo').css('display', 'block');
});