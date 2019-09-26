module.exports = class Comprador {
    constructor(
        cedula,
        pass,
         nombre,
         apellido,
        correo,
        estado,
        ciudad,
        genero
            ) {
        this.cedula = cedula;
        this.pass = pass;
        this.nombre = nombre;
        this.apellido = apellido;
        this.correo = correo;
        this.estado= estado;
        this.ciudad = ciudad;
        this.genero = genero;
           }
};