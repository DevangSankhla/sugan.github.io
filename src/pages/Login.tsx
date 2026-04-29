import { useState } from 'react';
import { useNavigate, Link, useSearchParams } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Eye, EyeOff, Mail, Lock, Chrome, KeyRound } from 'lucide-react';

export default function Login() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { login, loginWithGoogle, resetPassword } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [resetMode, setResetMode] = useState(false);
  const [resetSent, setResetSent] = useState(false);

  // Only accept internal redirect paths to prevent open-redirect attacks
  const rawRedirect = searchParams.get('redirect') || '/account';
  const redirectPath = rawRedirect.startsWith('/') && !rawRedirect.startsWith('//')
    ? rawRedirect
    : '/account';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await login(email, password);
      navigate(redirectPath);
    } catch (err: any) {
      setError(err.message || 'Failed to login');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setLoading(true);
    setError('');
    try {
      await loginWithGoogle();
      navigate(redirectPath);
    } catch (err: any) {
      console.error('Google login error:', err);
      if (err.code === 'auth/popup-closed-by-user') {
        setError('Login popup was closed. Please try again.');
      } else if (err.code === 'auth/unauthorized-domain') {
        setError('This domain is not authorized for Google login. Please contact support.');
      } else {
        setError(err.message || 'Failed to login with Google');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!email) {
      setError('Please enter your email address');
      return;
    }
    setLoading(true);
    try {
      await resetPassword(email);
      setResetSent(true);
    } catch (err: any) {
      setError(err.message || 'Failed to send reset email');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-sugan-bone flex items-center justify-center px-4 py-12">
      <div className="max-w-md w-full">
        <Card className="border-none shadow-xl">
          <CardHeader className="text-center space-y-2">
            <CardTitle className="font-display text-2xl text-sugan-ink">
              {resetMode ? 'Reset Password' : 'Welcome Back'}
            </CardTitle>
            <CardDescription className="font-body text-sugan-ink/60">
              {resetMode 
                ? 'Enter your email and we will send you a reset link' 
                : 'Sign in to access your account, orders, and wishlist'}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {resetSent && (
              <div className="p-3 rounded-lg bg-green-50 text-green-700 text-sm font-body flex items-center gap-2">
                <KeyRound className="w-4 h-4" />
                Password reset link sent! Check your email.
              </div>
            )}
            {/* Google Login */}
            <Button
              variant="outline"
              className="w-full h-12 font-body border-sugan-ink/20 hover:bg-sugan-ink/5"
              onClick={handleGoogleLogin}
              disabled={loading}
            >
              <Chrome className="w-5 h-5 mr-2" />
              Continue with Google
            </Button>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-sugan-ink/10"></div>
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-white px-2 text-sugan-ink/40 font-body">
                  Or continue with email
                </span>
              </div>
            </div>

            <form onSubmit={resetMode ? handleResetPassword : handleSubmit} className="space-y-4">
              {error && (
                <div className="p-3 rounded-lg bg-red-50 text-red-600 text-sm font-body">
                  {error}
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="email" className="font-body text-sugan-ink">
                  Email
                </Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-sugan-ink/40" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10 h-12 font-body border-sugan-ink/20 focus:border-sugan-gold"
                    required
                  />
                </div>
              </div>

              {!resetMode && (
                <div className="space-y-2">
                  <Label htmlFor="password" className="font-body text-sugan-ink">
                    Password
                  </Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-sugan-ink/40" />
                    <Input
                      id="password"
                      type={showPassword ? 'text' : 'password'}
                      placeholder="Enter your password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="pl-10 pr-10 h-12 font-body border-sugan-ink/20 focus:border-sugan-gold"
                      required={!resetMode}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-sugan-ink/40 hover:text-sugan-ink"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>
              )}

              <Button
                type="submit"
                className="w-full h-12 bg-sugan-ink hover:bg-sugan-ink/90 font-body"
                disabled={loading}
              >
                {loading 
                  ? (resetMode ? 'Sending...' : 'Signing in...') 
                  : (resetMode ? 'Send Reset Link' : 'Sign In')}
              </Button>
            </form>

            <p className="text-center text-sm font-body text-sugan-ink/60">
              {resetMode ? (
                <button 
                  type="button"
                  onClick={() => { setResetMode(false); setResetSent(false); setError(''); }}
                  className="text-sugan-gold hover:underline"
                >
                  Back to login
                </button>
              ) : (
                <>
                  Don't have an account?{' '}
                  <Link
                    to={redirectPath !== '/account' ? `/signup?redirect=${encodeURIComponent(redirectPath)}` : '/signup'}
                    className="text-sugan-gold hover:underline"
                  >
                    Create account
                  </Link>
                </>
              )}
            </p>
            {!resetMode && (
              <p className="text-center text-sm font-body">
                <button 
                  type="button"
                  onClick={() => { setResetMode(true); setError(''); }}
                  className="text-sugan-ink/60 hover:text-sugan-gold transition-colors"
                >
                  Forgot password?
                </button>
              </p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
