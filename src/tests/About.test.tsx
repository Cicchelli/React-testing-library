import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from '../App';

test('Verifica o componente About', () => {
  render(
    <MemoryRouter initialEntries={ ['/about'] }>
      {' '}
      {/* Define a rota inicial */}
      <App />
    </MemoryRouter>,
  );

  const h2About = screen.getByRole('heading', { name: /about pokédex/i });
  expect(h2About).toBeInTheDocument();

  const imgPokedex = screen.getByRole('img', { name: /pokédex/i });
  expect(imgPokedex).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
});
