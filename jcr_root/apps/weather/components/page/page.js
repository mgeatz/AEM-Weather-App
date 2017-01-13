'use strict';
use(['../lookup/lookup.js'],function (lookup) {

    var myvar = lookup.somevar;


    var partlycloudy = {
        image: '/etc/designs/weather/clientlibs/img/partlycloudy/partly-cloudy.gif',
        text: 'Partly_Cloudy'
    };
    var rain = {
        image: '/etc/designs/weather/clientlibs/img/rain/rain.gif',
        text: 'Rain'
    };
    var storming = {
        image: '/etc/designs/weather/clientlibs/img/storming/stormy.gif',
        text: 'Storming'
    };
    var sunny = {
        image: '/etc/designs/weather/clientlibs/img/sunny/sunny.jpg',
        text: 'Sunny'
    };

    var title = "Simple Weather";
    var description = "Lookup Weather By City";
  
    return {
        sunnyText: sunny.text,
        partlycloudyText: partlycloudy.text,
        stormingText: storming.text,
        rainText: rain.text,
        sunnyImage: sunny.image,
        partlycloudyImage: partlycloudy.image,
        stormingImage: storming.image,
        rainImage: rain.image,
        title: title,
        description: description,
        myvar: myvar
    };
});