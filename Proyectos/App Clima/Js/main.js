const key = '83d886ab72c5bb4b635cf5285972868b'

// AGREGAMOS UN EVENTO LOAD AL CARGAR LA PAGINA PARA CREAR EL CLIMA DE MEXICO POR DEFECTO
window.addEventListener("load",()=>{
  const nombrePais = 'México'
  const url= `https://api.openweathermap.org/data/2.5/weather?q=${nombrePais}&appid=${key}&lang=es&units=metric`;
  fetch(url).then((res)=>{
      return res.json();
  }).then((data)=>{
    console.log(data);
    weatherReport(data)
  })
})

function limpiar(){
    document.getElementById("input_pais").value = "";
}

// Evitamos que se actualize la pagina al dar enter en el input
$('#input_pais').on('keydown', (e) => {
    if(e.keyCode == 13){
        e.preventDefault()
        return false;
    }
})

// buscamos el pais
$('#buscar_pais').on('click', ()=> {
  let pais = $('#input_pais').val()
  let urlsearch = `https://api.openweathermap.org/data/2.5/weather?q=${pais}&appid=${key}&lang=es&units=metric`

  fetch(urlsearch).then((res)=>{
      return res.json();
  }).then((data)=>{
      console.log(data);
      weatherReport(data);
      limpiar()
  
  if (data.cod == 404 || data.cod == 400){
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'El país no fue encontrado, intentalo de nuevo!',
      timer: 3000,
      timerProgressBar: true
    })
  // esperamos 3s antes de q se actualize la pantalla  
  setTimeout(function(){
      window.location.reload()
  },3000);   
  }
})
})

