const grid = new Muuri('.grid', {
	layout: {
		rounding: false
	}
});

window.addEventListener('load', () => {
	grid.refreshItems().layout();
	document.getElementById('grid').classList.add('imagenes-cargadas'); //para agregar nueva clase k esta en css	

	//agregamos los listener de los enlaces para filtar categorias.
	const enlaces = document.querySelectorAll('#categorias a');//accedemos a las categorias
	enlaces.forEach((elemento) => {
		elemento.addEventListener('click', (evento) => { //agregamos evento click
			evento.preventDefault();//previene el comportamiento por defecto de la pagina
			enlaces.forEach((enlace) => enlace.classList.remove('activo'));//para remover la class activo de donde este
			evento.target.classList.add('activo');//para poner la class activo a donde demos click

			const categoria = evento.target.innerHTML.toLowerCase();
			categoria === 'todos' ? grid.filter('[data-categoria]') : grid.filter(`[data-categoria="${categoria}"]`);//condicional renovado
		});
	});

	//agregamos el listener para la barra de busqueda.
	document.querySelector('#barra-busqueda').addEventListener('input', (evento) => {
		const busqueda = evento.target.value;
		grid.filter( (item) => item.getElement().dataset.etiquetas.includes(busqueda.toLowerCase()));//accedemos a todos los elementos que tengan data-... y que incluyan (busqueda).
	});

	//agregamos listener para las imagenes
	const overlay = document.getElementById('overlay');
	document.querySelectorAll('.grid .item img').forEach((elemento) => {
		elemento.addEventListener('click', () => {
			const ruta = elemento.getAttribute('src');
			const descripcion = elemento.parentNode.parentNode.dataset.descripcion;
		
			overlay.classList.add('activo');
			document.querySelector('#overlay img').src = ruta;
			document.querySelector('#overlay .descripcion').innerHTML = descripcion;	
		});
	});

	//eventlistener de boton de cerrar.
	document.querySelector('#btn-cerrar-popup').addEventListener('click', () => {
		overlay.classList.remove('activo');
	});

	//eventlistener del overlay
	overlay.addEventListener('click', (evento) => {
		evento.target.id === 'overlay' ? overlay.classList.remove('activo') : '';
	});
});
