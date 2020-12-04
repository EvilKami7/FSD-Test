$(function() {

    $('.range-slider__input').each(function() {
        var min= Number($(this).attr('data-min')),
            max= Number($(this).attr('data-max')),
            minValue = Number($(this).attr('data-value-min')),
            maxValue = Number($(this).attr('data-value-max')),
            step = Number($(this).attr('data-step')),
            $this = $(this);
        //console.log(minValue,maxValue,value,step,$this);



        $this.slider({
            range: true,
            max: max,
            min: min,
            step: step,
            values: [minValue, maxValue],
            slide: function(event, ui) {
                var selectedMin = ui.values[0],
                    selectedMax = ui.values[1],
                    currentValueMin = selectedMin,
                    currentValueMax = selectedMax;
                console.log(ui.values[0], ui.values[1]);
                // if(selectedMin > 999) {
                //     currentValueMin = selectedMin / 1000 + 'k';
                //     currentValueMax = selectedMax / 1000 + 'k';
                // }
                updateSliderInfo($this, currentValueMin, currentValueMax);
                //$this.find('.min-value').html(currentValueMin).attr('data-selected-value', selectedMin);
                //$this.find('.max-value').html(currentValueMax).attr('data-selected-value', selectedMax);

            }

        });

        var currentValueMin = minValue,
            currentValueMax = maxValue;
        // if(currentValueMin > 999) {
        //     currentValueMin = currentValueMin / 1000 + 'k';
        //     currentValueMax = currentValueMax / 1000 + 'k';
        // }

        $('.range-slider__range').html(currentValueMin);
        updateSliderInfo($this, minValue, maxValue);
        //$this.find('span[tabindex]:first-of-type .value').html(currentValueMin).attr('data-selected-value', minValue);
        //$this.find('span[tabindex]:first-of-type').append('<span class="value min-value" data-selected-value></span>').find('.value').html(currentValueMin).attr('data-selected-value', minValue);
        //$this.find('span[tabindex]:last-of-type').append('<span class="value max-value" data-selected-value></span>').find('.value').html(currentValueMax).attr('data-selected-value', maxValue);
    });

    function updateSliderInfo(element, value1, value2) {
        let slider_text = element.parent('div').prev('span');
        value1 = numberWithSpaces(value1);
        value2 = numberWithSpaces(value2);
        slider_text.text(value1 + '₽ - ' + value2 +'₽');
    }

    function numberWithSpaces(x) {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
    }


});