// Creamos una funcion para crear el reporte del clima y sus componentes del contenedor
function weatherReport(data){

  let urlcast= `https://api.openweathermap.org/data/2.5/forecast?q=${data.name}&appid=${key}&lang=es&units=metric`

  fetch(urlcast).then((res)=>{
    return res.json();
    }).then((forecast)=>{
    //console.log(forecast);

    // Obtenemos el contenedor html por su clase
    let div = $('.datos_clima')

    // Obtenemos la fecha y la formateamos a fecha local
    let fecha = new Date();
    const meses = ["JAN", "FEB", "MAR","APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
    const formatFecha = (fecha) => {
      let horaFormated = fecha.getDate()+ " " +meses[fecha.getMonth()]+ " " +fecha.getFullYear()
      return horaFormated
    }
    //console.log(formatFecha(fecha))

    // Obtenemos solo la hora de dt
    //const hora = new Date(clima.list[0].dt*1000).getHours();
    //console.log(hora)

    // depende el clima mostrara un icono dinamico
    let iconoAnimado = ''
      switch (forecast.list[0].weather[0].main) {
          case 'Thunderstorm':
            iconoAnimado='./animated/thunder.svg'
            console.log('TORMENTA');
            break;
          case 'Drizzle':
            iconoAnimado='./animated/rainy-2.svg'
            console.log('LLOVIZNA');
            break;
          case 'Rain':
            iconoAnimado='./animated/rainy-7.svg'
            console.log('LLUVIA');
            break;
          case 'Snow':
            iconoAnimado='./animated/snowy-6.svg'
              console.log('NIEVE');
            break;                        
          case 'Clear':
              iconoAnimado='./animated/day.svg'
              console.log('LIMPIO');
            break;
          case 'Atmosphere':
            iconoAnimado='./animated/weather.svg'
              console.log('ATMOSFERA');
              break;  
          case 'Clouds':
              iconoAnimado='./animated/cloudy-day-1.svg'
              console.log('NUBES');
              break;  
          default:
            iconoAnimado='./animated/cloudy-day-1.svg'
            console.log('por defecto');
        }
    
    
    // Vaciamos el div para poder crear otro con nuevos datos del clima    
    div.empty()

    // Creamos el contenedor con los datos del clima
    let contenedor = (`<div class="contenedor_datos row">`)
        contenedor += (`<div class="datos_mx col-sm-12 col-md-6 col-lg-6 col-xl-6">`)
        contenedor += (`<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-geo-alt" viewBox="0 0 16 16">
        <path d="M12.166 8.94c-.524 1.062-1.234 2.12-1.96 3.07A31.493 31.493 0 0 1 8 14.58a31.481 31.481 0 0 1-2.206-2.57c-.726-.95-1.436-2.008-1.96-3.07C3.304 7.867 3 6.862 3 6a5 5 0 0 1 10 0c0 .862-.305 1.867-.834 2.94zM8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10z"/>
        <path d="M8 8a2 2 0 1 1 0-4 2 2 0 0 1 0 4zm0 1a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"/>
        </svg><h2>${data.name}</h2>`)
        contenedor += (`<p>${data.sys.country}</p>`)
        contenedor += (`<p>${formatFecha(fecha)}</p>`)
        contenedor += (`<img src="${iconoAnimado}">`)
        contenedor += (`<p>${data.weather[0].main}</p>`)
        contenedor += (`<p>${data.weather[0].description}</p>`)
        contenedor += (`</div>`)

        // Creamos otro contenedor con los datos faltantes del clima (FORECAST)
        contenedor += (`<div class="datos col-sm-12 col-md-6 col-lg-6 col-xl-6">`)
        contenedor += (`<div class="datos_met"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-thermometer-half" viewBox="0 0 16 16">
        <path d="M9.5 12.5a1.5 1.5 0 1 1-2-1.415V6.5a.5.5 0 0 1 1 0v4.585a1.5 1.5 0 0 1 1 1.415z"/>
        <path d="M5.5 2.5a2.5 2.5 0 0 1 5 0v7.55a3.5 3.5 0 1 1-5 0V2.5zM8 1a1.5 1.5 0 0 0-1.5 1.5v7.987l-.167.15a2.5 2.5 0 1 0 3.333 0l-.166-.15V2.5A1.5 1.5 0 0 0 8 1z"/>
        </svg><p>${(data.main.temp).toFixed(0)}°C</p><span>Temperatura</span></div>`)
        contenedor += (`<div class="datos_met"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-thermometer-high" viewBox="0 0 16 16">
        <path d="M9.5 12.5a1.5 1.5 0 1 1-2-1.415V2.5a.5.5 0 0 1 1 0v8.585a1.5 1.5 0 0 1 1 1.415z"/>
        <path d="M5.5 2.5a2.5 2.5 0 0 1 5 0v7.55a3.5 3.5 0 1 1-5 0V2.5zM8 1a1.5 1.5 0 0 0-1.5 1.5v7.987l-.167.15a2.5 2.5 0 1 0 3.333 0l-.166-.15V2.5A1.5 1.5 0 0 0 8 1z"/>
        </svg><p>${(data.main.temp_max).toFixed(0)}°C</p><span>Max</span></div>`)
        contenedor += (`<div class="datos_met"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-moisture" viewBox="0 0 16 16">
        <path d="M13.5 0a.5.5 0 0 0 0 1H15v2.75h-.5a.5.5 0 0 0 0 1h.5V7.5h-1.5a.5.5 0 0 0 0 1H15v2.75h-.5a.5.5 0 0 0 0 1h.5V15h-1.5a.5.5 0 0 0 0 1h2a.5.5 0 0 0 .5-.5V.5a.5.5 0 0 0-.5-.5h-2zM7 1.5l.364-.343a.5.5 0 0 0-.728 0l-.002.002-.006.007-.022.023-.08.088a28.458 28.458 0 0 0-1.274 1.517c-.769.983-1.714 2.325-2.385 3.727C2.368 7.564 2 8.682 2 9.733 2 12.614 4.212 15 7 15s5-2.386 5-5.267c0-1.05-.368-2.169-.867-3.212-.671-1.402-1.616-2.744-2.385-3.727a28.458 28.458 0 0 0-1.354-1.605l-.022-.023-.006-.007-.002-.001L7 1.5zm0 0-.364-.343L7 1.5zm-.016.766L7 2.247l.016.019c.24.274.572.667.944 1.144.611.781 1.32 1.776 1.901 2.827H4.14c.58-1.051 1.29-2.046 1.9-2.827.373-.477.706-.87.945-1.144zM3 9.733c0-.755.244-1.612.638-2.496h6.724c.395.884.638 1.741.638 2.496C11 12.117 9.182 14 7 14s-4-1.883-4-4.267z"/>
        </svg><p>${data.main.humidity}%</p><span>Humedad</span></div>`)
        contenedor += (`<div class="datos_met"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-wind" viewBox="0 0 16 16">
        <path d="M12.5 2A2.5 2.5 0 0 0 10 4.5a.5.5 0 0 1-1 0A3.5 3.5 0 1 1 12.5 8H.5a.5.5 0 0 1 0-1h12a2.5 2.5 0 0 0 0-5zm-7 1a1 1 0 0 0-1 1 .5.5 0 0 1-1 0 2 2 0 1 1 2 2h-5a.5.5 0 0 1 0-1h5a1 1 0 0 0 0-2zM0 9.5A.5.5 0 0 1 .5 9h10.042a3 3 0 1 1-3 3 .5.5 0 0 1 1 0 2 2 0 1 0 2-2H.5a.5.5 0 0 1-.5-.5z"/>
        </svg><p>${(data.wind.speed).toFixed(0)}m/s</p><span>Viento</span></div>`)
        
        contenedor += (`</div">`)
        contenedor += (`</div>`)
        

        // Creamos otro contenedor para los 4 dias siguientes 
        // Extraemos la fecha de 4 dias de dt y la convertimos a formato local
        contenedor += (`<h2 class="prevision">Previsión de los proximos 4 días</h2>`)
        contenedor += (`<div class="datos_dias">`)
        for (let i=8; i<forecast.list.length; i+=8){
          // Formateamos la fecha a un formato local
          let Fecha = new Date(forecast.list[i].dt*1000);
          const meses = ["JAN", "FEB", "MAR","APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
          const formatFecha = (fecha) => {
            let horaFormated = fecha.getDate()+ " " +meses[fecha.getMonth()] 
            return horaFormated
          }
          //console.log(formatFecha(Fecha))
          //console.log(forecast.list[i])

          contenedor += (`<div class="clima_dias"><p>${formatFecha(Fecha)}</p><img src="${iconoAnimado}"><p>${(forecast.list[i].main.temp).toFixed(0)}°C</p></div>`)
        }

        contenedor += (`</div>`)
        
        
        // Creamos otro contenedor para las 24 hrs restantes con saltos de 3hr cada una
        contenedor += (`<h2 class="prevision">Previsión de las proximas 24 horas</h2>`)
        contenedor += (`<div class="datos_hrs">`)
        for (let j=0; j<forecast.list.length-31; j++){
          // Formateamos la hora a un formato local
          let Hora = new Date(forecast.list[j].dt*1000);
          const formatHora = (Hora) => {
            let fomatHrs =  Hora.getHours()+ ":" + Hora.getMinutes()+"0";
            return fomatHrs 
          }
          //console.log(formatHora(Hora))

          //console.log(Hora)

          contenedor += (`<div class="clima_3hrs"><p>${formatHora(Hora)}</p><img src="${iconoAnimado}"><p>${(forecast.list[j].main.temp).toFixed(0)}°C</p></div>`)
        }

        contenedor += (`</div>`)
        
    div.append(contenedor)    
  })    
}