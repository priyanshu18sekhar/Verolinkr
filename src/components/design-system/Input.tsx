import { InputHTMLAttributes, forwardRef, ReactNode } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  hint?: string;
  icon?: ReactNode;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, hint, icon, className = '', ...props }, ref) => {
    return (
      <div className="w-full">
        {label && (
          <label
            htmlFor={props.id}
            className="block text-sm font-bold text-gray-900 mb-2"
          >
            {label}
          </label>
        )}
        <div className="relative">
          {icon && (
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
              {icon}
            </div>
          )}
          <input
            suppressHydrationWarning
            ref={ref}
            className={`
              w-full py-4 text-lg
              border-2 rounded-xl
              transition-all duration-200
              focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent
              disabled:opacity-50 disabled:cursor-not-allowed
              ${icon ? 'pl-12 pr-6' : 'px-6'}
              ${
                error
                  ? 'border-red-500'
                  : 'border-gray-200 hover:border-black'
              }
              ${className}
            `}
            {...props}
          />
        </div>
        {error && (
          <p className="mt-2 text-sm font-medium text-red-600">{error}</p>
        )}
        {hint && !error && (
          <p className="mt-2 text-sm text-gray-600">{hint}</p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';

export default Input;

