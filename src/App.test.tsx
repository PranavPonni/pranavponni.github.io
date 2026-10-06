import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';

beforeEach(() => window.history.replaceState({}, '', '/'));

test('home shows the updated biography and visit with advisor links', () => {
  render(<App />);
  expect(screen.getByRole('heading', { name: /Pranav Ponnivalavan/ })).toBeInTheDocument();
  expect(screen.getByText('- seeking PhD opportunities :)')).toBeInTheDocument();
  expect(screen.getByText(/I am a 2nd year M.Eng/)).toBeInTheDocument();
  expect(screen.getByText(/January to April 2027/)).toBeInTheDocument();
  expect(screen.getByRole('link', { name: 'Justin W Hart' })).toHaveAttribute('href', 'https://justinhart.net');
  expect(screen.getByRole('link', { name: /View CV/ })).toHaveAttribute('href', '/cv.pdf');
  expect(screen.getByRole('link', { name: /View CV/ })).toHaveAttribute('target', '_blank');
  expect(screen.queryByRole('link', { name: /Explore my research/ })).not.toBeInTheDocument();
  expect(screen.queryByLabelText('Pranav Ponnivalavan home')).not.toBeInTheDocument();
  expect(screen.getByText(/Last Updated: Oct 2026/)).toBeInTheDocument();
  expect(screen.queryByText('Expertise')).not.toBeInTheDocument();
  expect(screen.queryByText('Manipulation')).not.toBeInTheDocument();
  expect(screen.queryByText('Tactile sensing')).not.toBeInTheDocument();
  expect(screen.queryByText('Cognition')).not.toBeInTheDocument();
  expect(screen.queryByRole('heading', { name: 'TaSA short demo' })).not.toBeInTheDocument();
});

test.each([
  ['/research.html', 'Research'],
  ['/publications.html', 'Research Publications'],
  ['/projects.html', 'Projects'],
])('direct navigation to %s renders only the requested page', (path, title) => {
  window.history.replaceState({}, '', path);
  render(<App />);
  expect(screen.getByRole('heading', { level: 1, name: title })).toBeInTheDocument();
  expect(screen.getAllByRole('heading', { level: 1 })).toHaveLength(1);
  expect(screen.queryByText(/I am a 2nd year M.Eng/)).not.toBeInTheDocument();
});

test('research shows the current paper review status', () => {
  window.history.replaceState({}, '', '/research.html');
  render(<App />);
  expect(screen.getByText('(Under review at IEEE T-RO)')).toBeInTheDocument();
  expect(screen.getByRole('link', { name: 'Main paper' })).toBeInTheDocument();
  expect(screen.getByRole('link', { name: 'Project page' })).toBeInTheDocument();
  expect(screen.queryByText('TaSA paper on arXiv.')).not.toBeInTheDocument();
});

test('mobile menu can be opened and closed', () => {
  render(<App />);
  const toggle = screen.getByRole('button', { name: 'Menu +' });
  fireEvent.click(toggle);
  expect(toggle).toHaveAttribute('aria-expanded', 'true');
  fireEvent.click(toggle);
  expect(toggle).toHaveAttribute('aria-expanded', 'false');
});

test('publication media dialog closes with Escape and restores focus', () => {
  window.history.replaceState({}, '', '/publications.html');
  render(<App />);

  const mediaButton = screen.getAllByRole('button', { name: /Open larger image/ })[0];
  fireEvent.click(mediaButton);
  expect(screen.getByRole('dialog', { name: 'Expanded media image' })).toBeInTheDocument();

  fireEvent.keyDown(document, { key: 'Escape' });
  expect(screen.queryByRole('dialog', { name: 'Expanded media image' })).not.toBeInTheDocument();
  expect(mediaButton).toHaveFocus();
});

test.each(['/experience.html', '/missing.html'])('removed or unknown page %s offers a route home', (path) => {
  window.history.replaceState({}, '', path);
  render(<App />);
  expect(screen.getByRole('heading', { name: 'Page not found' })).toBeInTheDocument();
  expect(screen.getByRole('link', { name: /Return home/ })).toHaveAttribute('href', '/');
});
