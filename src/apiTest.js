const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '079986b141msha5cf549e0f6360dp14dfcbjsn97a2d3b076a8',
		'X-RapidAPI-Host': 'weatherbit-v1-mashape.p.rapidapi.com'
	}
};

fetch('https://weatherbit-v1-mashape.p.rapidapi.com/forecast/daily?lat=38.5&lon=-78.5', options)
	.then(response => response.json())
	.then(response => console.log(response))
	.catch(err => console.error(err));


