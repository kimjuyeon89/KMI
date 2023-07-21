$(function(){
    $('.tabList li').on({
        'click': function(){
            $(this).children('button').attr('aria-selected', true).closest('li').siblings('li').children('button').attr('aria-selected', false);
        }
    });

    $('.tabList li').each(function(){
        if($(this).hasClass('active')){
            $(this).children('button').attr('aria-selected', true)
        } else {
            $(this).children('button').attr('aria-selected', false);
        }
    });
});