const pokeApi = {}

function convertPokeApiDetailToPokemon(pokeDetail) {
    const pokemon = new Pokemon();
    pokemon.number = pokeDetail.id;
    pokemon.name = pokeDetail.name;

    const types = pokeDetail.types.map((typeSlot) => typeSlot.type.name);
    const [type] = types;//destructuring pega apenas o primeiro valor: [type1, type2]
    pokemon.types = types;
    pokemon.type = type;

    pokemon.photo = pokeDetail.sprites.other.dream_world.front_default;

    return pokemon;
}

pokeApi.getPokemonDetail = (pokemon) => {
    return fetch(pokemon.url)
            .then((response) => response.json())
            .then(convertPokeApiDetailToPokemon)
}

pokeApi.getPokemon = (offset = 0, limit=10) => {
    const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`;

   return fetch(url)
        .then((response) => response.json())
        .then((jsonBody) => jsonBody.results)
        .then((pokemons) => pokemons.map(pokeApi.getPokemonDetail))
        .then((detailRequests) => Promise.all(detailRequests)) //promise.all(todos as requisições são ser retornadas ao mesmo tempo, esperando que todas fiquem prontas)
        .then((pokemonDetails) => pokemonDetails) // () => {return x}
        //{
            //debugger
            //console.log(pokemonDetails)
        //})
        .catch((error) => console.log(error))
}

//promise.all returnaum aarray de fecth somente qnd todas retornarem algo