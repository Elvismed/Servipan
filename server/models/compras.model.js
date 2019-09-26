module.exports = class Venta {
    constructor(
        nombre_pro,
        cantidad,
        precio,
        total,
        estatus,
        banco_emisor,
        nrefe,
        id_compra
    ) {
        this.nombre_pro = nombre_pro;
        this.cantidad = cantidad;
        this.precio = precio;
        this.total = total;
        this.estatus = estatus;
        this.banco_emisor =banco_emisor;
        this.nrefe = nrefe;
        this. id_compra =  id_compra;


    }
};