const API_URL = 'http://localhost:9090';

let listaPersonajes = [];

export async function inicializar(){
    setDetalleVisible(false);
    cargarListaPersonajes();
}

async function cargarListaPersonajes(){ 
    let url = 'http://localhost:9090/api/umas'; 
    
    let resp = await fetch(url);
    
    listaPersonajes = await resp.json();
    
    refrescarTablaPersonajes();  
}

function refrescarTablaPersonajes(){
    let contenido = '';
    
    for(let i = 0; i < listaPersonajes.length; i++)
    {
        let p = listaPersonajes[i];

        contenido += '<tr>';
        contenido += '<td>';
        contenido +=    '<img src="' + API_URL + p.imagenCaballoRealUrl + '" class="img-thumbnail" style="height: 50px; width: auto;">';
        contenido += '</td>';
        contenido += '<td>' + p.nombre + '</td>';
        contenido += '<td>';
        contenido +=    '<button class="btn btn-sm btn-outline-success" onclick="cm.mostrarDetallePersonaje('+ i +')">';
        contenido +=    '<i class="fa-solid fa-eye"></i> Ver Detalle</button>';
        contenido += '</td>';
        contenido += '</tr>';
    }
    
    document.getElementById("tbodyPersonajes").innerHTML = contenido;
}

export function mostrarDetallePersonaje(posicion) {
    let p = listaPersonajes[posicion];

    document.getElementById("txtIdPersonaje").value = p.id;
    document.getElementById("txtNombre").value = p.nombre;
    document.getElementById("txtNombreJapones").value = p.nombreJapones;
    
    document.getElementById("txtFechaNacimiento").value = p.fechaNacimiento;
    document.getElementById("txtRareza").value = p.rarezaInicial;
    
    document.getElementById("chbCorredoraTierra").checked = p.esCorredoraTierra;
    
    document.getElementById("txtVelocidad").value = p.velocidadBase;
    document.getElementById("txtResistencia").value = p.resistenciaBase;
    document.getElementById("txtFuerza").value = p.fuerzaBase;
    
    document.getElementById("txtUrlUma").value = API_URL + p.imagenResplandorUrl;
    document.getElementById("txtUrlReal").value = API_URL + p.imagenCaballoRealUrl;
    
    document.getElementById("imgFoto").src = API_URL + p.imagenResplandorUrl;
    
    setDetalleVisible(true);
}

export function setDetalleVisible(valor) {
    if(valor === true)
    {
        document.getElementById("divCatalogo").style.display = 'none';
        document.getElementById("divDetalle").style.display = '';
    }
    else
    {
        document.getElementById("divDetalle").style.display = 'none';
        document.getElementById("divCatalogo").style.display = '';
    }
}

export function verFoto(tipo) {
    if (tipo === 'uma') {
        let url = document.getElementById("txtUrlUma").value;
        document.getElementById("imgFoto").src = url;
    } else {
        let url = document.getElementById("txtUrlReal").value;
        document.getElementById("imgFoto").src = url;
    }
}