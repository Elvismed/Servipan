-- phpMyAdmin SQL Dump
-- version 4.8.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 18-09-2019 a las 21:05:07
-- Versión del servidor: 10.1.33-MariaDB
-- Versión de PHP: 7.2.6

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `servipan`
--
CREATE DATABASE IF NOT EXISTS `servipan` DEFAULT CHARACTER SET latin1 COLLATE latin1_swedish_ci;
USE `servipan`;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `bancos`
--

CREATE TABLE `bancos` (
  `idbanco` int(11) NOT NULL,
  `banco` varchar(250) COLLATE utf8_spanish_ci NOT NULL,
  `cuenta` varchar(250) COLLATE utf8_spanish_ci NOT NULL,
  `tipo` varchar(250) COLLATE utf8_spanish_ci NOT NULL,
  `id_panaderia` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

--
-- Volcado de datos para la tabla `bancos`
--

INSERT INTO `bancos` (`idbanco`, `banco`, `cuenta`, `tipo`, `id_panaderia`) VALUES
(3, 'Provincial', '01080272510100202395', 'Corriente', 1),
(9, 'BOD', '01164657789774532276', 'Ahorro', 1),
(10, 'Provincial', '01080272510100202395', 'Corriente', 3),
(11, 'Banesco', '01340272510100202395', 'Corriente', 3),
(12, 'BOD', '01160272510100202395', 'Ahorro', 3),
(13, 'Venezuela', '01020272510100202395', 'Ahorro', 3),
(14, 'Mercantil', '01050272510100202395', 'Corriente', 3),
(15, 'Bicentenario', '01340272510100202395', 'Corriente', 3);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `categorias`
--

CREATE TABLE `categorias` (
  `idcategoria` int(11) NOT NULL,
  `nombre_cat` varchar(50) COLLATE utf8_spanish_ci NOT NULL,
  `imagen` text COLLATE utf8_spanish_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

--
-- Volcado de datos para la tabla `categorias`
--

INSERT INTO `categorias` (`idcategoria`, `nombre_cat`, `imagen`) VALUES
(1, 'Frances', 'https://servipan.000webhostapp.com/img/pro.png'),
(2, 'Campesino', 'https://servipan.000webhostapp.com/img/pro6.png'),
(3, 'Canilla', 'https://servipan.000webhostapp.com/img/pro5.png'),
(4, 'Andino', 'https://servipan.000webhostapp.com/img/pro3.png'),
(5, 'Dulce', 'https://servipan.000webhostapp.com/img/pro2.png'),
(6, 'Cachito', 'https://servipan.000webhostapp.com/img/pro4.png'),
(7, 'Sandwich', 'https://servipan.000webhostapp.com/img/pro7.png'),
(8, 'Bebidas', ''),
(9, 'Carnes', ''),
(10, 'Dulces', ''),
(11, 'Verduras', ''),
(12, 'Frutas', '');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `compradores`
--

CREATE TABLE `compradores` (
  `idcomprador` int(11) NOT NULL,
  `cedula` varchar(250) COLLATE utf8_spanish_ci NOT NULL,
  `pass` varchar(45) COLLATE utf8_spanish_ci NOT NULL,
  `nombre` varchar(50) COLLATE utf8_spanish_ci NOT NULL,
  `apellido` varchar(50) COLLATE utf8_spanish_ci NOT NULL,
  `correo` varchar(100) COLLATE utf8_spanish_ci NOT NULL,
  `estado` varchar(50) COLLATE utf8_spanish_ci NOT NULL,
  `ciudad` varchar(50) COLLATE utf8_spanish_ci NOT NULL,
  `genero` enum('Masculino','Femenino','Oculto','') COLLATE utf8_spanish_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

--
-- Volcado de datos para la tabla `compradores`
--

INSERT INTO `compradores` (`idcomprador`, `cedula`, `pass`, `nombre`, `apellido`, `correo`, `estado`, `ciudad`, `genero`) VALUES
(2, '0000', '1234', 'Elvisexual', 'Medina', 'user@gmail.com', 'zulia', 'marcaibo', 'Masculino'),
(3, '29871961', '1234', 'Jose', 'Perozo', 'perozo64@gmail.com', 'Falcon', 'Coro', 'Oculto'),
(4, '26937432', '0000', 'Jose', 'Perozo', 'perojdjdksks', 'Zulia', 'Maracaibo', 'Masculino');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `compras`
--

CREATE TABLE `compras` (
  `idcompra` int(11) NOT NULL,
  `nombre_pro` varchar(250) NOT NULL,
  `cantidad` int(11) NOT NULL,
  `precio` double NOT NULL,
  `total` double NOT NULL,
  `estatus` varchar(250) NOT NULL,
  `banco_emisor` varchar(250) NOT NULL,
  `nrefe` varchar(250) NOT NULL,
  `id_compra` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `compras`
--

INSERT INTO `compras` (`idcompra`, `nombre_pro`, `cantidad`, `precio`, `total`, `estatus`, `banco_emisor`, `nrefe`, `id_compra`) VALUES
(5, 'Pan frances', 5, 1500, 2250000, 'EN PROCESO', 'BOD', '1111', 3);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `panaderias`
--

CREATE TABLE `panaderias` (
  `idpanaderia` int(11) NOT NULL,
  `rif` varchar(250) COLLATE utf8_spanish_ci NOT NULL,
  `pass` varchar(45) COLLATE utf8_spanish_ci NOT NULL,
  `correo_pan` varchar(250) COLLATE utf8_spanish_ci NOT NULL,
  `nombre_pan` varchar(100) COLLATE utf8_spanish_ci NOT NULL,
  `estado` varchar(100) COLLATE utf8_spanish_ci NOT NULL,
  `ciudad` varchar(100) COLLATE utf8_spanish_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

--
-- Volcado de datos para la tabla `panaderias`
--

INSERT INTO `panaderias` (`idpanaderia`, `rif`, `pass`, `correo_pan`, `nombre_pan`, `estado`, `ciudad`) VALUES
(1, '0000', '1234', 'pistacho@gmail.com', 'Pistacho Panaderia', 'Zulia', 'Maracaibo'),
(2, '29871961', '1234', 'perozo64@gmail.com', 'Mega Panaderia', 'falcon', 'coro'),
(3, '26626146', '1234', 'servipan@gmail.com', 'ServiPan C.A', 'Zulia', 'Maracaibo');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `precios`
--

CREATE TABLE `precios` (
  `idprecio` int(11) NOT NULL,
  `precio` double NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `precios`
--

INSERT INTO `precios` (`idprecio`, `precio`) VALUES
(1, 5.18),
(3, 0.32),
(4, 1.34),
(5, 0.68),
(6, 0.68),
(7, 0.68),
(8, 4.09),
(9, 4.09),
(10, 9.2),
(11, 0.68),
(12, 1.82),
(13, 4.47),
(14, 4.47),
(15, 0.61);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `productos`
--

CREATE TABLE `productos` (
  `idproducto` int(11) NOT NULL,
  `nombre` varchar(100) COLLATE utf8_spanish_ci NOT NULL,
  `precio` double NOT NULL,
  `stock` int(11) NOT NULL,
  `idcategoria` int(11) NOT NULL,
  `idpanaderia` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

--
-- Volcado de datos para la tabla `productos`
--

INSERT INTO `productos` (`idproducto`, `nombre`, `precio`, `stock`, `idcategoria`, `idpanaderia`) VALUES
(1, 'Pan frances', 1500, 30, 1, 1),
(2, 'Pan campesino', 7500, 20, 2, 1),
(3, 'Pan canilla', 6000, 30, 3, 1),
(4, 'Pan andino', 7500, 40, 4, 1),
(5, 'Pan dulce trensa', 7800, 10, 5, 1),
(6, 'Pan Sandwich', 25000, 100, 7, 1),
(11, 'Pan Andino', 9500, 20, 4, 2),
(12, 'pan frances', 1200, 20, 1, 2),
(13, 'pan canilla', 4500, 40, 3, 2),
(14, 'Cachito extra queso', 12500, 10, 6, 2);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `ventas`
--

CREATE TABLE `ventas` (
  `idventa` int(11) NOT NULL,
  `nombre_pro` varchar(250) NOT NULL,
  `cantidad` int(11) NOT NULL,
  `precio` double NOT NULL,
  `total` double NOT NULL,
  `estatus` varchar(250) DEFAULT NULL,
  `banco_emisor` varchar(250) DEFAULT NULL,
  `nrefe` int(11) NOT NULL,
  `nombre_pan` varchar(250) NOT NULL,
  `rif` int(11) NOT NULL,
  `codigo_venta` int(11) NOT NULL,
  `id_comprador` int(11) NOT NULL,
  `idpana` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `ventas`
--

INSERT INTO `ventas` (`idventa`, `nombre_pro`, `cantidad`, `precio`, `total`, `estatus`, `banco_emisor`, `nrefe`, `nombre_pan`, `rif`, `codigo_venta`, `id_comprador`, `idpana`) VALUES
(3, 'Pan frances', 10, 0, 15000, 'EN PROCESO', 'Provincial', 0, '', 0, 474551, 3, 3),
(4, 'Pan canilla', 10, 0, 60000, 'EN PROCESO', 'Provincial', 0, '', 0, 474551, 3, 3),
(5, 'Pan frances', 10, 0, 15000, 'EN PROCESO', 'Venezuela', 1010010101, '', 0, 363404, 3, 1),
(6, 'Cachito extra queso', 6, 0, 75000, 'EN PROCESO', 'Venezuela', 1010010101, '', 0, 363404, 3, 2),
(7, 'Pan Andino', 16, 0, 152000, 'APROBADA', 'Visa', 123456789, '', 0, 169606, 3, 2),
(17, 'Pan Sandwich', 2, 0, 50000, 'EN PROCESO', 'PAYPAL', 101010, '', 0, 324297, 3, 1),
(18, 'Pan frances', 10, 0, 15000, 'EN PROCESO', 'Venezuela', 77887788, '', 0, 962012, 3, 1),
(19, 'Pan canilla', 10, 0, 60000, 'EN PROCESO', 'Venezuela', 0, '', 0, 484996, 3, 1),
(20, 'Pan andino', 10, 0, 75000, 'EN PROCESO', 'BFC', 0, '', 0, 442707, 3, 1),
(21, 'Pan campesino', 10, 0, 75000, 'EN PROCESO', 'PAYPAL', 101010, '', 0, 437382, 3, 1),
(22, 'Pan canilla', 10, 0, 60000, 'EN PROCESO', 'PAYPAL', 101010, '', 0, 437382, 3, 1),
(80, 'Pan Andino', 6, 0, 57000, 'EN PROCESO', 'Provincial', 1234, '', 0, 332575, 3, 2);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `bancos`
--
ALTER TABLE `bancos`
  ADD PRIMARY KEY (`idbanco`),
  ADD KEY `id_panaderia` (`id_panaderia`);

--
-- Indices de la tabla `categorias`
--
ALTER TABLE `categorias`
  ADD PRIMARY KEY (`idcategoria`);

--
-- Indices de la tabla `compradores`
--
ALTER TABLE `compradores`
  ADD PRIMARY KEY (`idcomprador`);

--
-- Indices de la tabla `compras`
--
ALTER TABLE `compras`
  ADD PRIMARY KEY (`idcompra`),
  ADD KEY `id_compra` (`id_compra`);

--
-- Indices de la tabla `panaderias`
--
ALTER TABLE `panaderias`
  ADD PRIMARY KEY (`idpanaderia`);

--
-- Indices de la tabla `precios`
--
ALTER TABLE `precios`
  ADD PRIMARY KEY (`idprecio`);

--
-- Indices de la tabla `productos`
--
ALTER TABLE `productos`
  ADD PRIMARY KEY (`idproducto`),
  ADD KEY `idcategoria` (`idcategoria`),
  ADD KEY `idpanaderia` (`idpanaderia`);

--
-- Indices de la tabla `ventas`
--
ALTER TABLE `ventas`
  ADD PRIMARY KEY (`idventa`),
  ADD KEY `idpana` (`idpana`),
  ADD KEY `idcomprador` (`id_comprador`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `bancos`
--
ALTER TABLE `bancos`
  MODIFY `idbanco` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT de la tabla `categorias`
--
ALTER TABLE `categorias`
  MODIFY `idcategoria` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT de la tabla `compradores`
--
ALTER TABLE `compradores`
  MODIFY `idcomprador` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `compras`
--
ALTER TABLE `compras`
  MODIFY `idcompra` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de la tabla `panaderias`
--
ALTER TABLE `panaderias`
  MODIFY `idpanaderia` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `precios`
--
ALTER TABLE `precios`
  MODIFY `idprecio` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT de la tabla `productos`
--
ALTER TABLE `productos`
  MODIFY `idproducto` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT de la tabla `ventas`
--
ALTER TABLE `ventas`
  MODIFY `idventa` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=81;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `bancos`
--
ALTER TABLE `bancos`
  ADD CONSTRAINT `bancos_ibfk_1` FOREIGN KEY (`id_panaderia`) REFERENCES `panaderias` (`idpanaderia`);

--
-- Filtros para la tabla `compras`
--
ALTER TABLE `compras`
  ADD CONSTRAINT `compras_ibfk_1` FOREIGN KEY (`id_compra`) REFERENCES `compradores` (`idcomprador`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `productos`
--
ALTER TABLE `productos`
  ADD CONSTRAINT `productos_ibfk_1` FOREIGN KEY (`idcategoria`) REFERENCES `categorias` (`idcategoria`),
  ADD CONSTRAINT `productos_ibfk_2` FOREIGN KEY (`idpanaderia`) REFERENCES `panaderias` (`idpanaderia`);

--
-- Filtros para la tabla `ventas`
--
ALTER TABLE `ventas`
  ADD CONSTRAINT `ventas_ibfk_1` FOREIGN KEY (`idpana`) REFERENCES `panaderias` (`idpanaderia`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `ventas_ibfk_2` FOREIGN KEY (`id_comprador`) REFERENCES `compradores` (`idcomprador`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
