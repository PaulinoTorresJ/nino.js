import Nino from '../Nino/Nino.js';
import Scene1 from '../../js/video game/Main.js';

const camera = {
	width: 25,
	height: 25,
	sy: 0, // Punto de referencia
	sx: 0,
	value: []
}

const map = {
	width: 0,
	height: 0,
	value: [],
	tileSize: 16
}

export default class Scene {

	static scale = 3;
	static xOffset = 0;
	static yOffset = 0;

	static mapWidth = 0;
	static mapHeight = 0;

	static voidedX = {
		img: undefined,
		level: undefined,
		Block: undefined
	}

	constructor(ctx) {
		this.ctx = ctx;

		this.cameraEnable = false;
		this.cameraFollowObject = null;

		this.tileSize = 16;

		//this.xOffset = 0;
		//this.yOffset = 0;
		this.viewPort = {
			width: 1024,
			height: 600
		};
		
	}

	createBlocks(img, level, Block) {

		map.width = level.layers[0].width;
		map.height = level.layers[0].height;
		// ---------------------------------------------------------------

		Scene.mapWidth = level.layers[0].width * this.tileSize;
		Scene.mapHeight = level.layers[0].height * this.tileSize;

		for (var y = 0; y < level.layers[0].height; ++y) {
			for (var x = 0; x < level.layers[0].width; ++x) {

				if (level.layers[0].data[x + y * 32] !== 0) {

				// Draw map
				let xpos = (level.layers[0].data[x + y * 32] - 1) % 13;
				let ypos = Math.floor((level.layers[0].data[x + y * 32] - 1) / 13);

				// Crear bloque
				let block = Nino.Object.create("blocks", Block, {
					position: {
						x: x * this.tileSize,
						y: y * this.tileSize
					}
				});
				block.sprite = new Nino.Sprite(img,
					xpos, ypos,
					16, 16, 2); // ? Funciona

					// Smooth
					this.ctx.imageSmoothingEnabled = false;
				}

			}
		}
	}

	update(deltaTime) {
		if (this.cameraEnable && this.cameraFollowObject !== null) {

		}
		Scene.xOffset =
			Nino.Math.clamp(
				this.viewPort.width / 2 - this.cameraFollowObject.position.x * Nino.Scene.scale,
				-Nino.Scene.mapWidth,
				0
			);

		Scene.yOffset =
			Nino.Math.clamp(
				this.viewPort.height / 2 - this.cameraFollowObject.position.y * Nino.Scene.scale,
				-999,
				0
			);
	}

}