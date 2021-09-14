
import Nino from "./Nino.js"

export default class Object {
	
	static instances = {};
	static blocks = [];

	static idCount = 0;

	constructor(properties) {

		const {
		id,
		position
		} = properties;

		this.id = id;

		this.position = position;

		// this.sprite = {
		// 	width: undefined,
		// 	height: undefined
		// };

		this.mask = {
			width: undefined,
			height: undefined
		};

		// Llamar funcion create
		this.create();
	}

	/**
	 * * Generate an unique id
	 * 
	 * @return {string}
	 */
	static idGenerator() {
		return '_' + Math.random().toString(36).substr(2, 9);
	}

	static defineGroup(groupName) {
		Object.instances[groupName] = [];
	}
	/**
	 * * Create an object 
	 * 
	 * @param {object} object
	 * @param {position} object
	 * 
	 * @return {object}
	 */
	static create(group, object, properties) {
		const obj = new object({
			id: this.idGenerator(),
			position: properties.position
		});
		// Push the object into the array

		Object.instances[group].push(obj);

		return obj;
	}

	/**
	 * * Destroy an object 
	 * 
	 * @param {object} object
	 * 
	 * @return {void}
	 */
	static destroy(object) {
		for (const [index, element] of Object.instances.entries()) {
			if (element.id === object.id) {
				Object.instances.splice(index, 1);
				break;
			}
		}
	}

	// Draw Collisions
	drawMask(ctx, color) {
		ctx.strokeStyle = color;
		ctx.beginPath();
		ctx.rect(
			this.position.x * Nino.Scene.scale + Nino.Scene.xOffset,
			this.position.y * Nino.Scene.scale + Nino.Scene.yOffset,
			this.mask.width * Nino.Scene.scale,
			this.mask.height * Nino.Scene.scale
			);
		ctx.stroke();
	}

	// Dibujar sprite
	drawSprite(ctx, xOffset = 0, yOffset = 0) {
		this.sprite.draw(ctx, this.position.x * Nino.Scene.scale + Nino.Scene.xOffset + xOffset, this.position.y * Nino.Scene.scale + Nino.Scene.yOffset + yOffset);
	}

}