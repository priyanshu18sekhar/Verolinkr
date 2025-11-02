import { InputHTMLAttributes, forwardRef } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  hint?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, hint, className = '', ...props }, ref) => {
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
        <input
          ref={ref}
          className={`
            w-full px-6 py-4 text-lg
            border-2 rounded-xl
            transition-all duration-200
            focus:outline-none
            disabled:opacity-50 disabled:cursor-not-allowed
            ${
              error
                ? 'border-red-500 focus:border-red-600'
                : 'border-gray-300 focus:border-black'
            }
            ${className}
          `}
          {...props}
        />
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

