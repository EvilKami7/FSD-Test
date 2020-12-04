$(function() {
    let checkboxTitle = $('.checkbox-list__title--title');
    let checkboxButton = $('.checkbox-list__title--mode');
    let wrap = $('.checkbox-list-wrap--hidden');
    checkboxButton.click(function () {
        wrap.toggle('checkbox-list-wrap');
    })
    checkboxTitle.click(function () {
        wrap.toggle('checkbox-list-wrap');
    })
})