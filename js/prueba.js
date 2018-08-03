'use strict';

$(document).ready(function() {

    let containerPokemons = $("#pokemons-container");

    const printAllPokemons = (response) =>{
        // let data = response;
        console.log(response);
        // console.log(Object.keys(response).length);
        let pokemonsTemplate = $("#content-template").html();
        // console.log(pokemonsTemplate);
   
        const data = {
            name: response.name,
            image: response.sprites.front_default,
            ability1: response.abilities[0].ability.name, 
            // ability2: response.abilities[1].ability.name,
            heigth: response.heigth,
            weight: response.weight,
            type1: response.types[0].type.name,
            // type2: response.types[1].type.name
        }
        console.log(data);

        let filledTemplate = fillPokemonCardTemplate(pokemonsTemplate, data);
        // console.log(filledTemplate);
        containerPokemons.append(filledTemplate);
        // console.log(data);
                
    };

    


        
    // -----Ajax para imprimir todos los pokemones al cargar la página

    // var arrUrls=[];
    let promise = $.ajax({
                    url:'https://pokeapi.co/api/v2/pokemon/',
                    type: 'GET',
                    datatype: 'json',
                    crossDomain: true,

                }).done((response)=>{
                    // console.log(response);
                    
                    response.results.forEach( element => {
                        
                        let data = element.url;
                        // console.log(data);
                        $.ajax({
                            url:data,
                            type: 'GET',
                            datatype: 'json',
                            crossDomain: true,

                        }).done((response)=>{
                            // console.log(response);
                            printAllPokemons(response);
                        })
                        // arrUrls.push(data);
                        
                    
                    })
                    // console.log(arrUrls);

                    // return arrUrls;
                    
                }).fail(()=>{
                    console.log("error");
                });
    // promise.then(function(data){
    //     console.log(data);
        // let urlData = data.url;
        // console.log(urlData);
        // $.ajax({
        //     url:urlData,
        //     type: 'GET',
        //     datatype: 'json',
        //     // data :{
        //     //     q: pokemon,
        //     // }
        // })
        // .done((response)=>{
        //     console.log(response);
        //     // printAllPokemons(response.results);
                        
        // })
        // .fail(()=>{
        //     console.log("error");
        // })
    // });
                

                
    
    
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