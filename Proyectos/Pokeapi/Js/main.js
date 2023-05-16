// LLAMAMOS A LA API
const api_pokemon = 'https://pokeapi.co/api/v2/pokemon/'

// FUNCION PARA OBTENER EL POKEMON DE LA API
function getPokemon(parametro){
    return fetch(api_pokemon+parametro)
}

obtenerPokemon()

// Evitamos que se actualize la pagina al dar enter en el input
$('#input_pokemon').on('keydown', (e) => {
    if(e.keyCode == 13){
        e.preventDefault()
        return false;
    }
})

function limpiar(){
    document.getElementById("input_pokemon").value = "";
}

// Evento para el boton buscar_pokemon
$('#buscar_pokemon').on('click', ()=> {
    // Obtenemos el nombre del valor del input 
    let nombre = $('#input_pokemon').val().toLowerCase()

    // Obtenemos el pokemon, lo pasamos de json a string y mostramos la info del pokemon
    let pokemon = getPokemon(nombre)
    pokemon.then((res) => res.json())
    .then((res2) => { 
        console.log(res2)
        let {name, sprites, stats, types} = res2
        llenarInformacion(name, sprites, stats, types)
        limpiar()
    })

    // Si no existe el pokemon tecleado mostramos una alerta y actualizamos la ventana despues de 3s con la funcion
    .catch((e) => {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'El pokemon no fue encontrado, intentalo de nuevo!',
            timer: 3000,
            timerProgressBar: true
          })
        setTimeout(function(){
            window.location.reload()
        },3000);    
        
    })
})

// FUNCION PARA OBTENER EL POKEMON Y LO PASAMOS DE JSON A STRING
function obtenerPokemon(){
    let random = numeroAleatorio(150)+1
    let pokemon = getPokemon(random)
    pokemon.then((res) => res.json())
    .then((res2) => { 
        console.log(res2)
        let {name, sprites, stats, types, held_items} = res2
        llenarInformacion(name, sprites, stats, types, held_items)
    })
}

// FUNCION PARA NUMERO ALEATORIO DE POKEMON
function numeroAleatorio(max){
    return Math.floor(Math.random()*max)
}

// FUNCION PARA LLENAR INFORMACION DEL POKEMON CON JQUERY
function llenarInformacion(name, sprites, stats, types) {
    let input = document.getElementById('input_pokemon')
    input.placeholder = 'Ejemplo: '+name

    // OBTENEMOS EL DIV DONDE VAMOS A PONER LOS DATOS DEL POKEMON
    let div = $('.datos_pokemon')
    div.empty()
    
    // CREAMOS TABLA PARA LLENAR LA INFO DEL POKEMON
    let tabla = (`<table class="table"> <tr><td class="negritas"> ${name}</td></tr>`)

    // RECORREMOS CADA UNO DE LOS VALORES DEL STATS Y LO AGREGAMOS  A LA TABLA
    for (let i = 0; i<stats.length; i++){
        tabla+=('<tr>')
        tabla+=(`<td>${stats[i].stat.name}</td>`)
        tabla+=(`<td>${stats[i].base_stat}</td>`)
        tabla+=('</tr>')
    }

    // CERRAMOS LA TABLA
    tabla+=('</table>')
    // Agregamos el contenido de la tabla al div
    div.append(tabla)

    // CREAMOS OTRA TABLA PARA LOS TYPES
    let tabla2 = (`<table class="table"> <tr><td class="negritas">TYPES</td>`)
    for (let i=0; i<types.length; i++){
        tabla2+= (`<td>${types[i].type.name}</td>`)
    }

    tabla2+= (`</tr> </table>`)
    div.append(tabla2)

    // AGREGAMOS LA IMAGEN POKEMON AL DIV
    let imagen = document.getElementById('pokemon_img')
    imagen.src=sprites.other.dream_world.front_default
}

// Agregamos los el top 10 de pokemones a las cards
function pokemonesTop(id){
    fetch(`https://pokeapi.co/api/v2/pokemon/${id}/`)
        .then((res) => res.json())
        .then((data) => {
            createPokemon(data);
        });
}

function pokemonesTop10(num) {
    for (let i=1; i<= num; i++){
        pokemonesTop(i);
    }
}

function createPokemon(pokemon) {
    let div = $('.top_pokemones')

    let card = (`<div class="card">`);
        card+= (`<img src="${pokemon.sprites.other.dream_world.front_default}" class="card-img-top">`)
        card+= (`<div class="card-body">`)
        //card+= (`<p class="card-text">ID: ${pokemon.id}</p>`)
        card+= (`<p class="card-text">${pokemon.name}</p>`)
        card+= (`</div></div>`)

    div.append(card);
}

pokemonesTop10(10);