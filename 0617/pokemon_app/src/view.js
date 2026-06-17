const card = document.querySelector('.card');
const errorEl = document.querySelector('.error');
const loader = document.querySelector('.loader');
const typeColors = {
  normal: '#A8A77A',
  fire: '#EE8130',
  water: '#6390F0',
  electric: '#F7D02C',
  grass: '#7AC74C',
  ice: '#96D9D6',
  fighting: '#C22E28',
  poison: '#A33EA1',
  ground: '#E2BF65',
  flying: '#A98FF3',
  psychic: '#F95587',
  bug: '#A6B91A',
  rock: '#B6A136',
  ghost: '#735797',
  dragon: '#6F35FC',
  dark: '#705746',
  steel: '#B7B7CE',
  fairy: '#D685AD',
};

export const renderPokemon = (data) => {
  const types = data.types
    .map((type) => type.type.name)
    .join(' / ');
  const color = typeColors[data.types[0].type.name] || '#999';

  card.innerHTML = `
    <div style="display:flex; align-items:center; justify-content:center; gap:24px;">
      <div style="width:24px; height:24px; border-radius:50%; background:${color}; animation: float 2s ease-in-out infinite;"></div>

      <div>
        <h2>${data.name}</h2>
        <img src="${data.sprites.front_default}" alt="${data.name}">
        <div style="display:flex; justify-content:center; gap:16px; margin-top:8px;">
          <p>タイプ: ${types}</p>
          <p>高さ: ${data.height}cm</p>
          <p>重さ: ${data.weight}kg</p>
        </div>
      </div>

      <div style="width:24px; height:24px; border-radius:50%; background:${color}; animation: float 2s ease-in-out infinite 0.5s;"></div>
    </div>
  `;
  card.hidden = false;
  errorEl.hidden = true;
};

export const showError = function (message) {
  errorEl.textContent = message;
  errorEl.hidden = false;
  card.hidden = true;
};

export function setLoading(isLoading) {
  loader.hidden = !isLoading;
  if (isLoading) {
    card.hidden = true;
    errorEl.hidden = true;
  }
}
