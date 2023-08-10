import { screen } from '@testing-library/react';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

beforeEach(() => {
  renderWithRouter(<App />, { route: '/errado' });
});

test('Exibe um h2 com o texto "Page requested not found"', () => {
  const headingNotFound = screen.getByRole('heading', { name: /Page requested not found/i });
  expect(headingNotFound).toBeInTheDocument();
});

test("Existe uma imagem com o alt 'Clefairy pushing buttons randomly with text I have no idea what i'm doing'", () => {
  const image = screen.getByRole('img');
  const altText = "Clefairy pushing buttons randomly with text I have no idea what i'm doing";
  expect(image).toHaveAttribute('alt', altText);
});
