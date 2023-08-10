// import { screen } from '@testing-library/react';
// import renderWithRouter from '../renderWithRouter';
// import App from '../App';

// test('Verifica se o card do pokemon esta correto', () => {
//   renderWithRouter(<App />);
//   const namePokemon = screen.getByText('Pikachu');
//   const typePokemon = screen.getByTestId('pokemon-type').textContent;
//   const weightPokemon = screen.getByTestId('pokemon-weight').textContent;
//   const imgPokemon = screen.getByRole('img', { name: /pikachu sprite/i });
//   expect(typePokemon).toBe('Electric');
//   expect(weightPokemon).toBe('Average weight: 6.0 kg');
//   expect(namePokemon).toBeInTheDocument();
//   expect(imgPokemon).toHaveAttribute('src', 'https://archives.bulbagarden.net/media/upload/b/b2/Spr_5b_025_m.png');
// });
// test('Verifica se o card possui um link de navegação, e quando clicado em favoritar ele fica salvo', async () => {
//   const { user } = renderWithRouter(<App />);
//   const moreDetailsLink = screen.getByRole('link', { name: 'More details' });
//   await user.click(moreDetailsLink);

//   const typePokemon = screen.getByTestId('pokemon-type').textContent;
//   const weightPokemon = screen.getByTestId('pokemon-weight').textContent;
//   const headingDetails = screen.getByText('Pikachu Details');

//   expect(typePokemon).toBe('Electric');
//   expect(weightPokemon).toBe('Average weight: 6.0 kg');
//   expect(headingDetails).toBeInTheDocument();

//   const btnFavorite = screen.getByRole('checkbox', { name: /pokémon favoritado\?/i });
//   const favoriteLink = screen.getByRole('link', { name: /favorite pokémon/i });
//   await user.click(btnFavorite);
//   await user.click(favoriteLink);

//   const favoriteStarImg = screen.getByRole('img', { name: /pikachu is marked as favorite/i });
//   expect(favoriteStarImg).toHaveAttribute('alt', 'Pikachu is marked as favorite');
// });
import { screen } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

test('Verifica se o card do pokemon está correto', () => {
  renderWithRouter(<App />);

  const pokemonDetails = {
    name: 'Pikachu',
    type: 'Electric',
    weight: 'Average weight: 6.0 kg',
    imgSrc: 'https://archives.bulbagarden.net/media/upload/b/b2/Spr_5b_025_m.png',
  };

  const namePokemon = screen.getByText(pokemonDetails.name);
  const typePokemon = screen.getByTestId('pokemon-type').textContent;
  const weightPokemon = screen.getByTestId('pokemon-weight').textContent;
  const imgPokemon = screen.getByRole('img', { name: /pikachu sprite/i });

  expect(typePokemon).toBe(pokemonDetails.type);
  expect(weightPokemon).toBe(pokemonDetails.weight);
  expect(namePokemon).toBeInTheDocument();
  expect(imgPokemon).toHaveAttribute('src', pokemonDetails.imgSrc);
});

test('Verifica se o card possui um link de navegação e o favorito é salvo', async () => {
  const { user } = renderWithRouter(<App />);
  const moreDetailsLink = screen.getByRole('link', { name: 'More details' });
  await user.click(moreDetailsLink);

  const pokemonDetails = {
    name: 'Pikachu',
    type: 'Electric',
    weight: 'Average weight: 6.0 kg',
  };

  const typePokemon = screen.getByTestId('pokemon-type').textContent;
  const weightPokemon = screen.getByTestId('pokemon-weight').textContent;
  const headingDetails = screen.getByText(`${pokemonDetails.name} Details`);

  expect(typePokemon).toBe(pokemonDetails.type);
  expect(weightPokemon).toBe(pokemonDetails.weight);
  expect(headingDetails).toBeInTheDocument();

  const btnFavorite = screen.getByRole('checkbox', { name: /pokémon favoritado\?/i });
  const favoriteLink = screen.getByRole('link', { name: /favorite pokémon/i });
  await user.click(btnFavorite);
  await user.click(favoriteLink);

  const favoriteStarImg = screen.getByRole('img', { name: /pikachu is marked as favorite/i });
  expect(favoriteStarImg).toHaveAttribute('alt', `${pokemonDetails.name} is marked as favorite`);
});
