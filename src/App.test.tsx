import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';

beforeEach(() => window.history.replaceState({}, '', '/'));

test('home shows the updated biography and visit with advisor links', () => {
  render(<App />);
  expect(screen.getByRole('heading', { name: /Pranav Ponnivalavan/ })).toBeInTheDocument();
  expect(screen.getByText(/I am a 2nd year M.Eng/)).toBeInTheDocument();
  expect(screen.getByText(/January to April 2027/)).toBeInTheDocument();
  expect(screen.getByRole('link', { name: 'Justin W Hart' })).toHaveAttribute('href', 'https://justinhart.net');
  expect(screen.queryByText('Expertise')).not.toBeInTheDocument();
  expect(screen.queryByRole('heading', { name: 'TaSA short demo' })).not.toBeInTheDocument();
});

test.each([
  ['/research.html', 'Research'],
  ['/publications.html', 'Research Publications'],
  ['/experience.html', 'Experience'],
  ['/projects.html', 'Projects'],
])('direct navigation to %s renders only the requested page', (path, title) => {
  window.history.replaceState({}, '', path);
  render(<App />);
  expect(screen.getByRole('heading', { level: 1, name: title })).toBeInTheDocument();
  expect(screen.getAllByRole('heading', { level: 1 })).toHaveLength(1);
  expect(screen.queryByText(/I am a 2nd year M.Eng/)).not.toBeInTheDocument();
});

test('mobile menu can be opened and closed', () => {
  render(<App />);
  const toggle = screen.getByRole('button', { name: 'Menu +' });
  fireEvent.click(toggle);
  expect(toggle).toHaveAttribute('aria-expanded', 'true');
  fireEvent.click(toggle);
  expect(toggle).toHaveAttribute('aria-expanded', 'false');
});

test('unknown pages offer a route home', () => {
  window.history.replaceState({}, '', '/missing.html');
  render(<App />);
  expect(screen.getByRole('heading', { name: 'Page not found' })).toBeInTheDocument();
  expect(screen.getByRole('link', { name: /Return home/ })).toHaveAttribute('href', '/');
});
