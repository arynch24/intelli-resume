'use client';

import { useEffect, useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import OTPVerification from '@/components/auth/OTPVerification'; // Adjust path as needed

const VerifyEmail = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [email, setEmail] = useState<string>('');

    useEffect(() => {
        const emailParam = searchParams.get('email');

        if (!emailParam) {
            router.push('/signup');
            return;
        }

        setEmail(decodeURIComponent(emailParam));
    }, [searchParams, router]);

    if (!email) {
        return (
            <div className='h-screen w-full flex items-center justify-center'>
                <div className='text-zinc-600'>Loading...</div>
            </div>
        );
    }

    return <OTPVerification email={email} />;
};

const VerifyEmailPage = () => {
    return (
        <Suspense fallback={<div className="h-screen w-full flex items-center justify-center text-zinc-600">Loading...</div>}>
            <VerifyEmail />
        </Suspense>
    );
};

export default VerifyEmailPage;
