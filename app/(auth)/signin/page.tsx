'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';
import axios from 'axios';
import { CircleAlert, Eye, EyeOff } from 'lucide-react';

const SigninPage = () => {
    const router = useRouter(); // Next.js router hook to navigate programmatically

    // State to hold email and password input values
    const [form, setForm] = useState({ email: '', password: '' });
    // State to hold any error message from sign-in process
    const [error, setError] = useState('');

    // State for password visibility toggle
    const [showPassword, setShowPassword] = useState(false);

    // State to manage loading state during sign-in
    const [loading, setLoading] = useState(false);

    // Updates form state whenever input changes
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
        // Clear errors when user starts typing
        if (error) setError('');
    };

    // Handles sign-in process using next-auth's credentials provider
    const handleSignIn = async () => {
        setError('');
        setLoading(true);

        // Validation to ensure email and password are provided
        if (!form.email || !form.password) {
            setError('Please fill in all fields');
            return;
        }

        try {
            const res = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/login`, {
                email: form.email,
                password: form.password,
            },{
                withCredentials: true, 
            });

            // If sign-in is successful, redirect
            if (res.status === 200) {
                router.push('/dashboard');
            }
        } catch (err: any) {
            console.error(err);
            setError(err.response?.data?.message || 'Something went wrong');
        } finally {

            setLoading(false);
        }
    };

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
                                onClick={() => router.push('/forgot-password')}
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
                            <div className='flex items-center gap-1 text-red-500 text-sm transition-colors py-2 pb-3'>
                                <CircleAlert size={16} className='flex items-center' />
                                <p>{error}</p>
                            </div>
                        )}

                        {/* Sign-in button triggers handleSignIn */}
                        <button
                            type="button"
                            onClick={handleSignIn}
                            disabled={!form.password || !form.email || loading}
                            className={`w-full px-4 py-2 mt-2 rounded-md cursor-pointer transition-colors ${form.password && form.email
                                ? 'bg-blue-600 text-white hover:bg-blue-700'
                                : 'bg-zinc-300 text-zinc-500 cursor-not-allowed'
                                }`}
                        >
                            {loading ? 'Signing in...' : 'Sign In'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SigninPage;