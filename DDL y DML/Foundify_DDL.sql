CREATE DATABASE  IF NOT EXISTS "Foundify" /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `Foundify`;
-- MySQL dump 10.13  Distrib 8.0.44, for Win64 (x86_64)
--
-- Host: mysql-332f390-foundify.k.aivencloud.com    Database: Foundify
-- ------------------------------------------------------
-- Server version	8.4.8

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
SET @MYSQLDUMP_TEMP_LOG_BIN = @@SESSION.SQL_LOG_BIN;
SET @@SESSION.SQL_LOG_BIN= 0;

--
-- GTID state at the beginning of the backup 
--

SET @@GLOBAL.GTID_PURGED=/*!80000 '+'*/ '0635d63f-9be8-11f1-8db0-bec400aeb5a9:1-30,
53546423-aaec-11f1-89f2-eec75ace24a8:1-110,
6c59b5a7-967a-11f1-8537-c2b5c958f30e:1-38,
8bd1841e-9687-11f1-a019-ca015ca18d92:1-102,
afc8fb0d-97f4-11f1-a924-f686bc898dc0:1-25,
e8afc37f-b3d3-11f1-bc0a-629d430d3436:1-95';

--
-- Table structure for table `Administradores`
--

DROP TABLE IF EXISTS `Administradores`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Administradores` (
  `Tipo_id` char(4) COLLATE utf8mb4_general_ci NOT NULL COMMENT 'Tipo de documento del administrador ',
  `Id_administrador` varchar(15) COLLATE utf8mb4_general_ci NOT NULL COMMENT 'Numero de identificación del administrador',
  `Nombre` varchar(30) COLLATE utf8mb4_general_ci NOT NULL COMMENT 'Nombre completo del administrador',
  `Apellido` varchar(30) COLLATE utf8mb4_general_ci NOT NULL COMMENT 'Apellidos completos del Administrador',
  `Contacto` varchar(20) COLLATE utf8mb4_general_ci NOT NULL COMMENT 'Numero de contacto del administrador',
  `Email` varchar(50) COLLATE utf8mb4_general_ci NOT NULL COMMENT 'Dirección de correo electrónico. Debe ser única en el sistema',
  `Password` varchar(255) COLLATE utf8mb4_general_ci NOT NULL COMMENT 'Contraseña almacenada. Longitud máximo de 50  caracteres',
  `Estado` char(4) COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT 'Registra si la cuenta del administrador esta activa o inactiva',
  `Fecha_creacion` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT 'Registra de forma automatica la creacion de la cuenta',
  PRIMARY KEY (`Id_administrador`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Administradores`
--

