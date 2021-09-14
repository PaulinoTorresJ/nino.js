const PRESSED = 1;
const RELEASED = 0;

export default class Input {
	constructor() {
		// Mapa de las teclas
		this.keyMap = new Map();

		// Mapa de telcas presionadas
		this.pressed = new Map();
		// Escuchar a los eventos del teclado
		this.listener();
	}
	getButtonPress(key) {
		if (this.keyMap.get(key) && !this.pressed.get(key)) {
			this.pressed.set(key, true);
			return true;
		} else return false;
	}

	getButton(key) {
		return this.keyMap.get(key);
	}

	eventHandler(event) {
		// Evitar funcionamiento por defecto
		event.preventDefault();

		const input = {
			key: event.key,
			state: event.type === "keydown" ? PRESSED : RELEASED,
		}

		// Si el estado es igual al estado 
		if (this.keyMap.get(input.key) === input.state) { return; }

		// Asigar estado de teclas presionadas
		if (!input.state) { this.pressed.set(input.key, false); }

		// Asignar los valores
		this.keyMap.set(input.key, input.state);
	}

	listener() {
		["keydown", "keyup"].forEach(eventName => {
			window.addEventListener(eventName, event => {
				this.eventHandler(event);
			});
		});
	}

}