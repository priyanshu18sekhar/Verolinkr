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
            className="block text-[12px] font-semibold uppercase tracking-[0.1em] mb-2"
            style={{ color: '#6b6a7b' }}
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
              w-full py-4 text-[15px] font-medium
              border rounded-xl bg-white/70
              transition-all duration-200
              focus:outline-none focus:ring-1 focus:ring-[#08080c] focus:border-[#08080c]
              disabled:opacity-40 disabled:cursor-not-allowed
              ${icon ? 'pl-12 pr-6' : 'px-5'}
              ${
                error
                  ? 'border-red-400 focus:ring-red-500 focus:border-red-500'
                  : 'border-[rgba(11,11,18,0.18)] hover:border-[rgba(11,11,18,0.38)]'
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

