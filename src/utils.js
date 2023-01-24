export function getRandomColor() {
	const letters = "0123456789ABCDEF";
	let color = "#";
	for (let i = 0; i < 6; i++) {
		color += letters[Math.floor(Math.random() * 16)];
	}
	return color;
}

export function debounce(fn, ms) {
	let timeout;
	return function (...args) {
		timeout && clearTimeout(timeout);
		timeout = setTimeout(() => {
			timeout = null;
			fn(...args);
		}, ms);
	}
}
