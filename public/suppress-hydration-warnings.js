/**
 * Global console error suppression for browser extension hydration warnings
 * This script loads BEFORE React and intercepts console.error to filter out
 * warnings caused by browser extensions adding attributes like fdprocessedid
 */
(function () {
    if (typeof window === 'undefined') return;

    const originalError = console.error;
    const originalWarn = console.warn;

    console.error = function (...args) {
        const message = args[0];
        if (typeof message === 'string') {
            // Suppress hydration warnings from browser extensions
            if (
                message.includes('fdprocessedid') ||
                message.includes('data-new-gr-c-s-check-loaded') ||
                message.includes('data-gr-ext-installed') ||
                (message.includes('A tree hydrated but some attributes') &&
                    JSON.stringify(args).includes('fdprocessedid')) ||
                message.includes('Cross-Origin-Opener-Policy policy would block')
            ) {
                return; // Don't log
            }
        }
        originalError.apply(console, args);
    };

    console.warn = function (...args) {
        const message = args[0];
        if (typeof message === 'string' && message.includes('Cross-Origin-Opener-Policy')) {
            return; // Don't log
        }
        originalWarn.apply(console, args);
    };
})();
