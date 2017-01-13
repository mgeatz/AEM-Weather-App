$(function () {
    console.log('hi');
    var validationFlag = 0;
    var weather = {
        simpleValidation: function(city, state) {
            if (city !== undefined && city.length > 3 && state !== undefined && state.length > 1) {
				weather.getWeather(city, state);
            } else {
                validationFlag = 1;
                $('#temp').text('');
	            $('#condition').text('');
				$('.search-format').addClass('error');
                $('.error-message').show();
                $('.fahrenheit').hide();
                $('#weather-icon').hide();
            }
        },
        getLocation: function() {
            var location = $('.lookup-field').val();
            var city = location.split(',')[0];
            var state = location.split(',')[1];
            if (city.indexOf(' ')){
				var city = city.split(' ').join('_');
            }
            weather.simpleValidation(city, state);
        },
        getWeather: function(city, state) {
            $.ajax({
                url: 'http://api.wunderground.com/api/615b63848bd6926d/conditions/q/'+state+'/'+city+'.json',
                success: function(res){
                	console.log(res);
                	if(validationFlag === 1){
                		console.log('validationFlag is not null but should be, so remove reset the error messages');
                		$('.search-format').removeClass('error');
                		$('.error-message').hide();
		                $('.fahrenheit').show();
		                $('#weather-icon').show();
            		}
                   	// weather cases
                   	switch(res.current_observation.weather) {
                        case 'Sunny':
		                case 'Clear':
                			$('.Rain').hide();
                            $('.Partly_Cloudy').hide();
                            $('.Rain').hide();
                            $('.Sunny').show();
                            break;
		                case 'Overcast':
                            $('.Sunny').hide();
                            $('.Partly_Cloudy').hide();
                            $('.Rain').hide();
                            $('.Storming').show();
                            break;
                		case 'Partly Cloudy':
                		case 'Mostly Cloudy':
                			$('.Sunny').hide();
                            $('.Storming').hide();
                            $('.Rain').hide();
                            $('.Partly_Cloudy').show();
                            break;
                        case 'Rain':
                			$('.Sunny').hide();
                            $('.Partly_Cloudy').hide();
                            $('.Storming').hide();
                            $('.Rain').show();
                            break;
                        default:
                            $('.Rain').show();
                    }
	                $('#temp').text(res.current_observation.temp_f);
	                $('#condition').text(res.current_observation.weather);
                	$('#weather-icon').html('<img src='+res.current_observation.icon_url+'>');
                },
                error: function(errData){
                	$('.weather-results').text('Hmm... It seems we cannot get the weather for you right now. Try reloading the page.');
                }
            });
        }
  	}
	$('#get-weather').click(weather.getLocation);
});