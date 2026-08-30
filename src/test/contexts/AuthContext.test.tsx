import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { AuthProvider, useAuth } from '../../contexts/AuthContext';

function Probe() {
  const { isAuthenticated, isVerifying, userEmail, accessToken } = useAuth();
  return (
    <div>
      <span data-testid="authenticated">{String(isAuthenticated)}</span>
      <span data-testid="verifying">{String(isVerifying)}</span>
      <span data-testid="email">{String(userEmail)}</span>
      <span data-testid="token">{String(accessToken)}</span>
    </div>
  );
}

describe('AuthContext', () => {
  it('is always authenticated with no verification step, since LegalEase has no login', () => {
    render(
      <AuthProvider>
        <Probe />
      </AuthProvider>
    );

    expect(screen.getByTestId('authenticated')).toHaveTextContent('true');
    expect(screen.getByTestId('verifying')).toHaveTextContent('false');
    expect(screen.getByTestId('email')).toHaveTextContent('null');
    expect(screen.getByTestId('token')).toHaveTextContent('null');
  });

  it('login and logout are safe no-ops', async () => {
    let ctx: ReturnType<typeof useAuth> | null = null;
    function Capture() {
      ctx = useAuth();
      return null;
    }

    render(
      <AuthProvider>
        <Capture />
      </AuthProvider>
    );

    await expect(ctx!.login('unused-token')).resolves.toBeUndefined();
    expect(ctx!.logout()).toBe(true);
  });
});
