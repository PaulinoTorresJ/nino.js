export function loadImage(url) {
	return new Promise((resolve) => {
		const image = new Image();
		image.addEventListener('load', () => {
			resolve(image);
		});
		image.src = url;
	})
}

export function loadLevel(level) {
	return fetch(`rooms/${level}`).then(r => r.json());
}