'use strict';

$(document).ready(function() {

    let containerPokemons = $("#pokemons-container");

    const printAllPokemons = (results) =>{
        console.log(results);
        let pokemonsTemplate = $("#content-template").html();
            console.log(pokemonsTemplate);
            

            results.forEach( element => {
                const data = {
                    name: element.name,
                    // image: element.sprites.front_default,// bitly se refiere a la reducción de URL, servicio de la empresa "Bitly"
                };
                console.log(data);
                let filledTemplate = fillPokemonCardTemplate(pokemonsTemplate, data);
                console.log(filledTemplate);
                containerPokemons.append(filledTemplate);
            });

    }

    // const ajaxInputPokemons = (theUserWantsThisPokemon) => {
        
    // -----Ajax para imprimir todos los pokemones al cargar la página
        $.ajax({
            url:'https://pokeapi.co/api/v2/pokemon/',
            type: 'GET',
            datatype: 'json',
            // data :{
            //     q: pokemon,
            // }
        })
        .done((response)=>{
            console.log(response);
            printAllPokemons(response.results);
            
        })
        .fail(()=>{
            console.log("error");
        })
    // }
})



//---- LLENANDO EL TEMPLATE 


const fillPokemonCardTemplate = (template, data) => {
    
    for(let property in data){
        let value = data[property];//Obteniendo el valor de la propiedad (en este el gif y la url)
        //reemplazando los valores
        template = template.replace(new RegExp('{{'+property+'}}', 'g'), escapeHtml(value) );//la expresión regular no puede ser así: /{{${property}}/g porque en la plantilla
        //no tiene los acentos graves que permiten la ejecución de un template string.
                                                
    };
    return template;
    
}

function escapeHtml(str) {
    var div = document.createElement('div');//creando un div que no existe en el dom
    div.appendChild(document.createTextNode(str));//agregando el value extrictamente como string
    return div.innerHTML;//obteniendo el value limpio"
}