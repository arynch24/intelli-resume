'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';
import { CircleAlert, Check, X, Eye, EyeOff } from 'lucide-react';
import axios from 'axios';

const SignupPage = () => {
    // Using Next.js router for navigation
    const router = useRouter();

    // State to hold form data and error messages
    const [form, setForm] = useState({ name: '', email: '', password: '' });

    // State to hold any error messages from the signup process
    const [error, setError] = useState('');

    // State for password visibility toggle
    const [showPassword, setShowPassword] = useState(false);

    // State to manage loading state during signup
    const [loading, setLoading] = useState(false);

    // Password strength validation function
    const validatePasswordStrength = (password: any) => {
        const requirements = {
            minLength: password.length >= 8,
            hasUppercase: /[A-Z]/.test(password),
            hasLowercase: /[a-z]/.test(password),
            hasNumber: /\d/.test(password),
            hasSpecialChar: /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password),
        };

        const score = Object.values(requirements).filter(Boolean).length;

        return {
            requirements,
            score,
            isStrong: score >= 4 && requirements.minLength
        };
    };

    // Get password strength info
    const passwordStrength = validatePasswordStrength(form.password);

    // Function to get strength label and color
    const getStrengthInfo = (score: number) => {
        if (score === 0) return { label: '', color: '' };
        if (score <= 2) return { label: 'Weak', color: 'text-red-500' };
        if (score <= 3) return { label: 'Fair', color: 'text-yellow-500' };
        if (score <= 4) return { label: 'Good', color: 'text-blue-500' };
        return { label: 'Strong', color: 'text-green-500' };
    };

    const strengthInfo = getStrengthInfo(passwordStrength.score);

    // Function to handle input changes and update form state
    const handleChange = (e: any) => {
        setForm({ ...form, [e.target.name]: e.target.value });
        // Clear error when user starts typing
        if (error) setError('');
    };

    // Function to handle form submission for signup
    const handleSignUp = async (e: any) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        // Validate email
        if (!form.email || !form.email.includes('@')) {
            setError('Please enter a valid email address');
            return;
        }

        // Validate password strength
        if (!passwordStrength.isStrong) {
            setError('Please create a stronger password that meets all requirements');
            return;
        }

        // Check if name is provided
        if (!form.name || form.name.trim() === '') {
            setError('Please enter your name');
            return;
        }

        try {
            // Signup API request
            const res = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/signup`, {
                name: form.name,
                email: form.email,
                password: form.password,
            });

            if (res.status !== 201) {
                setError(res.data.message || 'Signup failed');
                return;
            }

            // Navigate to OTP verification page with email parameter
            router.push(`/verify-email?email=${encodeURIComponent(form.email)}`);

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

                {/* Header section with title and link to login */}
                <div className='flex flex-col gap-2 pb-3'>
                    <h1 className='font-bold text-3xl'>Create your account</h1>
                    <p className='text-sm flex gap-1'>
                        Already have an account?
                        <a className='text-blue-500 cursor-pointer hover:text-blue-700 underline' onClick={() => router.push('signin')}>Log in</a>
                    </p>
                </div>

                {/* Button to sign in with Google */}
                <button className='w-full flex items-center gap-2 justify-center p-2 border border-zinc-300 rounded-md text-base mb-4 cursor-pointer hover:bg-zinc-100 hover:border-zinc-500'
                    onClick={() => signIn('google', {
                        callbackUrl: '/dashboard/links'
                    })}>
                    <img src="https://cdn-icons-png.flaticon.com/128/281/281764.png" alt="Google Icon" className="w-4 h-4" />
                    Continue with Google
                </button>

                <div className='flex gap-2 items-center'>
                    <div className='h-[0.5px] w-full bg-zinc-600' />OR
                    <div className='h-[0.5px] w-full bg-zinc-600' />
                </div>

                {/* Form for email and password signup */}
                <form onSubmit={handleSignUp} className="w-full">
                    <h3 className="font-semibold text-base mb-1 text-left">
                        Name
                    </h3>
                    <input
                        className="w-full p-2 border border-zinc-300 rounded-md text-base focus:outline-none focus:border-zinc-500 mb-4"
                        name='name'
                        type="text"
                        placeholder='Enter your name'
                        value={form.name || ''}
                        onChange={handleChange}
                        required
                    />
                    <h3 className="font-semibold text-base mb-1 text-left">
                        Email
                    </h3>
                    <input
                        className="w-full p-2 border border-zinc-300 rounded-md text-base focus:outline-none focus:border-zinc-500 mb-4"
                        name='email'
                        type="email"
                        placeholder='Enter your email'
                        value={form.email}
                        onChange={handleChange}
                        required
                    />

                    <h3 className="font-semibold text-base mb-1 text-left">Password</h3>
                    <div className="relative ">
                        <input
                            className="w-full p-2 pr-10 border border-zinc-300 rounded-md text-base focus:outline-none focus:border-zinc-500 mb-2"
                            name='password'
                            type={showPassword ? "text" : "password"}
                            placeholder='Enter your password'
                            value={form.password}
                            onChange={handleChange}
                            required
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-3 text-zinc-400 hover:text-zinc-700"
                        >
                            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                        </button>
                    </div>

                    {/* Password strength indicator */}
                    {form.password && (
                        <div className="mb-4">
                            {/* Strength bar */}
                            <div className="flex gap-1 mb-2">
                                {[1, 2, 3, 4, 5].map((level) => (
                                    <div
                                        key={level}
                                        className={`h-2 flex-1 rounded ${level <= passwordStrength.score
                                            ? passwordStrength.score <= 2
                                                ? 'bg-red-500'
                                                : passwordStrength.score <= 3
                                                    ? 'bg-yellow-500'
                                                    : passwordStrength.score <= 4
                                                        ? 'bg-blue-500'
                                                        : 'bg-green-500'
                                            : 'bg-zinc-200'
                                            }`}
                                    />
                                ))}
                            </div>

                            {/* Strength label */}
                            {strengthInfo.label && (
                                <p className={`text-sm font-medium ${strengthInfo.color} mb-2`}>
                                    Password strength: {strengthInfo.label}
                                </p>
                            )}

                            {/* Requirements checklist */}
                            <div className="text-xs space-y-1">
                                <div className={`flex items-center gap-2 ${passwordStrength.requirements.minLength ? 'text-green-600' : 'text-zinc-500'}`}>
                                    {passwordStrength.requirements.minLength ? <Check size={14} /> : <X size={14} />}
                                    At least 8 characters
                                </div>
                                <div className={`flex items-center gap-2 ${passwordStrength.requirements.hasUppercase ? 'text-green-600' : 'text-zinc-500'}`}>
                                    {passwordStrength.requirements.hasUppercase ? <Check size={14} /> : <X size={14} />}
                                    One uppercase letter
                                </div>
                                <div className={`flex items-center gap-2 ${passwordStrength.requirements.hasLowercase ? 'text-green-600' : 'text-zinc-500'}`}>
                                    {passwordStrength.requirements.hasLowercase ? <Check size={14} /> : <X size={14} />}
                                    One lowercase letter
                                </div>
                                <div className={`flex items-center gap-2 ${passwordStrength.requirements.hasNumber ? 'text-green-600' : 'text-zinc-500'}`}>
                                    {passwordStrength.requirements.hasNumber ? <Check size={14} /> : <X size={14} />}
                                    One number
                                </div>
                                <div className={`flex items-center gap-2 ${passwordStrength.requirements.hasSpecialChar ? 'text-green-600' : 'text-zinc-500'}`}>
                                    {passwordStrength.requirements.hasSpecialChar ? <Check size={14} /> : <X size={14} />}
                                    One special character
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Display error message if signup fails */}
                    {error && (
                        <div className='flex items-center gap-1 text-red-500 text-sm transition-colors py-2 pb-3'>
                            <CircleAlert size={16} className='flex items-center' />
                            <p>{error}</p>
                        </div>
                    )}

                    {/* Submit button for the signup form */}
                    <button
                        type="submit"
                        disabled={!passwordStrength.isStrong || !form.email || loading}
                        className={`w-full px-4 py-2 mt-3 rounded-md cursor-pointer transition-colors ${passwordStrength.isStrong && form.email
                            ? 'bg-blue-600 text-white hover:bg-blue-700'
                            : 'bg-zinc-300 text-zinc-500 cursor-not-allowed'
                            }`}
                    >
                        {loading ? 'Signing up...' : 'Sign Up'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default SignupPage;