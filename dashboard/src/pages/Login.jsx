import React, { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { Button, Card } from '@reava/ui';
import { useAuth } from '@reava/hooks';

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');
    setLoading(true);

    const { error: loginError } = await login(email, password);

    if (loginError) {
      setError(loginError.message ?? 'Unable to sign in');
      setLoading(false);
      return;
    }

    const redirectTo = location.state?.from ? location.state.from.replace('/dashboard', '') : '/overview';
    navigate(redirectTo, { replace: true });
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-background via-surface/70 to-background">
      <Card className="w-full max-w-md border-white/5 bg-surface/80 p-8">
        <div className="text-center">
          <p className="text-xs uppercase tracking-[0.4em] text-primary-200">Reava Network</p>
          <h1 className="mt-3 text-3xl font-semibold text-neutral-50">Control Center Access</h1>
          <p className="mt-2 text-sm text-neutral-400">Sign in with your operator credentials.</p>
        </div>

        {error && (
          <div className="mt-6 rounded-lg border border-danger/30 bg-danger/10 px-4 py-3 text-sm text-danger">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="mt-6 space-y-5">
          <label className="block text-left text-sm text-neutral-300">
            Email
            <input
              className="mt-2 w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-neutral-100 placeholder:text-neutral-500 focus:border-primary-400 focus:outline-none focus:ring-2 focus:ring-primary-300/50"
              type="email"
              required
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
          </label>
          <label className="block text-left text-sm text-neutral-300">
            Password
            <input
              className="mt-2 w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-neutral-100 placeholder:text-neutral-500 focus:border-primary-400 focus:outline-none focus:ring-2 focus:ring-primary-300/50"
              type="password"
              required
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
          </label>
          <Button type="submit" disabled={loading} className="w-full" size="lg">
            {loading ? 'Signing in...' : 'Access dashboard'}
          </Button>
        </form>

        <p className="mt-6 text-center text-xs text-neutral-500">
          Need an account?{' '}
          <Link to="/" className="text-primary-200 hover:text-primary-100">
            Request access
          </Link>
        </p>
      </Card>
    </div>
  );
};

export default Login;
