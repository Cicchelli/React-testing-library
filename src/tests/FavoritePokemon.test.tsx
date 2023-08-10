import { screen, fireEvent } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('Testes de Pokémons favoritos', () => {
  test('Exibe mensagem de nenhum Pokémon favorito', () => {
    renderWithRouter(<App />, { route: '/favorites' });
    const noFavoriteMessage = screen.getByText(/no favorite pokémon found/i);
    expect(noFavoriteMessage).toBeInTheDocument();
  });

  test('Exibe Pokémon favorito na lista de Favoritos', async () => {
    const { user } = renderWithRouter(<App />);
    const linkMoreDetails = screen.getByRole('link', { name: /more details/i });

    fireEvent.click(linkMoreDetails);
    fireEvent.click(screen.getByRole('checkbox', { name: /pokémon favoritado\?/i }));
    fireEvent.click(screen.getByRole('link', { name: /favorite pokémon/i }));

    const pokemonImage = screen.getByRole('img', { name: /sprite/i });
    expect(pokemonImage).toBeInTheDocument();
  });
});
