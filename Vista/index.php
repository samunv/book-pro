<!DOCTYPE html>
<html lang="en">

<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<title>Inicio</title>
	<link rel="manifest" href="./../manifest.json">

	<script type="module" src="js/index.js?v=<?php echo time() ?>"></script>
	<script type="text/javascript" src="js/header.js?v=<?php echo time() ?>"></script>
	<link rel="icon" href="img/B-logo-bpro.png">
	<link rel="stylesheet" href="css/estiloindex.css?v=<?php echo time() ?>">
	<link rel="stylesheet" href="css/header.css?v=<?php echo time() ?>">
	<link rel="stylesheet" href="css/global.css?v=<?php echo time() ?>">

</head>

<body>
	<?php
	include "header.php"
	?>



	<section class="seccion-principal" id="seccion-principal">

		<div class="contenedor-loader">
			<div id="loader"></div>
		</div>


		<section class="contenedor-enlaces" id="contenido">
			<a href="elegirservicio.php" class="enlaces" id="reservar-cita">
				<div class="contenedor-img">
					<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#0D99FF">
						<path d="M200-80q-33 0-56.5-23.5T120-160v-560q0-33 23.5-56.5T200-800h40v-80h80v80h320v-80h80v80h40q33 0 56.5 23.5T840-720v560q0 33-23.5 56.5T760-80H200Zm0-80h560v-400H200v400Zm0-480h560v-80H200v80Zm0 0v-80 80Zm280 240q-17 0-28.5-11.5T440-440q0-17 11.5-28.5T480-480q17 0 28.5 11.5T520-440q0 17-11.5 28.5T480-400Zm-160 0q-17 0-28.5-11.5T280-440q0-17 11.5-28.5T320-480q17 0 28.5 11.5T360-440q0 17-11.5 28.5T320-400Zm320 0q-17 0-28.5-11.5T600-440q0-17 11.5-28.5T640-480q17 0 28.5 11.5T680-440q0 17-11.5 28.5T640-400ZM480-240q-17 0-28.5-11.5T440-280q0-17 11.5-28.5T480-320q17 0 28.5 11.5T520-280q0 17-11.5 28.5T480-240Zm-160 0q-17 0-28.5-11.5T280-280q0-17 11.5-28.5T320-320q17 0 28.5 11.5T360-280q0 17-11.5 28.5T320-240Zm320 0q-17 0-28.5-11.5T600-280q0-17 11.5-28.5T640-320q17 0 28.5 11.5T680-280q0 17-11.5 28.5T640-240Z" />
					</svg>

				</div>
				<div class="contenedor-txt">
					<p>Reservar Cita</p>
				</div>
			</a>
			<a href="vercitas.php" class="enlaces" id="ver-citas">
				<div class="contenedor-img">
					<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#0D99FF">
						<path d="M200-80q-33 0-56.5-23.5T120-160v-560q0-33 23.5-56.5T200-800h40v-80h80v80h320v-80h80v80h40q33 0 56.5 23.5T840-720v560q0 33-23.5 56.5T760-80H200Zm0-80h560v-400H200v400Zm0-480h560v-80H200v80Zm0 0v-80 80Zm80 240v-80h400v80H280Zm0 160v-80h280v80H280Z" />
					</svg>
				</div>
				<div class="contenedor-txt">
					<p>Mis Citas</p>
				</div>
			</a>
			<a href="paneldecontrol2.php" class="enlaces" id="contenedor-oculto">
				<div class="contenedor-img">
					<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#0D99FF">
						<path d="M200-80q-33 0-56.5-23.5T120-160v-560q0-33 23.5-56.5T200-800h40v-80h80v80h320v-80h80v80h40q33 0 56.5 23.5T840-720v560q0 33-23.5 56.5T760-80H200Zm0-80h560v-400H200v400Zm0-480h560v-80H200v80Zm0 0v-80 80Zm80 240v-80h400v80H280Zm0 160v-80h280v80H280Z" />
					</svg>
				</div>
				<div class="contenedor-txt">
					<p>Mi Agenda</p>
				</div>
			</a>

			<a href="editarperfil.php" class="enlaces" id="editar-perfil">
				<div class="contenedor-img">
					<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#0D99FF">
						<path d="M234-276q51-39 114-61.5T480-360q69 0 132 22.5T726-276q35-41 54.5-93T800-480q0-133-93.5-226.5T480-800q-133 0-226.5 93.5T160-480q0 59 19.5 111t54.5 93Zm246-164q-59 0-99.5-40.5T340-580q0-59 40.5-99.5T480-720q59 0 99.5 40.5T620-580q0 59-40.5 99.5T480-440Zm0 360q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q53 0 100-15.5t86-44.5q-39-29-86-44.5T480-280q-53 0-100 15.5T294-220q39 29 86 44.5T480-160Zm0-360q26 0 43-17t17-43q0-26-17-43t-43-17q-26 0-43 17t-17 43q0 26 17 43t43 17Zm0-60Zm0 360Z" />
					</svg>
				</div>
				<div class="contenedor-txt">
					<p>Editar Perfil</p>
				</div>
			</a>

			<a href="empresa.php" class="enlaces">
				<div class="contenedor-img">
					<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#0D99FF">
						<path d="M480-480q33 0 56.5-23.5T560-560q0-33-23.5-56.5T480-640q-33 0-56.5 23.5T400-560q0 33 23.5 56.5T480-480Zm0 294q122-112 181-203.5T720-552q0-109-69.5-178.5T480-800q-101 0-170.5 69.5T240-552q0 71 59 162.5T480-186Zm0 106Q319-217 239.5-334.5T160-552q0-150 96.5-239T480-880q127 0 223.5 89T800-552q0 100-79.5 217.5T480-80Zm0-480Z" />
					</svg>
				</div>
				<div class="contenedor-txt">
					<p>Empresa</p>
				</div>
			</a>
			<a href="notificaciones.php" class="enlaces" id="notificaciones">
				<div class="contenedor-foto-cuenta">
					<div class="contenedor-img">
						<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#0D99FF">
							<path d="M160-200v-80h80v-280q0-83 50-147.5T420-792v-28q0-25 17.5-42.5T480-880q25 0 42.5 17.5T540-820v28q80 20 130 84.5T720-560v280h80v80H160Zm320-300Zm0 420q-33 0-56.5-23.5T400-160h160q0 33-23.5 56.5T480-80ZM320-280h320v-280q0-66-47-113t-113-47q-66 0-113 47t-47 113v280Z" />
						</svg>
					</div>
					<div id="cuenta-notificaciones"></div>
				</div>

				<div class="contenedor-txt">
					<p>Notificaciones</p>
				</div>
			</a>
		</section>


	</section>


</body>

</html>