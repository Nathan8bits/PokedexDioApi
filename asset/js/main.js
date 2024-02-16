const pokemonList = document.querySelector('#pokemonList');
const btnLoadMore = document.querySelector('#btnLoadMore');
let offset = 0;
let limit = 10;
const maxRecord = 151;

btnLoadMore.addEventListener('click', () => {
    //console.log('btnLoadMore');
    offset += limit;

    const qntRecordProxPage = offset + limit;

    if(qntRecordProxPage >= maxRecord) {
        const newLimit = maxRecord - offset;
        loadpk(offset, newLimit);
        btnLoadMore.parentElement.removeChild(btnLoadMore)
    } else {
        loadpk(offset, limit);
    }
})

function loadpk(offset, limit) {   
    console.log('estou na funcao loadpk');

    //let url =  'https://pokeapi.co/api/v2/pokemon/ditto/';
   
    pokeApi.getPokemon(offset, limit).then((pokemons) => {
       /* const newList = pokemons.map((value, index, array) => {
            return convertPokemonToHtml(value);
        })
        const newHtml = newList.join('');

        pokemonList.innerHTML += newHtml;
        todo o codigo acima pode ser substituido pela linha abaixo*/

        const newList = pokemons.map((pokemon) => 
        `<li class="pokemon ${pokemon.type}">
            <span class="number">#${pokemon.number}</span>
            <span class="name">${pokemon.name}</span>
                
            <div class="detail">
                <ol class="types">
                    ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                </ol>
                <img src="${pokemon.photo}" 
                    alt="${pokemon.name}">
            </div>
        </li>`).join('');

        pokemonList.innerHTML += newList;
        //console.log(newList);

        //todo codigo abaixo pode ser substituido pelo metodo map
        //for (let i = 0; i < pokemons.length; i++) {
        //    const pokemon = pokemons[i];
        //    listItems.push(convertPokemonToHtml(pokemon));
        //}
        //console.log(listItems);
    })
    .catch((erro) => {
        console.log('Erro: ' + erro);
    })
    .finally(function () {
        console.log('Requisição cocluída!')
    });

}

loadpk(offset, limit);