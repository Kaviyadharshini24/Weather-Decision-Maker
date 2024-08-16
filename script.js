document.getElementById('get-weather').addEventListener('click', () => {
    const city = document.getElementById('city-input').value;
  
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city} &units=metric&appid=f3d317a7ae9430220250d6b950620133 `;

    const selectedActivity = document.querySelector('input[name="activity"]:checked');
    if (!selectedActivity) {
        document.getElementById('submit').innerText = 'Please select an activity.';
        return;
    }

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            if (data.cod === 200) {
                const temperature = data.main.temp;
                const weatherDescription = data.weather[0].description.toLowerCase();
                let submit = '';
                document.getElementById('temperature').innerText = `Temperature: ${temperature}°C`;

                if (selectedActivity.value === 'play') {
                    if (weatherDescription.includes('sunny') || temperature > 20) {
                       submit = 'Yes, you can play outdoor games with your friends and family !!! Have a Joyful day';
                    } else {
                        submit= 'The weather is not ideal for outdoor games.';
                    }
                } else if (selectedActivity.value === 'events') {
                    if (temperature > 15) {
                        submit = 'Yes, you can conduct events. The weather is favorable!';
                    } else {
                        submit = 'The weather is not ideal for conducting events.';
                    }
                } else if (selectedActivity.value === 'tourist') {
                    if (weatherDescription.includes('clear') || temperature > 10) {
                        submit = 'Yes, you can visit tourist places and enjoy the sights!';
                    } else {
                        submit = 'The weather might not be suitable for visiting tourist places.';
                    }
                }

                document.getElementById('submit').innerText = submit;
            } else {
                document.getElementById('submit').innerText = 'City not found. Please try again.';
            }
        })
        .catch(error => {
            document.getElementById('submit').innerText = 'Something went wrong. Please try again.';
        });
});
