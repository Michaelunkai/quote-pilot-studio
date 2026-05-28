import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import App from './App';

describe('App', () => {
  it('renders product headline and calculator', () => {
    render(<App />);
    expect(screen.getByText(/Turn messy client requests/i)).toBeInTheDocument();
    expect(screen.getByText(/Proposal calculator/i)).toBeInTheDocument();
    expect(screen.getAllByText(/Recommended fixed price/i).length).toBeGreaterThan(0);
  });
});
