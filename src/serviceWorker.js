export const registerServiceWorker = () => {
	if ('serviceWorker' in navigator) {
		window.addEventListener('load', function () {
			navigator.serviceWorker.register('/sw.js').then(function () {
				// Registration was successful
			}).catch(function () {
				// registration failed :(
			})
		})
	}
}