import { screen } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('Navigation links on the initial screen', () => {
  beforeEach(() => {
    renderWithRouter(<App />);
  });

  it('should render the "Home" link', () => {
    const linkHome = screen.getByRole('link', { name: 'Home' });
    expect(linkHome).toBeInTheDocument();
  });

  it('should render the "About" link', () => {
    const linkAbout = screen.getByRole('link', { name: 'About' });
    expect(linkAbout).toBeInTheDocument();
  });

  it('should render the "Favorite Pokémon" link', () => {
    const linkFavorite = screen.getByRole('link', { name: 'Favorite Pokémon' });
    expect(linkFavorite).toBeInTheDocument();
  });
});
