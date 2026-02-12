import { useEffect } from 'react';

/**
 * Suppresses specific hydration warnings caused by browser extensions
 * that add attributes like fdprocessedid, data-new-gr-c-s-check-loaded, etc.
 */
export function useSuppressHydrationWarning() {
    useEffect(() => {
        // Only run on client
        if (typeof window === 'undefined') return;

        // Store the original console.error
        const originalError = console.error;

        // Override console.error to filter out hydration warnings
        console.error = (...args: any[]) => {
            // Check if this is a hydration warning we want to suppress
            const message = args[0];
            if (typeof message === 'string') {
                // Suppress warnings about browser extension attributes
                if (
                    message.includes('fdprocessedid') ||
                    message.includes('data-new-gr-c-s-check-loaded') ||
                    message.includes('data-gr-ext-installed') ||
                    (message.includes('A tree hydrated but some attributes') &&
                        args.join(' ').includes('fdprocessedid'))
                ) {
                    return; // Don't log this error
                }
            }

            // Call the original console.error for other errors
            originalError.apply(console, args);
        };

        // Cleanup: restore original console.error on unmount
        return () => {
            console.error = originalError;
        };
    }, []);
}
