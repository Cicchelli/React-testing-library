import { screen } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

const renderAppWithTestRoute = () => {
  renderWithRouter(<App />, { route: '/teste' });
};

test('Verifica se existe um h2 com o texto "Page requested not found"', () => {
  renderAppWithTestRoute();
  expect(screen.getByRole('heading', { name: 'Page requested not found' })).toBeInTheDocument();
});

test('Verifica se a pagina possui uma imagem com o alt text "Clefairy pushing buttons randomly with text I have no idea what i`m doing"', () => {
  renderAppWithTestRoute();
  const notFound = screen.getByRole('img');
  expect(notFound).toHaveAttribute('src', '/404.gif');
});
