import Nino from "./Nino.js"

export default class Sprite {
  constructor(img, sx, sy, w, h, scale) {
    // Imagen del sprite
    this.img = img;
    // Posicion X en la imagen
    this.sx = sx;
    // Posicion Y en la imagen
    this.sy = sy;
    // Ancho del sprite
    this.w = w;
    // Alto del sprite
    this.h = h;
    // Escana del sprite
    this.scale = scale;
  }

  draw(ctx, x, y) {
    ctx.drawImage(
      // Imagen a dibujar
      this.img,
      // Coordenadas en la imagen
      this.sx * this.w,
      this.sy * this.h,
      // El largo y el ancho del sprite
      this.w,
      this.h,
      // Posicion en el juego
      x,
      y,
      // Escala
      this.w * Nino.Scene.scale,
      this.h * Nino.Scene.scale
    );
  }
}