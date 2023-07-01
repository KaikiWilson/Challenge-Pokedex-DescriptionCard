

const pokeApi = {}

function convertPokeApiDetailToPokemon(pokeDetail) {
    const pokemon = new Pokemon()
    /*pokemon.number = pokeDetail.id
    pokemon.name = pokeDetail.name*/

    const eggGroups = pokeDetail.egg_groups.map((eggSlot) => eggSlot.egg_groups.name)

    pokemon.eggGroups = eggGroups

    return pokemon
}

pokeApi.getPokemonDetail = (pokemon) => {
    return fetch(pokemon.url)
        .then((response) => response.json())
        .then(convertPokeApiDetailToPokemon)
}

pokeApi.getPokemons = () => {
    const url = `https://pokeapi.co/api/v2/pokemon/1/`

    return fetch(url)
        .then((response) => response.json())
        .then((jsonBody) => jsonBody.results)
        .then((pokemons) => pokemons.map(pokeApi.getPokemonDetail))
        .then((detailRequests) => Promise.all(detailRequests))
        .then((pokemonsDetails) => pokemonsDetails)
}