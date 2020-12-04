$(function() {
    //var likes = $('.like-button__text-like');
    //likesLen = likeButton.length;
    //var likes = [];
    var rateCheck = $('.rate-button__input');
    var rateButton = $('.rate-button');
    rateLen = rateButton.length;
    $.each(rateButton, function (i) {
        rate = parseInt($(rateButton[i]).data('rate'));
        setCheckRate($(rateButton[i]), rate);
    });
    // for (let i = 0; i<rateLen; i++){
    //     console.log(rateButton.data('rate'));
    //     //rate.push($('.rate-button')[i].data('rate'));
    // }
    console.log(rate);

    rateCheck.click(function () {
        rate = parseInt($(this).val());
        button = $($(this).parents(rateButton)[1]);
        //console.log(button);
        setCheckRate(button, rate);
        //var rate= $(this).parents('.rate-button').data('rate');
        //console.log(rate);


    });
    function setCheckRate(element, rate) {
        var checks = element.find("input[type='checkbox']");
        $.each(checks, function (i) {
            let val = false;
            if (i < rate) val = true;
            $(checks[i]).prop('checked', val);
        });

    }
});

