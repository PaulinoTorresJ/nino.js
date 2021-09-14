const math = {
	min: function(...params) {
		let min = Infinity;
		for (let i of params) min = i < min ? i : min;
		return min;
	},
	max: function (...params) {
		let max = -Infinity;
		for (let i of params) max = i > max ? i : max;
		return max;
	},
	lerp: function (a, b, amt) {
		return (1 - amt) * a + amt * b;
	},
	clamp: function (num, min, max) {
		return this.min(this.max(num, min), max);
	},
	randomRange: function (min, max) {
		return Math.floor(Math.random() * (max - min + 1)) + min;
	},
	distanceTo: function (obj1, obj2) {
		var distance = Math.sqrt((Math.pow(obj1.position.x - obj2.position.x, 2)) + (Math.pow(obj1.position.y - obj2.position.y, 2)));
		return distance;
  },
	collide: function (x, y, w, h, obj) {
		for (let i of obj) {
			if (
				x < i.position.x + i.mask.width &&
				y < i.position.y + i.mask.height &&
				i.position.x < x + w &&
				i.position.y < y + h) {
				return true;
			}
		}
	}
};

export default math;