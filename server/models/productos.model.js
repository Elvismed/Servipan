module.exports = class Producto {
    constructor(
        nombre,
        precio,
        stock,
        idcategoria,
        idpanaderia
            ) {
        this.nombre = nombre;
        this.precio = precio;
        this.stock = stock;
        this.idcategoria= idcategoria;
        this.idpanaderia = idpanaderia;
           }
};