import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Book, Mail, Lock, EyeOff, Eye, ArrowLeft } from 'lucide-react';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import { useAuth } from '../../context/AuthContext';

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      await login(email, password);
      navigate('/dashboard');
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Invalid email or password');
    } finally {
      setLoading(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center mx-auto py-8 px-4 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="text-center">
          <Link to="/" className="inline-flex items-center text-blue-800 hover:text-blue-700">
            <ArrowLeft className="h-4 w-4 mr-1" />
            Back to Home
          </Link>
        </div>
        <div className="flex justify-center mt-5">
          <Link to="/" className="flex items-center">
            <Book className="h-10 w-10 text-blue-800" />
            <span className="ml-2 text-2xl font-bold bg-gradient-to-r from-blue-800 to-emerald-600 bg-clip-text text-transparent">
              LedgerSense
            </span>
          </Link>
        </div>
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Sign in to your account
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Or{' '}
          <Link to="/signup" className="font-medium text-blue-800 hover:text-blue-700">
            create a new account
          </Link>
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 sm:rounded-lg sm:px-10 shadow">
          {error && (
            <div className="mb-4 bg-red-50 text-red-800 p-4 rounded-md">
              {error}
            </div>
          )}
          
          <form className="space-y-6" onSubmit={handleSubmit}>
            <Input
              id="email"
              label="Email address"
              type="email"
              autoComplete="email"
              required
              leftIcon={<Mail className="h-5 w-5" />}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <div>
              <Input
                id="password"
                label="Password"
                type={showPassword ? 'text' : 'password'}
                autoComplete="current-password"
                required
                leftIcon={<Lock className="h-5 w-5" />}
                rightIcon={
                  <button
                    type="button"
                    onClick={togglePasswordVisibility}
                    className="focus:outline-none"
                  >
                    {showPassword ? (
                      <EyeOff className="h-5 w-5" />
                    ) : (
                      <Eye className="h-5 w-5" />
                    )}
                  </button>
                }
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <div className="mt-2 text-right">
                <Link to="/forgot-password" className="text-sm font-medium text-blue-800 hover:text-blue-700">
                  Forgot your password?
                </Link>
              </div>
            </div>

            <div>
              <Button
                type="submit"
                className="w-full"
                isLoading={loading}
              >
                Sign in
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;