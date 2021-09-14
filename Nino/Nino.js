import {loadImage, loadLevel} from './Loader.js';
import Math2 from "./Math.js";
import Scene from './Scene.js';
import Input from './Input.js';
import Sprite from "./Sprite.js";
import Object from './Object.js';

import Scene1 from '../video game/Main.js';// ! Corregir

const camera = {
	width: 11,
	height: 11,
	sy: 0, // Punto de referencia
	sx: 0,
	value: [],
	tileSize: 16
}

class Nino {

	static Math = Math2;
	static Input = Input;
	static Sprite = Sprite;
	static Scene = Scene;
	static Object = Object;

	static screen;

	constructor(params) {
		// Load params
		const {config, screen} = params;

		Nino.screen = {
			width: screen.width,
			height: screen.height
		}

		this.width = screen.width;
		this.height = screen.height;

		// Create canvas
		this.canvas = document.createElement("canvas");
		this.canvas.id = "nino-canvas";
		this.canvas.width = this.width;
		this.canvas.height = this.height;

		document.body.appendChild(this.canvas);

		this.ctx = this.canvas.getContext("2d");

		// Scene
		this.scene = new Scene(this.ctx);

		// Timer
		let deltaTime = 1 / config.frames;

		let accumulatedTime = 0;
		let lastTime = 0;
		this.updateProxy = (time = 0) => {
			accumulatedTime += (time - lastTime) / 1000;

			var numUpdateSteps = 0;
			while (accumulatedTime > deltaTime) {
				this.draw();
				this.updateManager(deltaTime);
				this.update(deltaTime);
				
				accumulatedTime -= deltaTime;
				if (++numUpdateSteps >= 240) {
					console.log("Panic!");
					accumulatedTime = 0;
					break;
			}
			}
			lastTime = time;

			this.enqueue();
		}

		this.promises = [];
		// Cargar archivos
		//this.load();
		this.loadManager();

		console.log("%c Nino.JS v1.0 ", "color: black; font-weight: 900; background-color: aquamarine");
	}

	loadImage(src) {
		return loadImage(src);
	}

	loadLevel(src) {
		return loadLevel(src);
	}

	loadManager() {
		this.load().then(() => {
			this.create();
			this.start();
		})
	}

	draw() {
		// Limpiar la pantalla
		this.ctx.clearRect(0, 0, this.width, this.height);

		this.ctx.lineWidth = 6;
		this.ctx.strokeStyle = 'lime';
		this.ctx.beginPath();
		this.ctx.rect(
			0,
			0,
			1024,
			600
			);
		this.ctx.stroke();
		this.ctx.lineWidth = 1;
	}

	enqueue() {
		requestAnimationFrame(this.updateProxy);
	}

	start() {
		this.enqueue();
	}

	updateManager(deltaTime) {
	// Transformar posicion de la pelota en valores del tile
	camera.sx = Nino.Math.clamp(Math.floor(Scene1.player.position.x), 0, Nino.screen.width);
	camera.sy = Nino.Math.clamp(Math.floor(Scene1.player.position.y), 0, Nino.screen.height);



		// El largo que va a dibujar
		let bx = Nino.Math.clamp(camera.sx + camera.width, 0, Nino.screen.width);
		let by = Nino.Math.clamp(camera.sy + camera.height, 0, Nino.screen.height);

		// Actualizar solo cierta seccion del mapa
		for (let y = camera.sy; y < by; ++y) {
			for (let x = camera.sx; x < bx; ++x) {
				// Crear bloque
				
			}
		}
		// Recorrer los elementos en el objeto
		for (let group in Nino.Object.instances) {
			// Recorrer el arreglo dentro del objeto
			Nino.Object.instances[group].forEach((object) => {

				if (object.update !== undefined) object.update(deltaTime);
				if (object.draw !== undefined) object.draw(this.ctx);
			})
		}
		// Actualizar escena
		// proximamente ...
	}

}

export default Nino;