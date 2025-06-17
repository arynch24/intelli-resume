'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';
import { CircleAlert, Eye, EyeOff, ArrowLeft, Mail, CheckCircle } from 'lucide-react';

const SigninPage = () => {
    const router = useRouter(); // Next.js router hook to navigate programmatically

    // State to hold email and password input values
    const [form, setForm] = useState({ email: '', password: '' });
    // State to hold any error message from sign-in process
    const [error, setError] = useState('');
    // State to hold success messages
    const [success, setSuccess] = useState('');

    // State for password visibility toggle
    const [showPassword, setShowPassword] = useState(false);

    // State for forgot password modal/view
    const [showForgotPassword, setShowForgotPassword] = useState(false);
    const [forgotEmail, setForgotEmail] = useState('');
    const [forgotError, setForgotError] = useState('');
    const [forgotSuccess, setForgotSuccess] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    // Updates form state whenever input changes
    const handleChange = (e: any) => {
        setForm({ ...form, [e.target.name]: e.target.value });
        // Clear errors when user starts typing
        if (error) setError('');
    };

    // Handles sign-in process using next-auth's credentials provider
    const handleSignIn = async () => {
        setError(''); // Clear previous errors
        setSuccess(''); // Clear previous success messages

        // Basic validation
        if (!form.email || !form.password) {
            setError('Please fill in all fields');
            return;
        }

        // Call signIn method, with redirect disabled to handle success/failure manually
        const res = await signIn('credentials', {
            redirect: false,
            email: form.email,
            password: form.password,
        });

        if (res?.ok) {
            // If sign-in is successful, redirect to dashboard
            router.push('/dashboard');
        }

        if (res?.error) {
            // If there was an error, set the error message to display
            setError(res.error);
        }
    };

    // Handle forgot password request
    const handleForgotPassword = async (e: any) => {
        e.preventDefault();
        setForgotError('');
        setForgotSuccess('');
        setIsLoading(true);

        // Basic email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!forgotEmail || !emailRegex.test(forgotEmail)) {
            setForgotError('Please enter a valid email address');
            setIsLoading(false);
            return;
        }

        try {
            // Make API call to forgot password endpoint
            const response = await fetch('/api/auth/forgot-password', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email: forgotEmail }),
            });

            const data = await response.json();

            if (response.ok) {
                setForgotSuccess('Password reset link has been sent to your email. Please check your inbox.');
                setForgotEmail('');
            } else {
                setForgotError(data.error || 'Failed to send reset email. Please try again.');
            }
        } catch (error) {
            setForgotError('Something went wrong. Please try again later.');
        } finally {
            setIsLoading(false);
        }
    };

    // Reset forgot password modal state
    const resetForgotPasswordState = () => {
        setForgotEmail('');
        setForgotError('');
        setForgotSuccess('');
        setShowForgotPassword(false);
    };

    // If showing forgot password view
    if (showForgotPassword) {
        return (
            <div className='h-screen w-full flex items-center'>
                <div className='h-full w-full px-6 flex flex-col justify-center text-zinc-800 gap-4 max-w-md mx-auto'>

                    {/* Back button */}
                    <button
                        onClick={resetForgotPasswordState}
                        className='flex items-center gap-2 text-blue-500 hover:text-blue-700 mb-4 w-fit'
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
                                value={forgotEmail}
                                onChange={(e) => setForgotEmail(e.target.value)}
                                placeholder="Enter your email address"
                                required
                            />
                            <Mail className="absolute left-3 top-3 w-4 h-4 text-zinc-400" />
                        </div>

                        {/* Error message */}
                        {forgotError && (
                            <div className='flex items-start gap-1 text-red-500 text-sm mb-4'>
                                <CircleAlert size={16} className='mt-1' />
                                {forgotError}
                            </div>
                        )}

                        {/* Success message */}
                        {forgotSuccess && (
                            <div className='flex items-start gap-1 text-green-500 text-sm mb-4'>
                                <CheckCircle size={16} className='mt-1' />
                                {forgotSuccess}
                            </div>
                        )}

                        {/* Submit button */}
                        <button
                            type="submit"
                            disabled={isLoading || !forgotEmail}
                            className={`w-full px-4 py-2 rounded-md cursor-pointer transition-colors ${!isLoading && forgotEmail
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
                            onClick={() => handleForgotPassword({ preventDefault: () => { } })}
                            className="text-blue-500 hover:text-blue-700 underline"
                            disabled={isLoading}
                        >
                            try again
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    // Main signin form
    return (
        <div className='h-screen w-full flex items-center'>
            <div className='h-full w-full px-6 flex flex-col justify-center text-zinc-800 gap-4 max-w-md mx-auto'>

                {/* Header section */}
                <div className='flex flex-col gap-2 pb-3'>
                    <h1 className='font-bold text-3xl'>
                        Login to your account
                    </h1>
                    <p className='text-sm flex gap-1'>
                        Don't have an account?
                        {/* Link to signup page */}
                        <a
                            className='text-blue-500 cursor-pointer hover:text-blue-700 underline'
                            onClick={() => router.push('signup')}
                        >
                            Sign Up
                        </a>
                    </p>
                </div>

                {/* Google sign-in button */}
                <button
                    className='w-full flex items-center gap-2 justify-center p-2 border border-zinc-300 rounded-md text-base mb-4 cursor-pointer hover:bg-zinc-100 hover:border-zinc-500'
                    onClick={() => signIn('google', {
                        callbackUrl: '/dashboard/links' // redirect after Google sign-in
                    })}
                >
                    <img
                        src="https://cdn-icons-png.flaticon.com/128/281/281764.png"
                        alt="Google Icon"
                        className="w-4 h-4"
                    />
                    Continue with Google
                </button>

                {/* Divider with "OR" text */}
                <div className='flex gap-2 items-center'>
                    <div className='h-[0.5px] w-full bg-zinc-600' />
                    OR
                    <div className='h-[0.5px] w-full bg-zinc-600' />
                </div>

                {/* Email & Password form */}
                <div className="flex justify-center items-center">
                    <div className="w-full">
                        <h3 className="font-semibold text-base mb-1 text-left">
                            Email
                        </h3>
                        <input
                            className="w-full p-2 border border-zinc-300 rounded-md text-base focus:outline-none focus:border-zinc-500 mb-4"
                            name='email'
                            type="email"
                            value={form.email}
                            onChange={handleChange} // update email state on change
                            placeholder="Enter your email"
                        />

                        <div className="flex items-center justify-between mb-1">
                            <h3 className="font-semibold text-base text-left">Password</h3>
                            <button
                                type="button"
                                onClick={() => setShowForgotPassword(true)}
                                className="text-sm text-blue-500 hover:text-blue-700 underline"
                            >
                                Forgot password?
                            </button>
                        </div>

                        <div className="relative">
                            <input
                                className="w-full p-2 pr-10 border border-zinc-300 rounded-md text-base focus:outline-none focus:border-zinc-500 mb-2"
                                name='password'
                                type={showPassword ? "text" : "password"}
                                value={form.password}
                                onChange={handleChange}
                                placeholder="Enter your password"
                                required
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 top-2.5 text-zinc-400 hover:text-zinc-700 transition-colors"
                            >
                                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                            </button>
                        </div>

                        {/* Display error message if sign-in fails */}
                        {error && (
                            <div className='flex items-start gap-1 text-red-500 text-sm transition-colors py-2 pb-3'>
                                <CircleAlert size={16} className='mt-1' />
                                {error}
                            </div>
                        )}

                        {/* Display success message */}
                        {success && (
                            <div className='flex items-start gap-1 text-green-500 text-sm transition-colors py-2 pb-3'>
                                <CheckCircle size={16} className='mt-1' />
                                {success}
                            </div>
                        )}

                        {/* Sign-in button triggers handleSignIn */}
                        <button
                            type="button"
                            onClick={handleSignIn}
                            disabled={!form.password || !form.email}
                            className={`w-full px-4 py-2 mt-2 rounded-md cursor-pointer transition-colors ${form.password && form.email
                                    ? 'bg-blue-600 text-white hover:bg-blue-700'
                                    : 'bg-zinc-300 text-zinc-500 cursor-not-allowed'
                                }`}
                        >
                            Sign In
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SigninPage;