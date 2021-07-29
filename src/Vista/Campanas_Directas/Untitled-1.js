//Elemento contenedor principal
var contenedor=document.getElementById("actividadNodos")

//Primer Nivel de Elemetos
var elementos=contenedor.getElementsByTagName("li")

//1 Loop
Array.from(elementos).forEach((elemento)=>{
    //Titulo
    var spans=elemento.getElementsByClassName('span')

    //Iterar Spans
    Array.from(spans).forEach((span_element)=>{
        console.log(span_element.textContent)
    })
})