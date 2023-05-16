// Creamos una lista de empleados vacia
let listaEmpleados = [];

// Definimos el objeto empleado con sus atributos
const objEmpleado = {
    id: '',
    nombre: '',
    puesto: ''
}

// Declaramos una variable inicial en false
let editando = false;

// Creamos las constantes para acceder a los id de formulario nombre, etc del HTML
const formulario = document.querySelector('#formulario');
const nombreInput = document.querySelector('#nombre');
const puestoInput = document.querySelector('#puesto');
const btnAgregar = document.querySelector('#btnAgregar');
let aumentarId = 1;

// Pasamos la funcion validar cuando damos click al boton de tipo submit (Agregar)
formulario.addEventListener('submit', validarFormulario);

// Con preventDefault() evitamos que se ejecute la funcion de forma automatica
function validarFormulario(e) {
    e.preventDefault();

    if (nombreInput.value === '' || puestoInput.value === '') {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Debes llenar todos los campos!'
          })
        return;
    }

    // Validamos si estamos editando o agregando el empleado
    if (editando) {
        editarEmpleado();
    
    } else {
        objEmpleado.id = aumentarId; // Obtenemos la hora actual en milisegundos
        objEmpleado.nombre = nombreInput.value;
        objEmpleado.puesto = puestoInput.value;
        agregarEmpleado();
        contarEmpleados();
    }
}

function agregarEmpleado() {
    // Agregamos el nuevo empleado al final del Array o lista
    listaEmpleados.push({...objEmpleado});
    aumentarId += 1;
    mostrarEmpleados();
    contarEmpleados();

    // Reseteamos el formulario y limpiamos el objeto(inputs del form)
    formulario.reset();
    limpiarObjeto();
}

function limpiarObjeto() {
    objEmpleado.id = '';
    objEmpleado.nombre = '';
    objEmpleado.puesto = '';
}

function mostrarEmpleados() {
    
    limpiarHTML();

    // Accedemos a la clase div-empleados
    const divEmpleados = document.querySelector('.div-empleados'); 

    // Listamos cada empleado de la lista con sus atributos
    listaEmpleados.forEach(empleado => {
        const { id, nombre, puesto } = empleado;

        // Creamos un elemento <td> para cada empleado
        const inicio = document.createElement('tr')
        const parrafo = document.createElement('td');
        const parrafo2 = document.createElement('td');
        const parrafo3 = document.createElement('td');
        const parrafo4 = document.createElement('td');
        const parrafo5 = document.createElement('td');
        parrafo.textContent = `${id}`;
        parrafo2.textContent = `${nombre}`;
        parrafo3.textContent = `${puesto}`;
        // Usaremos el id para editar los empleados
        parrafo.dataset.id = id; 

        // Creamos un elemento boton para editar
        const editarBoton = document.createElement('button');
        // Cuando le demos click al boton editar nos va cargar el empleado correspondiente
        editarBoton.onclick = () => cargarEmpleado(empleado);
        // Le ponemos un texto al boton
        editarBoton.textContent = 'Editar';
        // Le agregamos las clases para q tengas los estilos del css
        editarBoton.classList.add('btn');
        // Agregamos el boton al parrafo
        parrafo4.append(editarBoton);

        
        const eliminarBoton = document.createElement('button');
        eliminarBoton.onclick = () => eliminarEmpleado(id);
        eliminarBoton.textContent = 'Eliminar';
        eliminarBoton.classList.add('btn');
        parrafo5.append(eliminarBoton);


        // Agregamos como elementos hijos del div el parrado
        divEmpleados.appendChild(inicio);
        divEmpleados.appendChild(parrafo);
        divEmpleados.appendChild(parrafo2);
        divEmpleados.appendChild(parrafo3);
        divEmpleados.appendChild(parrafo4);
        divEmpleados.appendChild(parrafo5);
        contarEmpleados();
        
    });
}

function cargarEmpleado(empleado){
    // Creamos una constante con los atributos del empleado que se va cargar
    const {id, nombre, puesto} = empleado;

    // Cargamos los atributos del empleado a editar
    nombreInput.value = nombre;
    puestoInput.value = puesto;
    objEmpleado.id = id;

    // Cambiamos el nombre del texto del boton de editar a actualizar
    formulario.querySelector('button[type="submit"]').textContent = 'Actualizar';

    // Indicamos que estamos editando el empleado
    editando = true;
}

function editarEmpleado() {
    // Obtenemos el nombre y puesto del empleado a editar
    objEmpleado.nombre = nombreInput.value;
    objEmpleado.puesto = puestoInput.value;

    // Array function
    listaEmpleados.map(empleado => {

        // Validamos si el id del empleado coincide con el del objEmpleado para editarlo
        if(empleado.id === objEmpleado.id) {
            empleado.id = objEmpleado.id;
            empleado.nombre = objEmpleado.nombre;
            empleado.puesto = objEmpleado.puesto;
            Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'Los cambios han sido guardados',
                showConfirmButton: false,
                timer: 1800
              })
        }
    });

    limpiarHTML();
    mostrarEmpleados();
    contarEmpleados();

    
    formulario.reset();
    // Cambiamos el texto del boton de actualizar a agregar y indicamos que ya no estamos editando con false
    formulario.querySelector('button[type="submit"]').textContent = 'Agregar';
    editando = false;
}

function eliminarEmpleado(id) {

    if(eliminarEmpleado) {
        Swal.fire({
            title: 'Seguro quieres eliminarlo?',
            text: "No podras recuperar el registro!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, eliminar!',
            cancelButtonText: 'Cancelar'
          }).then((result) => {
            if (result.isConfirmed) {
              Swal.fire(
                'Eliminado!',
                'El registro se ha eliminado.',
                'success'
              )
              // Filtramos los empleados que sean diferentes del id a eliminar y los guardamos en la lista
                listaEmpleados = listaEmpleados.filter(empleado => empleado.id !== id);

                limpiarHTML();
                mostrarEmpleados();
                contarEmpleados();
            }
            
          })
    } 
    
}

function contarEmpleados() {
    // Conteo del número de empleados
    const conteo = document.getElementById('empleados');
    const filas = conteo.getElementsByTagName('tbody')[0];
    document.getElementById('numEmpleados').innerHTML = "Número de empleados: "+filas.children.length/6;

}

function limpiarHTML() {

    // Obtenemos los elementos del div con la clase .div-empleados
    const divEmpleados = document.querySelector('.div-empleados');

    // Mientras tengamos elementos hijos en el div los vamos a ir eliminando 
    while(divEmpleados.firstChild){
        divEmpleados.removeChild(divEmpleados.firstChild);
    }
}