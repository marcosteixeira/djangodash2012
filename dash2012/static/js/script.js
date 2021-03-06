function center (element, outer) {
    element.css("left", ( outer.width() - element.outerWidth() ) / 2+outer.scrollLeft() + "px");
    return element;
};

function centerHeight (element, outer) {
    element.css("top", ( outer.height() - element.outerHeight() ) / 2+outer.scrollTop() + "px");
    return element;
};

$(document).ready(function() {

    $('.actions-trigger').click(function() {
        $('.actions-trigger').removeClass('open');
        $('.actions-dropdown').hide();
        $(this).toggleClass('open');
        $(this).next('.actions-dropdown').toggle('fast');
    });

    $(document).click(function(){
        $('.actions-dropdown').hide();
        $('.actions-trigger').removeClass('open');

    });

    $(".actions-trigger").click(function(e){
        e.stopPropagation();
    });

    $('.select-trigger').click(function() {
        $(this).toggleClass('open');
        $(this).next('.select-dropdown').toggle('fast');
    });

    $(document).click(function(){
        $('.select-dropdown').hide();
        $('.select-trigger').removeClass('open');

    });

    $(".select-holder").click(function(e){
        e.stopPropagation();
    });

    $('.popup-trigger').live('click', (function(){
        center($('.popup-holder'), $('body'));


        $('.popup-overlay').fadeIn('fast');
        $('.popup-holder').fadeIn('fast');
        $('.provider-form').hide();
    }));

    $('.popup-cancel').live('click', (function(){
        $('.popup-overlay').fadeOut('fast');
        $('.popup-holder').fadeOut('fast');
        $("form")[0].reset();

    }));

    $('.provider-am').live('click', (function(){
        $('#RS').hide();
        $('#AM').fadeIn('fast');

    }));
    
    $('.provider-rs').live('click', (function(){
        $('#AM').hide();
        $('#RS').fadeIn('fast');

    }));

    $('.all-filter').click(function() {
        $('.select-trigger').text('All services ▼');
        $('.amazon-row').fadeIn('fast');
        $('.rackspace-row').fadeIn('fast');

    });
    $('.amazon-filter').click(function() {
        $('.select-trigger').text('Amazon ▼');
        $('.rackspace-row').hide();
        $('.amazon-row').fadeIn('fast');

    });
    $('.rackspace-filter').click(function() {
        $('.select-trigger').text('Rackspace ▼');
        $('.amazon-row').hide();
        $('.rackspace-row').fadeIn('fast');

    });

    $('.filter-option').click(function() {
        $('.select-dropdown').hide();
        $('.select-trigger').removeClass('open');
    });



});
