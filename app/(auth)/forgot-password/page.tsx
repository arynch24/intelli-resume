'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { CircleAlert, ArrowLeft, Mail, CheckCircle } from 'lucide-react';
import axios from 'axios';

const ForgotPasswordPage = () => {
    const router = useRouter();

    // State management
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    // Handle forgot password request
    const handleForgotPassword = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setSuccess('');
        setIsLoading(true);

        // Basic email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!email || !emailRegex.test(email)) {
            setError('Please enter a valid email address');
            setIsLoading(false);
            return;
        }

        try {
            // Make API call to forgot password endpoint
            const response = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/forgot-password`, {
                email,
            });
            if (response.status === 200) {
                setSuccess('Password reset link sent to your email.');
                setEmail(''); // Clear email input on success
            }
        } catch (error:any) {
            setError(error.response?.data?.message || 'Something went wrong. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    // Handle resend functionality
    const handleResend = () => {
        if (email) {
            handleForgotPassword({ preventDefault: () => { } } as React.FormEvent);
        }
    };

    return (
        <div className='h-screen w-full flex items-center'>
            <div className='h-full w-full px-6 flex flex-col justify-center text-zinc-800 gap-4 max-w-md mx-auto'>

                {/* Back button */}
                <button
                    onClick={() => router.push('/signin')}
                    className='flex items-center gap-2 text-sm cursor-pointer text-blue-500 hover:text-blue-700 hover:bg-zinc-100 p-2 rounded mb-4 w-fit'
                >
                    <ArrowLeft size={16} />
                    Back to login
                </button>

                {/* Header */}
                <div className='flex flex-col gap-2 pb-3'>
                    <h1 className='font-bold text-3xl'>Reset your password</h1>
                    <p className='text-sm text-zinc-600'>
                        Enter your email address and we'll send you a link to reset your password.
                    </p>
                </div>

                {/* Forgot password form */}
                <form onSubmit={handleForgotPassword} className="w-full">
                    <h3 className="font-semibold text-base mb-1 text-left">
                        Email Address
                    </h3>
                    <div className="relative">
                        <input
                            className="w-full p-2 pl-10 border border-zinc-300 rounded-md text-base focus:outline-none focus:border-zinc-500 mb-4"
                            type="email"
                            value={email}
                            onChange={(e) => {
                                setEmail(e.target.value);
                                // Clear errors when user starts typing
                                if (error) setError('');
                                if (success) setSuccess('');
                            }}
                            placeholder="Enter your email address"
                            required
                        />
                        <Mail className="absolute left-3 top-3 w-4 h-4 text-zinc-400" />
                    </div>

                    {/* Error message */}
                    {error && (
                        <div className='flex items-center gap-2 text-red-500 text-sm mb-4'>
                            <CircleAlert size={16} />
                            {error}
                        </div>
                    )}

                    {/* Success message */}
                    {success && (
                        <div className='flex items-center gap-2 text-green-500 text-sm mb-4'>
                            <CheckCircle size={16} />
                            {success}
                        </div>
                    )}

                    {/* Submit button */}
                    <button
                        type="submit"
                        disabled={isLoading || !email}
                        className={`w-full px-4 py-2 rounded-md cursor-pointer transition-colors ${!isLoading && email
                            ? 'bg-blue-600 text-white hover:bg-blue-700'
                            : 'bg-zinc-300 text-zinc-500 cursor-not-allowed'
                            }`}
                    >
                        {isLoading ? 'Sending...' : 'Send Reset Link'}
                    </button>
                </form>

                {/* Additional help text */}
                <div className="text-center text-sm text-zinc-600 mt-4">
                    <p>Didn't receive the email? Check your spam folder or</p>
                    <button
                        onClick={handleResend}
                        className="text-blue-500 hover:text-blue-700 underline"
                        disabled={isLoading || !email}
                    >
                        try again
                    </button>
                </div>

                {/* Return to signin link */}
                <div className="text-center text-sm text-zinc-600 mt-2">
                    <p>
                        Remember your password?{' '}
                        <button
                            onClick={() => router.push('/signin')}
                            className="text-blue-500 hover:text-blue-700 underline"
                        >
                            Sign in
                        </button>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default ForgotPasswordPage;