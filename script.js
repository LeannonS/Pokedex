const pokemonName = document.querySelector(".pokemon_name")
const pokemonNumber = document.querySelector(".pokemon_number")
const pokemonImage = document.querySelector(".pokemon_image")
const form = document.querySelector(".form")
const input = document.querySelector(".input_search")
const buttonNext = document.querySelector(".btn_next")
const buttonPrevious = document.querySelector(".btn_previous")

let searchPokemon = 1;

const fetchPokemon = async (pokemon) => {
  const APIResponse = await fetch("https://pokeapi.co/api/v2/pokemon/" + pokemon);

  if(APIResponse.status == 200)
  {
    const data = await APIResponse.json();
    return data;
  }
}

const renderPokemon = async (pokemon) => {
  pokemonName.innerHTML = 'Loading...';
  pokemonNumber.innerHTML = '';
  
  const data = await fetchPokemon(pokemon);
  
  if(data)
  {
    pokemonImage.style.display = 'block';
    pokemonName.innerHTML = data.name;
    pokemonNumber.innerHTML = data.id;
    pokemonImage.src = data['sprites']['versions']['generation-v']['black-white']['animated']['front_default'];
    searchPokemon = data.id;
  }
  else
  {
    pokemonImage.style.display = 'none';
    pokemonName.innerHTML = "Not Found";
    pokemonNumber.innerHTML = '';
  }
  input.value = '';
}

form.addEventListener('submit', (event) => {
  event.preventDefault();
  renderPokemon(input.value.toLowerCase());
});

buttonNext.addEventListener('click', () => {
  if(searchPokemon < 1010)
  {
    searchPokemon++;
    renderPokemon(searchPokemon)
  }
});

buttonPrevious.addEventListener('click', () => {
  if(searchPokemon > 1)
  {
    searchPokemon--;
    renderPokemon(searchPokemon)
  }
});

renderPokemon(searchPokemon);