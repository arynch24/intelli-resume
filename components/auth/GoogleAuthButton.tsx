"use client";
import { useEffect, useState, useRef, useCallback } from "react";
import { useRouter } from "next/navigation";

interface GoogleCredentialResponse {
  credential: string;
  select_by: string;
}

interface GoogleLoginProps {
  onSuccess?: (data: Record<string, unknown>) => void;
  onError?: (error: string) => void;
  apiEndpoint?: string;
  className?: string;
  theme?: "outline" | "filled_blue" | "filled_black";
  size?: "large" | "medium" | "small";
  shape?: "rectangular" | "pill" | "circle" | "square";
}

declare global {
  interface Window {
    google: {
      accounts: {
        id: {
          initialize: (config: Record<string, unknown>) => void;
          renderButton: (element: HTMLElement, config: Record<string, unknown>) => void;
          prompt: () => void;
        };
      };
    };
  }
}

export default function GoogleLogin({
  onSuccess,
  onError,
  apiEndpoint = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/google`,
  className = "",
  theme = "outline",
  size = "large",
  shape = "rectangular"
}: GoogleLoginProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [isGoogleLoaded, setIsGoogleLoaded] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const buttonRef = useRef<HTMLDivElement>(null);

  const router = useRouter();

  const handleCredentialResponse = useCallback(async (response: GoogleCredentialResponse) => {
    if (!response.credential) {
      const errorMsg = "No credential received from Google";
      setError(errorMsg);
      onError?.(errorMsg);
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const res = await fetch(apiEndpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ idToken: response.credential }),
        credentials: "include",
      });

      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }

      const data = await res.json();

      if (data.error) {
        throw new Error(data.error);
      }

      console.log("Login success:", data);
      onSuccess?.(data);

      router.push("/dashboard");
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : "Login failed";
      console.error("Login failed:", err);
      setError(errorMsg);
      onError?.(errorMsg);
    } finally {
      setIsLoading(false);
    }
  }, [apiEndpoint, onSuccess, onError, router]);

  // Load Google Identity Services script
  useEffect(() => {
    const loadGoogleScript = () => {
      if (window.google?.accounts?.id) {
        setIsGoogleLoaded(true);
        return;
      }

      const script = document.createElement('script');
      script.src = 'https://accounts.google.com/gsi/client';
      script.async = true;
      script.defer = true;
      script.onload = () => setIsGoogleLoaded(true);
      script.onerror = () => {
        const errorMsg = "Failed to load Google Sign-In script";
        setError(errorMsg);
        onError?.(errorMsg);
      };
      document.head.appendChild(script);
    };

    loadGoogleScript();
  }, [onError]);

  // Initialize Google Sign-In
  useEffect(() => {
    if (!isGoogleLoaded || !buttonRef.current) return;

    const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;

    if (!clientId) {
      const errorMsg = "Google Client ID is not configured";
      setError(errorMsg);
      onError?.(errorMsg);
      return;
    }

    try {
      window.google.accounts.id.initialize({
        client_id: clientId,
        callback: handleCredentialResponse,
        auto_select: false,
        cancel_on_tap_outside: true,
      });

      window.google.accounts.id.renderButton(buttonRef.current, {
        theme,
        size,
        shape,
        width: 400,
        logo_alignment: "left",
        text: "signin_with",
      });

      setError(null);
    } catch {
      const errorMsg = "Failed to initialize Google Sign-In";
      setError(errorMsg);
      onError?.(errorMsg);
    }
  }, [isGoogleLoaded, theme, size, shape, onError, handleCredentialResponse]);

  if (error) {
    return (
      <div className={`google-login-error ${className}`}>
        <div className="error-message text-red-600 text-sm mb-2">
          {error}
        </div>
        <button
          onClick={() => window.location.reload()}
          className="text-blue-600 text-sm underline hover:no-underline"
        >
          Retry
        </button>
      </div>
    );
  }

  if (!isGoogleLoaded) {
    return (
      <div className={`google-login-loading ${className}`}>
        <div className="loading-placeholder bg-gray-200 animate-pulse rounded-md h-10 w-full flex items-center justify-center">
          <span className="text-gray-500 text-sm">Loading Google Sign-In...</span>
        </div>
      </div>
    );
  }

  return (
    <div className={`google-login-container w-full ${className}`}>
      <div
        ref={buttonRef}
        className={`google-signin-button w-full ${isLoading ? 'opacity-50 pointer-events-none' : ''}`}
      />
      {isLoading && (
        <div className="loading-overlay mt-2 text-center">
          <span className="text-sm text-gray-600">Signing in...</span>
        </div>
      )}
    </div>
  );
}