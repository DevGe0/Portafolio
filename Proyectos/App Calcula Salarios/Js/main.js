let dias = document.getElementById('dias')
let pagoDia = document.getElementById('pagoDia')
let hrsEx = document.getElementById('hrsEx')
let pagoEx = document.getElementById('pagoEx')
let iva = document.getElementById('iva')
let pago = document.getElementById('pago')
let btn_pay = document.getElementById('pagoTotal')
let btn_clean = document.getElementById('btnClean')

btn_pay.addEventListener("click", total);
btn_clean.addEventListener("click", limpiar)

function total(){
    if(dias.value != "" && pagoDia.value != "" && hrsEx.value != "" && pagoEx.value != "" && iva.value != ""){
        let Iva = parseFloat(((dias.value * pagoDia.value) + (hrsEx.value* pagoEx.value)) * (iva.value/100))
        let Total = parseFloat(((dias.value * pagoDia.value) + (hrsEx.value* pagoEx.value)) - (Iva))
        //Total = Total*(iva/100) 
        pago.textContent = "$"+Total.toFixed(2)
    } else if(dias.value != "" && pagoDia.value != "" && hrsEx.value === "" && pagoEx.value === ""){
        let Iva = parseFloat(((dias.value * pagoDia.value) + (hrsEx.value* pagoEx.value)) * (iva.value/100))
        let Total = parseFloat(((dias.value * pagoDia.value) + (hrsEx.value* pagoEx.value)) - (Iva))
        pago.textContent = "$"+Total.toFixed(2)
    }
    else {
        Swal.fire({
            title: 'Error!',
            text: 'No puedes dejar todos los campos vacios',
            icon: 'warning',
            confirmButtonText: 'OK'
          })
    }
}

function limpiar(){
    window.location.reload()
}