'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import OTPVerification from '@/components/auth/OTPVerification'; // Adjust path as needed

const VerifyEmailPage = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [email, setEmail] = useState<string>('');

    useEffect(() => {
        // Get email from URL parameters
        const emailParam = searchParams.get('email');
        
        if (!emailParam) {
            // If no email parameter, redirect back to signup
            router.push('/signup');
            return;
        }

        setEmail(decodeURIComponent(emailParam));
    }, [searchParams, router]);

    // Don't render component until we have the email
    if (!email) {
        return (
            <div className='h-screen w-full flex items-center justify-center'>
                <div className='text-zinc-600'>Loading...</div>
            </div>
        );
    }

    return <OTPVerification email={email} />;
};

export default VerifyEmailPage;