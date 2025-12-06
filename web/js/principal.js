let cm = null;

async function cargarModuloUmas()
{
    let url = "modules/umas.html";
    
    let resp = await fetch(url);
    
    let contenido = await resp.text();
    
    document.getElementById("divPrincipal").innerHTML = contenido;
    
    cm = await import('./umas.js');
    
    cm.inicializar();
}