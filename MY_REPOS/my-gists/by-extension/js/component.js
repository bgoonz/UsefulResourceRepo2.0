import Ember from 'ember';

let flakes = [];

function render(ctx, width, height, [min, max]) {
	ctx.clearRect(0, 0, width, height);

	for (let i = 0; i < flakes.length; i++) {
		const flake = flakes[i];
		const { r, o, sx, sy } = flake;
		let { x, y } = flake;

		x += sx;
		y += sy;

		if (x > width + 2 * r) {
			x -= width + 2 * r;
		}

		if (y > height + 2 * r) {
			y -= height + 2 * r;

			flake.r = Math.random() * (max - min) + min;
		}

		ctx.beginPath();
		ctx.arc(x - r, y - r, r, 0, 2 * Math.PI, false);
		ctx.closePath();

		ctx.fillStyle = `rgba(255, 255, 255, ${o})`;
		ctx.fill();

		flake.y = y;
		flake.x = x;
	}

	requestAnimationFrame(() => render(ctx, width, height, [min, max]));
}

export default Ember.Component.extend({
	classNames: [
		'x-snow',
	],

	tagName: 'canvas',
	template: '',

	count: null,
	width: null,
	height: null,
	fullscreen: false,

	willInsertElement() {
		const canvas = this.element;
		const fullscreen = this.get('fullscreen');
		const count = this.get('count');

		const w = canvas.width = (fullscreen) ? window.innerWidth : this.get('width');
		const h = canvas.height = (fullscreen) ? window.innerHeight : this.get('height');

		const ctx = canvas.getContext('2d');

		this._seed(count || Math.round(w / 20), w, h, [3, 22], [-2, 2], [2, 4]);

		render(ctx, w, h, [3, 20]);
	},

	_seed(count, width, height, [min = 0, max = 1], [sxmin = -1, sxmax = 1], [symin = 0, symax = 1]) {
		flakes = [];

		for (let i = 0; i < count; i++) {
			flakes.push({
				x: Math.random() * width,
				y: Math.random() * height,
				r: Math.random() * (max - min) + min,
				o: Math.random(),
				sx: Math.random() * (sxmax - sxmin) + sxmin,
				sy: Math.random() * (symax - symin) + symin,
			});
		}
	},
});
