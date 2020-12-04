/* global document */

//const autosize = require('autosize');
//const ready = require('../../js/utils/documentReady.js');

//ready(function(){

  //autosize(document.querySelectorAll('textarea'));

//});

require('../../library/maskedinput/jquery.maskedinput.min.js');



$(function() {
    //задание заполнителя с помощью параметра placeholder
    $("#date").mask("99.99.9999", {placeholder: "ДД.ММ.ГГГГ" });
});

$(function() {
    var myDatepickerHidden = $('.field-text--dropdown__hidden');
    var myDatepicker = $('#date-from');
    var myDatepickerMultiple = $('#date-to')
    var myDatepickerButton = $('.dropdown__button');
    var selectedDates = [];

   var datepicker_visible = false;
    myDatepickerButton.click((function () {
        if (!datepicker_visible) {
            //myDatepicker.focus();
            myDatepicker.datepicker().data('datepicker').show();
        } else {
            //myDatepicker.blur();
            myDatepicker.datepicker().data('datepicker').hide();
        }
    }));

    myDatepicker.datepicker({
        //startDate: newDate(),
        navTitles: {
            days: 'MM yyyy',
            months: 'yyyy',
            years: 'yyyy1 - yyyy2'
        },
        clearButton: true,
        showButtonPanel: true,
        showEvent: 'none',
        prevHtml: '<span class="datepicker--nav-prev">' +
        '<svg class="icon  icon--arrow icon--arrow__datepicker icon--arrow__left"><use xlink:href="../img/sprite.svg#arrow-forward"></use></svg>' +
        '</span>',
        nextHtml: '<span class="datepicker--nav-next">' +
        '<svg class="icon  icon--arrow icon--arrow__datepicker"><use xlink:href="../img/sprite.svg#arrow-forward"></use></svg>' +
        '</span>',
        onSelect: function (fd, d, picker) {
            dateFrom = myDatepicker.val(fd.split("-")[0]);
            dateTo = myDatepickerMultiple.val(fd.split("-")[1]);
            selectedDates = fd;
        },
        onShow: function (inst, animationCompleted) {
            if(animationCompleted) datepicker_visible = true;

            const myDatepickerValue = myDatepicker.val().split('-');
            if (myDatepickerValue.length > 1) {
                $(myDatepicker).val(myDatepickerValue[0]);
                $(myDatepickerMultiple).val(myDatepickerValue[1]);
            }
        },
        onHide: function (inst, animationCompleted) {
            if(animationCompleted) datepicker_visible = false;

            const myDatepickerValue = myDatepicker.val().split('-');
            if (myDatepickerValue.length > 1) {
                $(myDatepicker).val(myDatepickerValue[0]);
                $(myDatepickerMultiple).val(myDatepickerValue[1]);
            }

        }
    });

    var applyButton = $('<span>');
    applyButton.html('Применить');
    //applyButton.addClass('datepicker--buttons');
    applyButton.addClass('datepicker--button apply--button');
    applyButton.attr('data-action','apply');
    myDatepicker.datepicker().data('datepicker').$datepicker.children('.datepicker--buttons').append(applyButton);

    var children = myDatepicker.datepicker().data('datepicker').$datepicker.children('.datepicker--buttons');
    console.log(children);

    // Event onClick applyBatton
    console.log(applyButton);
    console.log($('.datepicker--button'));

    applyButton.click((function (event) {
        //myDatepicker.datepicker().data('datepicker').hide();
        console.log('apply', selectedDates);
        event.stopPropagation();
        myDatepicker.datepicker().data('datepicker').hide();

    }));



});