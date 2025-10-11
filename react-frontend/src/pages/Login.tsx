// pages/Login.tsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUserStore } from '../stores/UserStore';
import api from '../assets/call-api'

// Define the expected response shape
interface LoginResponse {
    status: 'success' | 'error';
    token?: string;
    message?: string;
}

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const { setToken } = useUserStore();
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        try {
            // Type the API response
            const response = await api<LoginResponse>({
                path: '/login',
                method: 'post',
                payload: { email, password }
            });

            // Now TypeScript knows the shape of response
            if (response.status === 'success' && response.token) {
                setToken(response.token);
                navigate('/admin');
            } else {
                setError(response.message || 'Login failed');
            }
        } catch (error) {
            console.error('Login error:', error);
            setError('Login failed. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8">
                <div>
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-[#000d7b]">
                        Admin Login
                    </h2>
                </div>
                <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                    <div className="rounded-md shadow-sm -space-y-px">
                        <div>
                            <input
                                type="email"
                                required
                                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-[#3db6b4] focus:border-[#3db6b4] focus:z-10 sm:text-sm"
                                placeholder="Email address"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                disabled={isLoading}
                            />
                        </div>
                        <div>
                            <input
                                type="password"
                                required
                                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-[#3db6b4] focus:border-[#3db6b4] focus:z-10 sm:text-sm"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                disabled={isLoading}
                            />
                        </div>
                    </div>

                    {error && (
                        <div className="rounded-md bg-red-50 p-4">
                            <div className="text-sm text-red-700">{error}</div>
                        </div>
                    )}

                    <div>
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-[#000d7b] hover:bg-[#000a5f] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#3db6b4] disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
                        >
                            {isLoading ? (
                                <span className="flex items-center">
                                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    Logging in...
                                </span>
                            ) : (
                                'Sign in'
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
