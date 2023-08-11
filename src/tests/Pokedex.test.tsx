import { screen } from '@testing-library/react';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

const renderApp = () => {
  const utils = renderWithRouter(<App />);
  const { user } = utils;
  const buttonNext = screen.getByRole('button', { name: /Próximo Pokémon/i });

  return { ...utils, user, buttonNext };
};

test('Exibe o h2 com o texto "Encountered Pokémon"', () => {
  renderApp();
  const heading = screen.getByRole('heading', { name: /Encountered Pokémon/i });
  expect(heading).toBeInTheDocument();
});

test('Exibe o próximo Pokémon da lista', async () => {
  const { user, buttonNext } = renderApp();
  const buttonFire = screen.getByRole('button', { name: /fire/i });
  await user.click(buttonFire);
  const charmander = screen.getByText(/charmander/i);

  await user.click(buttonNext);
  const rapidash = screen.getByText(/Rapidash/i);
  expect(rapidash).toBeInTheDocument();

  await user.click(buttonNext);
  expect(charmander).toBeInTheDocument();
});

test('Mostra apenas um Pokémon', async () => {
  const { user, buttonNext } = renderApp();
  expect(screen.queryByText(/Pikachu/i)).toBeInTheDocument();

  await user.click(buttonNext);
  expect(screen.getByText(/Charmander/i)).toBeInTheDocument();
  expect(screen.queryByText(/Pikachu/i)).not.toBeInTheDocument();
});

test('Exibe os botões de filtro', async () => {
  const { user } = renderApp();
  const buttonsType = screen.getAllByTestId('pokemon-type-button');
  buttonsType.forEach((button) => expect(button).toBeInTheDocument());

  const buttonBug = screen.getByRole('button', { name: /bug/i });
  const buttonFire = screen.getByRole('button', { name: /fire/i });

  await user.click(buttonBug);
  const textBug = screen.getAllByText(/bug/i);
  expect(textBug).toHaveLength(2);

  await user.click(buttonFire);
  const textFire = screen.getAllByText(/fire/i);
  expect(textFire).toHaveLength(2);

  const buttonAll = screen.getByRole('button', { name: /all/i });
  expect(buttonAll).toBeEnabled();
});

test('Exibe os botões de filtro e reseta', async () => {
  const { user, buttonNext } = renderApp();
  expect(screen.queryByText(/Pikachu/i)).toBeInTheDocument();

  await user.click(buttonNext);
  expect(screen.getByText(/Charmander/i)).toBeInTheDocument();

  const buttonAll = screen.getByRole('button', { name: /all/i });
  expect(buttonAll).toHaveTextContent(/all/i);
  expect(buttonAll).not.toHaveProperty('data-testid', 'pokemon-type-button');

  await user.click(buttonAll);
  expect(screen.queryByText(/Pikachu/i)).toBeInTheDocument();
});
