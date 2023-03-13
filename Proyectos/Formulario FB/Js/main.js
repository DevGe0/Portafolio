function llenarDias(){
    var selector = document.getElementById('dias');
    for (var i=1; i<=31; i++){
        selector.options[i] = new Option(i);
    }
}

llenarDias()

function llenarMeses(){
    var selector = document.getElementById('meses');
    var meses = ['ENERO', 'FEBRERO', 'MARZO', 'ABRIL', 'MAYO', 'JUNIO', 'JULIO', 'AGOSTO', 'SEPTIEMBRE', 'OCTUBRE', 'NOVIEMBRE', 'DICIEMBRE'];

    meses.forEach(element => {
        let opt = document.createElement('option');
        opt.textContent = element
        selector.appendChild(opt)
    });
}

llenarMeses()

function llenarAños(){
    var selector = document.getElementById('años');
    var años = [1970,1971,1972,1973,1974,1975,1976,1977,1978,1979,1980,1981,1982,1983,1984,1985,1986,1987,1988,1989,1990,1991,1992,1993,1994,1995,1996,1997,1998,1999,2000,2001,2002,2003,2004,2005]

    años.forEach(element => {
        let opt = document.createElement('option');
        opt.textContent = element
        selector.appendChild(opt)
    });
}

llenarAños()