export const getCurrentPosition = () =>
	new Promise((resolve, reject) => {
		navigator.geolocation.getCurrentPosition(
			function(position) {
				const { latitude, longitude } = position.coords;
				resolve({ lat: latitude, lng: longitude });
			},
			err => reject(err)
		);
	});
