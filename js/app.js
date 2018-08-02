'use strict';

$(document).ready(function() {


    const printAllPokemons

    // const ajaxInputPokemons = (theUserWantsThisPokemon) => {

        $.ajax({
            url:'https://pokeapi.co/api/v2/pokemon/',
            type: 'GET',
            datatype: 'json',
            // data :{
            //     q: theUserWantsThisGif,
            //     api_key: 'fQTS2twrt1h88BtQjwTXBjxoMQ8IKZCS'
            // }
        })
        .done((response)=>{
            console.log(response);
            // printGifs(response.data);
        })
        .fail(()=>{
            console.log("error");
        })
    // }
})