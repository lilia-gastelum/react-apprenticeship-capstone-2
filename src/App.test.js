import { render, screen } from '@testing-library/react';
import App from './App';

test('renders photo of the day', () => {
  render(<App />);
  const linkElement = screen.getByText(/Photo of the day/i);
  expect(linkElement).toBeInTheDocument();
});
