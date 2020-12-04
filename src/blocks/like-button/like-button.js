$(function() {
    var likeButton = $('.like-button__text-like');
    likesLen = likeButton.length;
    var likes = [];
    var likeCheck = $('.like-button__input');

    likeCheck.click(function () {
        var div = $(this).next('div');
        var span = div.children()[0];
        if($(this).is(':checked')){
            span.innerText = parseInt(span.innerText) + 1;
        }
        else {
            span.innerText = parseInt(span.innerText) - 1;
        }
    })
});