LOCK TABLES `Administradores` WRITE;
/*!40000 ALTER TABLE `Administradores` DISABLE KEYS */;
INSERT INTO `Administradores` VALUES ('CC','1001091679','Santiago','Marin Moreno','3012061430','marinmoreno1127@gmail.com','$2b$12$JiWB7cjl/55pjAbvS0oPOuNTQIm.BWvst7S0LQ1O2PZBJIPfj/Pwq',NULL,'2026-09-22 06:43:45'),('CC','1007106989','deiby stid ','Rincon Ballesteros','3023846754','stid.deiby@gmail.com','$2b$12$Ti/8CihMdnM9FVFOuncBeOcpPdmVck7zDEJNP306LDhjXad0blEiO',NULL,'2026-09-22 06:43:45'),('CC','1050091820','Manuel Orlando ','Pineda Quintero','3203213007','manuell.pinen@gmail.com','$2b$12$EFZ/Nd1FI1V2PFdw473ECOEOTS9PS22ITjA5cSGyV.gX73wzSFvn.',NULL,'2026-09-22 06:43:45'),('CC','1947092830','santiago ','Pinzon Zabala','3002324364','santi,pinzon@gmail.com','$2b$12$H3wqe7bJmhXGYZW1RNA7guVtAeFzKZdiqM5gJ3TqlF03rQ10cNYpm',NULL,'2026-09-22 06:43:45');
/*!40000 ALTER TABLE `Administradores` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Categorias`
--

DROP TABLE IF EXISTS `Categorias`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Categorias` (
  `Id_categoria` varchar(20) COLLATE utf8mb4_general_ci NOT NULL COMMENT 'Identificador único de la categoría',
  `Categoria` varchar(20) COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT 'Nombre de la categoría a la cual pertenece el proyecto',
  `Descripcion` text COLLATE utf8mb4_general_ci NOT NULL COMMENT 'descripción de la categoría ',
  PRIMARY KEY (`Id_categoria`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Categorias`
--

LOCK TABLES `Categorias` WRITE;
/*!40000 ALTER TABLE `Categorias` DISABLE KEYS */;
INSERT INTO `Categorias` VALUES ('1','Salud','Salud - Servicios relacionados con el cuidado y bienestar fisico.'),('10','Educacion','Educacion - Herramientas para aprendizaje y formacion academica.'),('11','Empleo','Empleo - Plataformas relacionadas con empleo y oportunidades laborales.'),('12','Productividad','Productividad - Herramientas para organizaci?n y administraci?n de tareas.'),('13','Comunicacion','Comunicaci?n - Plataformas enfocadas en interaccion y comunicaci?n social.'),('14','seguridad','seguridad - Sistemas destinados a la proteccion y seguridad.'),('15','Tecnologia','Tecnologia - Productos en relacion a componentes, electronica e informatica.'),('2','Ambiental','Ambiental - Actividades enfocadas en el medio ambiente y reciclaje.'),('3','Servicios','Servicios - Plataformas enfocadas en atencion y servicios digitales.'),('4','Comercio','Comercio - Actividades de compra, venta y comercio digital.'),('5','Movilidad','Movilidad - Sistemas relacionados con transporte y desplazamiento.'),('6','Bienestar','Bienestar - Servicios orientados al bienestar y calidad de vida.'),('7','Finanzas','Finanzas - Plataformas relacionadas con dinero y pagos digitales.'),('8','Turismo','Turismo - Servicios enfocados en viajes y turismo.'),('9','Agricultura','Agricultura - Actividades relacionadas con cultivos y produccion agricola.');
/*!40000 ALTER TABLE `Categorias` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Comentarios`
--

DROP TABLE IF EXISTS `Comentarios`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Comentarios` (
  `Id_ comentario` varchar(20) COLLATE utf8mb4_general_ci NOT NULL COMMENT 'Identificador único del comentario',
  `Contenido` text COLLATE utf8mb4_general_ci NOT NULL COMMENT 'Texto del comentario. No puede estar vacío. Longitud máxima recomendada: 2000 caracteres',
  `Fecha_creacion` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT 'Fecha y hora de publicación. Asignada automáticamente.',
  `Id_usuario` varchar(20) COLLATE utf8mb4_general_ci NOT NULL COMMENT 'Número de identificación del usuario autor del comentario ',
  `Id_proyecto` int DEFAULT NULL COMMENT 'Identificador único del proyecto. Proyecto al que pertenece el comentario',
  PRIMARY KEY (`Id_ comentario`),
  KEY `fk_comentarios_usuario` (`Id_usuario`),
  CONSTRAINT `fk_comentarios_usuario` FOREIGN KEY (`Id_usuario`) REFERENCES `Usuarios` (`Id_usuario`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Comentarios`
--

LOCK TABLES `Comentarios` WRITE;
/*!40000 ALTER TABLE `Comentarios` DISABLE KEYS */;
/*!40000 ALTER TABLE `Comentarios` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Donaciones`
--

DROP TABLE IF EXISTS `Donaciones`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Donaciones` (
  `Id_donacion` varchar(20) COLLATE utf8mb4_general_ci NOT NULL COMMENT 'Identificador único de la donación',
  `Monto` decimal(10,2) DEFAULT NULL COMMENT 'Monto donado. Debe ser mayor a 0.00. No se permiten valores negativos ni cero',
  `Fecha` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT 'Fecha y hora en que se realizó la donación. Se asigna automáticamente ',
  `Estado` enum('completada','rechazada','reembolso') COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT 'Estado de la donación',
  `Id_usuario` varchar(20) COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT 'Número de identificación del usuario que realiza la donación ',
  `Id_proyecto` int DEFAULT NULL COMMENT 'Identificador único del proyecto. Proyecto receptor de la donación ',
  `Id_metodo_pago` varchar(20) COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT 'Identificador único del método de pago',
  PRIMARY KEY (`Id_donacion`),
  KEY `IdUsuario` (`Id_usuario`),
  KEY `IdMetodoPago` (`Id_metodo_pago`),
  KEY `IdProyecto` (`Id_proyecto`),
  CONSTRAINT `Donaciones_ibfk_1` FOREIGN KEY (`Id_usuario`) REFERENCES `Usuarios` (`Id_usuario`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `Donaciones_ibfk_2` FOREIGN KEY (`Id_metodo_pago`) REFERENCES `Metodos_pagos` (`Id_metodo_pago`),
  CONSTRAINT `Donaciones_ibfk_3` FOREIGN KEY (`Id_proyecto`) REFERENCES `Proyectos` (`Id_proyecto`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Donaciones`
--

LOCK TABLES `Donaciones` WRITE;
/*!40000 ALTER TABLE `Donaciones` DISABLE KEYS */;
INSERT INTO `Donaciones` VALUES ('D2001',45000.00,'2026-01-08 00:00:00',NULL,'1023456789',1001,'MT1001'),('D2002',110000.00,'2026-01-19 00:00:00',NULL,'79845612',1002,'MT1002'),('D2004',500000.00,'2026-03-21 00:00:00',NULL,'52347896',1004,'MT1001'),('D2006',45000.00,'2026-04-27 00:00:00',NULL,'91234567',1006,'MT1001'),('D2007',110000.00,'2026-05-14 00:00:00',NULL,'1098765432',1007,'MT1003'),('D2008',500000.00,'2026-06-02 00:00:00',NULL,'45678912',1008,'MT1002'),('D2009',150000.00,'2026-07-07 00:00:00',NULL,'1034567890',1009,'MT1001'),('D2010',90000.00,'2026-08-11 00:00:00',NULL,'52347896',1010,'MT1003'),('D2012',200000.00,'2026-11-13 00:00:00',NULL,'91234567',1012,'MT1003'),('D2013',15000.00,'2026-11-28 00:00:00',NULL,'1098765432',1013,'MT1002'),('D2014',60000.00,'2026-12-14 00:00:00',NULL,'45678912',1014,'MT1002'),('D2015',150000.00,'2026-12-22 00:00:00',NULL,'1023456789',1015,'MT1001'),('D2016',110000.00,'2026-12-30 00:00:00',NULL,'1034567890',1016,'MT1003'),('D2018',25000.00,'2026-01-01 00:00:00',NULL,'52347896',1018,'MT1003'),('D2019',50000.00,'2026-01-02 00:00:00',NULL,'1034567890',1019,'MT1001'),('D2020',80000.00,'2026-01-03 00:00:00',NULL,'91234567',1020,'MT1003');
/*!40000 ALTER TABLE `Donaciones` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Likes`
--

DROP TABLE IF EXISTS `Likes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Likes` (
  `Id_usuario` varchar(20) COLLATE utf8mb4_general_ci NOT NULL COMMENT 'Número de identificación del usuario que da like',
  `Id_proyecto` int NOT NULL COMMENT 'Identificador único del proyecto. Proyecto receptor de likes',
  PRIMARY KEY (`Id_usuario`,`Id_proyecto`),
  KEY `IdProyecto` (`Id_proyecto`),
  KEY `IdUsuario` (`Id_usuario`),
  CONSTRAINT `Likes_ibfk_1` FOREIGN KEY (`Id_proyecto`) REFERENCES `Proyectos` (`Id_proyecto`),
  CONSTRAINT `Likes_ibfk_2` FOREIGN KEY (`Id_usuario`) REFERENCES `Usuarios` (`Id_usuario`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Likes`
--

LOCK TABLES `Likes` WRITE;
/*!40000 ALTER TABLE `Likes` DISABLE KEYS */;
/*!40000 ALTER TABLE `Likes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Metodos_pagos`
--

DROP TABLE IF EXISTS `Metodos_pagos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Metodos_pagos` (
  `Id_metodo_pago` varchar(20) COLLATE utf8mb4_general_ci NOT NULL COMMENT 'Identificador único del método de pago',
  `Metodo_pago` enum('efectivo','targeta','pse') COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT 'Nombre o descripción del método de pago (''Tarjeta'', ''Efectivo'', ''PSE'').',
  PRIMARY KEY (`Id_metodo_pago`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Metodos_pagos`
--

LOCK TABLES `Metodos_pagos` WRITE;
/*!40000 ALTER TABLE `Metodos_pagos` DISABLE KEYS */;
INSERT INTO `Metodos_pagos` VALUES ('MT1000',''),('MT1001','efectivo'),('MT1002','targeta'),('MT1003','pse');
/*!40000 ALTER TABLE `Metodos_pagos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Nivel_reportes`
--

DROP TABLE IF EXISTS `Nivel_reportes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Nivel_reportes` (
  `Id_nivel_reporte` varchar(20) COLLATE utf8mb4_general_ci NOT NULL COMMENT 'Identificador único del reporte.',
  `Descripcion` text COLLATE utf8mb4_general_ci COMMENT 'Descripción detallada de la gravedad del reporte',
  `Tipos_reporte` varchar(20) COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT 'Como se identifica el reporte (Reporte por posible estafa, malversación de fondos, incumplimiento en tiempos de desarrollo, plagio, etc.)',
  `Nivel_reporte` enum('1','2','3') COLLATE utf8mb4_general_ci NOT NULL COMMENT 'Nivel de reporte: 1: Peligroso, 2: Riesgo. 3: Daño.',
  PRIMARY KEY (`Id_nivel_reporte`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Nivel_reportes`
--

LOCK TABLES `Nivel_reportes` WRITE;
/*!40000 ALTER TABLE `Nivel_reportes` DISABLE KEYS */;
INSERT INTO `Nivel_reportes` VALUES ('NR2001','La probabilidad + impacto de que ocurra un da?o','PELIGRO','1'),('NR2002','La fuente o situaci?n con potencial de causar da?o','RIESGO','2'),('NR2003','La consecuencia real ocurrida','DA?O','3');
/*!40000 ALTER TABLE `Nivel_reportes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Notificaciones`
--

DROP TABLE IF EXISTS `Notificaciones`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Notificaciones` (
  `Id_notificacion` varchar(10) COLLATE utf8mb4_general_ci NOT NULL COMMENT 'Identificador único de la notificación.',
  `Entidad` varchar(20) COLLATE utf8mb4_general_ci NOT NULL COMMENT 'Tipo de notificación al usuario',
  `Leido` tinyint DEFAULT NULL COMMENT 'Indica si el usuario ha leído la notificación. Default: FALSE.',
  `Mensaje` varchar(100) COLLATE utf8mb4_general_ci NOT NULL COMMENT 'Contenido del mensaje de la notificación',
  `Fecha` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT 'Fecha y hora de creación de la notificación. Asignada automáticamente.',
  `Id_usuario` varchar(20) COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT 'Número de identificación del usuario que recibe la notificación',
  PRIMARY KEY (`Id_notificacion`),
  KEY `IdUsuario` (`Id_usuario`),
  CONSTRAINT `Notificaciones_ibfk_1` FOREIGN KEY (`Id_usuario`) REFERENCES `Usuarios` (`Id_usuario`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Notificaciones`
--

LOCK TABLES `Notificaciones` WRITE;
/*!40000 ALTER TABLE `Notificaciones` DISABLE KEYS */;
INSERT INTO `Notificaciones` VALUES ('NF114001','Like',1,'USUARIO te ha dado like','2026-02-10 00:00:00','1023456789'),('NF114002','Repost',0,'USUARIO ha reposteado','2026-02-18 00:00:00','79845612'),('NF114003','Comentario',0,'USUARIO ha comentado','2026-04-17 00:00:00','1145678901'),('NF114004','Publicacion',0,'USUARIO ha publicado','2026-06-25 00:00:00','52347896'),('NF114005','Proyecto',1,'USUARIO ha modificado su proyecto','2026-05-26 00:00:00','1002987654'),('NF114006','Like',1,'USUARIO te ha dado like','2026-02-10 00:00:00','91234567'),('NF114007','Repost',0,'USUARIO ha reposteado','2026-02-18 00:00:00','1098765432'),('NF114008','Comentario',0,'USUARIO ha comentado','2026-04-17 00:00:00','45678912'),('NF114009','Publicacion',0,'USUARIO ha publicado','2026-06-25 00:00:00','1034567890');
/*!40000 ALTER TABLE `Notificaciones` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Proyectos`
--

DROP TABLE IF EXISTS `Proyectos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Proyectos` (
  `Id_proyecto` int NOT NULL COMMENT 'Identificador único del proyecto. Generado automáticamente.',
  `Titulo` varchar(30) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `Descripcion` text COLLATE utf8mb4_general_ci NOT NULL COMMENT 'Descripción detallada del proyecto.',
  `Meta_financiamiento` decimal(15,2) NOT NULL DEFAULT '0.00' COMMENT 'Monto objetivo a recaudar. Debe ser mayor a 0.00. No negativo.',
  `Fecha_creacion` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT 'Fecha de creación del proyecto.',
  `Fecha_limite` date NOT NULL COMMENT 'Fecha máxima para alcanzar la meta. Debe ser posterior a la fecha de creación.',
  `Estado` enum('abierta','cerrada','en financiamiento','sin financiar','financiada','no cumplio meta') COLLATE utf8mb4_general_ci NOT NULL DEFAULT 'abierta' COMMENT 'Estado del proyecto: ''borrador'', ''activo'', ''finalizado'', ''cancelado''. Default: ''borrador''.\r\n',
  `Id_usuario` varchar(15) COLLATE utf8mb4_general_ci NOT NULL COMMENT 'Número de identificación del usuario creador del proyecto',
  `Id_categoria` varchar(20) COLLATE utf8mb4_general_ci NOT NULL COMMENT '	Identificador único de la categoría',
  PRIMARY KEY (`Id_proyecto`),
  KEY `Id_Categoria` (`Id_categoria`),
  KEY `Id_Usuario` (`Id_usuario`),
  CONSTRAINT `Proyectos_ibfk_1` FOREIGN KEY (`Id_categoria`) REFERENCES `Categorias` (`Id_categoria`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `Proyectos_ibfk_2` FOREIGN KEY (`Id_usuario`) REFERENCES `Usuarios` (`Id_usuario`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Proyectos`
--

LOCK TABLES `Proyectos` WRITE;
/*!40000 ALTER TABLE `Proyectos` DISABLE KEYS */;
INSERT INTO `Proyectos` VALUES (1001,'Centro de Cuidado Animal','Plataforma diseñada para registrar, cuidar y monitorear mascotas y animales domésticos.',3500000.00,'2026-04-03 00:00:00','2026-09-03','abierta','1023456789','1'),(1002,'Sistema Integral Veterinario','Sistema que permite administrar citas, historiales médicos y servicios veterinarios.',6000000.00,'2025-12-31 00:00:00','2027-04-03','abierta','79845612','1'),(1003,'Red de Ayuda Ambiental','Proyecto enfocado en promover el reciclaje, la limpieza y el cuidado ambiental.',2200000.00,'2026-02-01 00:00:00','2028-02-11','abierta','1145678901','2'),(1004,'Plataforma de Seguridad del Ho','Aplicación desarrollada para mejorar la seguridad y el monitoreo de viviendas.',5500000.00,'2026-05-05 00:00:00','2026-12-03','abierta','52347896','14'),(1005,'Sistema Educativo Virtual','Herramienta digital que facilita clases virtuales, tareas y recursos educativos.',4000000.00,'2026-05-14 00:00:00','2027-08-11','abierta','1002987654','10'),(1006,'Servicio Digital de Comida','Plataforma que permite realizar pedidos de comida y gestionar entregas rápidas.',3800000.00,'2026-06-15 00:00:00','2026-09-13','abierta','91234567','3'),(1007,'Control Inteligente de Salud','Aplicación creada para registrar controles médicos y hábitos saludables diarios.',2700000.00,'2026-04-03 00:00:00','2028-09-13','abierta','1098765432','1'),(1008,'Gestión de Mascotas y Veterina','Sistema especializado en la administración de mascotas, dueños y veterinarias.',6500000.00,'2025-12-31 00:00:00','2026-12-31','abierta','45678912','1'),(1009,'Biblioteca Virtual Estudiantil','Plataforma educativa para consultar libros, préstamos y recursos académicos digitales.',2500000.00,'2026-02-07 00:00:00','2026-06-07','abierta','1034567890','10'),(1010,'Tienda Tecnológica Online','Sistema de ventas online enfocado en productos tecnológicos y electrónicos.',8000000.00,'2026-05-05 00:00:00','2027-01-05','abierta','52347896','3'),(1011,'Sistema de Transporte Urbano','Aplicación destinada a mejorar la movilidad y organización del transporte urbano.',4500000.00,'2026-05-14 00:00:00','2026-09-14','abierta','1002987654','5'),(1012,'Proyecto de Limpieza Comunitar','Proyecto comunitario orientado a campañas de limpieza y reciclaje en la ciudad.',1800000.00,'2026-06-15 00:00:00','2026-09-11','abierta','91234567','2'),(1013,'Programa de Vida Saludable','Aplicación enfocada en rutinas físicas, ejercicio y seguimiento del bienestar personal.',2300000.00,'2026-04-14 00:00:00','2026-12-24','abierta','1098765432','1'),(1014,'Sistema Seguro de Pagos','Plataforma segura para realizar pagos digitales y administrar facturación electrónica.',5000000.00,'2025-12-31 00:00:00','2026-07-29','abierta','45678912','3'),(1015,'Plataforma Inteligente de Viaj','Sistema diseñado para gestionar reservas, destinos turísticos y planes de viaje.',7500000.00,'2026-02-11 00:00:00','2027-02-11','abierta','1023456789','8'),(1016,'Gestión Moderna de Cultivos','Herramienta tecnológica para el control y administración de procesos agrícolas.',4800000.00,'2026-02-10 00:00:00','2029-03-10','abierta','1034567890','9'),(1017,'Aula Virtual Interactiva','Plataforma interactiva para clases virtuales, actividades y comunicación académica.',3200000.00,'2026-05-24 00:00:00','2028-04-24','abierta','1145678901','10'),(1018,'Sistema de Empleo y Trabajo','Sistema orientado a la búsqueda de empleo y gestión de oportunidades laborales.',2900000.00,'2026-06-15 00:00:00','2027-03-30','abierta','52347896','11'),(1019,'Administrador de Tareas Diaria','Aplicación diseñada para organizar tareas, actividades y recordatorios diarios.',1200000.00,'2026-04-30 00:00:00','2026-04-30','abierta','1034567890','12'),(1020,'Red de Conexión Comunitaria','Plataforma creada para facilitar la comunicación y conexión entre comunidades y usuarios.',2600000.00,'2025-12-31 00:00:00','2027-11-16','abierta','91234567','13');
/*!40000 ALTER TABLE `Proyectos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Proyectos_reportes`
--

DROP TABLE IF EXISTS `Proyectos_reportes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Proyectos_reportes` (
  `Id_proyecto_reporte` varchar(20) COLLATE utf8mb4_general_ci NOT NULL COMMENT 'Identificador único del proyecto_reporte.',
  `Id_proyecto` int NOT NULL COMMENT 'Número de identificación del usuario',
  `Id_reporte` varchar(15) COLLATE utf8mb4_general_ci NOT NULL COMMENT 'Identificador único del proyecto. ',
  PRIMARY KEY (`Id_proyecto_reporte`),
  KEY `Id_reporte` (`Id_reporte`),
  KEY `Id_proyecto` (`Id_proyecto`),
  CONSTRAINT `Proyectos_reportes_ibfk_1` FOREIGN KEY (`Id_reporte`) REFERENCES `Reportes` (`Id_reporte`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `Proyectos_reportes_ibfk_2` FOREIGN KEY (`Id_proyecto`) REFERENCES `Proyectos` (`Id_proyecto`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Proyectos_reportes`
--

LOCK TABLES `Proyectos_reportes` WRITE;
/*!40000 ALTER TABLE `Proyectos_reportes` DISABLE KEYS */;
/*!40000 ALTER TABLE `Proyectos_reportes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Publicaciones`
--

DROP TABLE IF EXISTS `Publicaciones`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Publicaciones` (
  `Id_publicacion` int NOT NULL AUTO_INCREMENT,
  `Id_usuario` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `Id_proyecto` int DEFAULT NULL,
  `Texto` text NOT NULL,
  `Imagen` varchar(255) DEFAULT NULL,
  `Fecha_publicacion` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`Id_publicacion`),
  KEY `Id_usuario` (`Id_usuario`),
  KEY `Id_proyecto` (`Id_proyecto`),
  CONSTRAINT `Publicaciones_ibfk_1` FOREIGN KEY (`Id_usuario`) REFERENCES `Usuarios` (`Id_usuario`),
  CONSTRAINT `Publicaciones_ibfk_2` FOREIGN KEY (`Id_proyecto`) REFERENCES `Proyectos` (`Id_proyecto`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Publicaciones`
--

LOCK TABLES `Publicaciones` WRITE;
/*!40000 ALTER TABLE `Publicaciones` DISABLE KEYS */;
INSERT INTO `Publicaciones` VALUES (3,'1145678901',1003,'hola',NULL,'2026-09-22 07:13:37');
/*!40000 ALTER TABLE `Publicaciones` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Reportes`
--

DROP TABLE IF EXISTS `Reportes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Reportes` (
  `Id_reporte` varchar(15) COLLATE utf8mb4_general_ci NOT NULL COMMENT 'Identificador único del reporte.',
  `Tipo_reporte` varchar(10) COLLATE utf8mb4_general_ci NOT NULL COMMENT 'Se especifica la gravedad del reporte.',
  `Descripcion` varchar(255) COLLATE utf8mb4_general_ci NOT NULL COMMENT 'Descripción detallada del motivo del reporte. Opcional pero recomendada.',
  `Fecha` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT 'Fecha y hora de envío del reporte. Asignada automáticamente ',
  `Id_usuario` varchar(20) COLLATE utf8mb4_general_ci NOT NULL COMMENT 'Usuario que genera el reporte ',
  `Id_proyecto` int NOT NULL COMMENT 'Proyecto reportado ',
  `Id_nivel_reporte` varchar(20) COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT 'Nivel de reporte: 1: Peligroso, 2: Riesgo. 3: Daño. No puede estar vacío.',
  `Id_administrador` varchar(15) COLLATE utf8mb4_general_ci NOT NULL COMMENT 'Numero de identificación del administrador',
  PRIMARY KEY (`Id_reporte`),
  KEY `idAdministrador_fk` (`Id_administrador`),
  KEY `Id_nivel_reporte` (`Id_nivel_reporte`),
  KEY `idProyecto` (`Id_proyecto`),
  KEY `idUsuario` (`Id_usuario`),
  CONSTRAINT `Id_nivel_reporte` FOREIGN KEY (`Id_nivel_reporte`) REFERENCES `Nivel_reportes` (`Id_nivel_reporte`),
  CONSTRAINT `idAdministrador_fk` FOREIGN KEY (`Id_administrador`) REFERENCES `Administradores` (`Id_administrador`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `Reportes_ibfk_1` FOREIGN KEY (`Id_proyecto`) REFERENCES `Proyectos` (`Id_proyecto`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `Reportes_ibfk_2` FOREIGN KEY (`Id_usuario`) REFERENCES `Usuarios` (`Id_usuario`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Reportes`
--

LOCK TABLES `Reportes` WRITE;
/*!40000 ALTER TABLE `Reportes` DISABLE KEYS */;
/*!40000 ALTER TABLE `Reportes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Usuarios`
--

DROP TABLE IF EXISTS `Usuarios`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Usuarios` (
  `Tipo_id` char(5) COLLATE utf8mb4_general_ci NOT NULL COMMENT 'Tipo de documentacion que usa el usuario.',
  `Id_usuario` varchar(20) COLLATE utf8mb4_general_ci NOT NULL COMMENT 'Número de identificación del usuario',
  `Nombres` varchar(30) COLLATE utf8mb4_general_ci NOT NULL COMMENT 'Nombre completo del usuario. No puede estar vacío.',
  `Apellidos` varchar(30) COLLATE utf8mb4_general_ci NOT NULL COMMENT 'Apellidos completos del usuario.',
  `Genero` char(1) COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT 'Especifica que tipo de genero es el usuario.',
  `Edad` tinyint DEFAULT NULL COMMENT 'Especifica la edad del usuario.',
  `Email` varchar(40) COLLATE utf8mb4_general_ci NOT NULL COMMENT 'Dirección de correo electrónico. Debe ser única en el sistema. Formato válido de email.',
  `Telefono` varchar(15) COLLATE utf8mb4_general_ci NOT NULL COMMENT 'Numero de contacto del usuario.',
  `Password` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `Estado` char(2) COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT 'Indica si la cuenta está activa (TRUE) o inactiva/suspendida (FALSE).',
  `Rol` varchar(20) COLLATE utf8mb4_general_ci NOT NULL COMMENT 'Rol del usuario: , ''donador'', ''creador''..',
  `Fecha_creacion` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT 'Fecha y hora de registro. Se genera automáticamente, No editable.',
  PRIMARY KEY (`Id_usuario`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Usuarios`
--

LOCK TABLES `Usuarios` WRITE;
/*!40000 ALTER TABLE `Usuarios` DISABLE KEYS */;
INSERT INTO `Usuarios` VALUES ('CC','100000000','emiliano','sarabia','M',19,'emiliano123@gmail.com','3219644586','$2y$10$P.0Z0.IDLcFu6ymzCVaQTOeGu.lmLogHLwyX3AMdKakPQbWHxaTEC','1','donador','2026-09-22 06:58:11'),('CC','1002987654','Nicolás Alejandro','Vargas Rojas',NULL,NULL,'nicolasalejandro.vargas55@gmail.com','3117788990','$2b$12$dRSeuCly17hLWH0aQYW.VeCmxyGKMKRA2U8pSIcNhwEcJwtB1rilm',NULL,'emprendedor','2026-04-07 00:00:00'),('CC','100710698921','deiby stid','rincon ballesteros','M',55,'deibytupapi@gmail.com','3219644683','$2y$10$bbduVewMc/GDaCrICdVk.e/HgSL1Sjm03vuq3Njk4wNGbElYMJzka','1','donador','2026-09-18 16:40:11'),('CC','1023456789','Juan David','Martínez López',NULL,NULL,'juandavid.martinez28@gmail.com','3124567890','$2b$12$JPY.baVtOJLI1d/iIoASu.AKkAPJVUzz43M/63tJaVZUaKdyMULOG',NULL,'donador','2026-01-15 00:00:00'),('CC','1034567890','Sebastián Alejandro','Medina Castro',NULL,NULL,'sebastianalejandro.medina60@gmail.com','3001234567','$2b$12$2WZax5kJjTSja96mSlPd5OCOt.FK9GXcKqULFR8uO3tQ8HZx2SMtG',NULL,'mixto','2026-07-21 00:00:00'),('CC','1098765432','Daniel Esteban','Sánchez Ortiz',NULL,NULL,'danielesteban.sanchez72@gmail.com','3224455667','$2b$12$VHXnXq1gLE9jeDEtT.KeveocwKXG3HAMyIGaKAnCJt/LbSB.qnLlC',NULL,'mixto','2026-05-18 00:00:00'),('CC','1145678901','Andrés Felipe','Castro Morales',NULL,NULL,'andresfelipe.castro17@gmail.com','3015647382','$2b$12$SjtSS5JLdzBECMJViwbQaOJ9.zYoEsuK.cA175bXHm0Q0.vBHcGje',NULL,'emprendedor','2026-02-28 00:00:00'),('CC','2025255221','nuevo regis','usuario pelle','M',45,'tubebe@gmail.com','3201548965','$2y$10$vH8iWiEWREHW0lmbhc28pOi.ha5jdSBPbvfdKMgGy4H8vKNsIQ1Wm','1','emprendedor','2026-09-17 18:39:16'),('CC','45678912','Camila Andrea','Navarro Silva',NULL,NULL,'camilaandrea.navarro19@gmail.com','3189900112','$2b$12$e5fBVIVVQs/Cm2CuTXbir.4/r1ek1ohdlX/AME0Uv/bjzxXh6Jtj2',NULL,'donador','2026-06-09 00:00:00'),('CC','52347896','Laura Sofía','Hernández Pérez',NULL,NULL,'laurasofia.hernandez03@gmail.com','3152233445','$2b$12$QIcXJNenJnOzhbf42ugsn.TsrFFXwpedtLpSWdo4xybLlXewgXHyu',NULL,'mixto','2026-03-12 00:00:00'),('CC','756336483333','nuevo regis','vocero','M',55,'tubebe@gmail.com','3201548965','$2y$10$AZikYA.6L5LGnSZwkrTV/.oONaD5V2WHQe2AF8XykYBGOmVV.nSE6','1','donador','2026-09-17 18:56:29'),('CC','79845612','María Fernanda','Gómez Ruiz',NULL,NULL,'mariafernanda.gomez91@gmail.com','3209876543','$2b$12$givRSYKpfexphkdC3aO29uTirduJEqUMSM92WMsggwzvROuQPuKte',NULL,'mixto','2026-02-03 00:00:00'),('CC','91234567','Valentina Isabel','Torres Ramírez',NULL,NULL,'valentinaisabel.torres44@gmail.com','3506677889','$2b$12$9AdfSBwwI47zP5tt.Sq/x.R2030Z3tTZhIZ792mPdmuHgHYExFiVe',NULL,'donador','2026-04-25 00:00:00'),('CE','CE1281872','Camilo','Perez Koaj','F',28,'camilobb@gmail.com','3002383223','$2y$10$YsuTGd5zyg6BOyU2XW.p4u91DnNadELMv1gW5HX7HPg1Iuc2v.ij.','1','donador','2026-09-16 16:57:25'),('PA','FFA447653','Sharmira','Adhjarkadi','F',28,'shamriashat@gmail.com','3002378723','$2y$10$unL3ojhTGFmJTcWQ06lAeOLz0K9S1zhhjBpTGx4P3SnuROWXd0aa6','1','donador','2026-09-16 16:59:38');
/*!40000 ALTER TABLE `Usuarios` ENABLE KEYS */;
UNLOCK TABLES;
SET @@SESSION.SQL_LOG_BIN = @MYSQLDUMP_TEMP_LOG_BIN;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2026-09-22 12:43:03
