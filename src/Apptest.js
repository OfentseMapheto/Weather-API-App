/*import { render, screen } from '@testing-library/react';
import App from './App';

test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});*/
const { render, screen } = require('@testing-library/react');
const React = require('react');
const App = require('./App');

test('renders learn react link', () => {
  render(React.createElement(App, null));
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});

