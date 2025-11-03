'use client';

import { useState, InputHTMLAttributes, forwardRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface GlassInputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
  label?: string;
  error?: string;
  helperText?: string;
  size?: 'sm' | 'md' | 'lg';
  floatingLabel?: boolean;
}

const GlassInput = forwardRef<HTMLInputElement, GlassInputProps>(
  (
    {
      label,
      error,
      helperText,
      size = 'md',
      floatingLabel = false,
      className = '',
      ...props
    },
    ref
  ) => {
    const [isFocused, setIsFocused] = useState(false);
    const [hasValue, setHasValue] = useState(!!props.value || !!props.defaultValue);

    const sizeStyles = {
      sm: 'px-4 py-2 text-sm',
      md: 'px-5 py-3 text-base',
      lg: 'px-6 py-4 text-lg',
    };

    const baseStyles = `
      w-full rounded-2xl 
      bg-white/10 backdrop-blur-xl 
      border border-white/20 
      text-gray-900 placeholder-gray-400
      transition-all duration-300
      focus:outline-none focus:ring-2 focus:ring-white/30
      focus:border-white/40 focus:bg-white/15
      ${error ? 'border-red-400/50 focus:ring-red-400/30' : ''}
      ${sizeStyles[size]}
      ${className}
    `;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setHasValue(!!e.target.value);
      props.onChange?.(e);
    };

    const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
      setIsFocused(true);
      props.onFocus?.(e);
    };

    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
      setIsFocused(false);
      props.onBlur?.(e);
    };

    if (floatingLabel) {
      return (
        <div className="relative">
          <motion.div
            className="relative"
            animate={{
              scale: isFocused || hasValue ? 0.9 : 1,
              y: isFocused || hasValue ? -8 : 0,
            }}
            transition={{ duration: 0.2 }}
          >
            <motion.label
              className={`absolute left-5 pointer-events-none transition-colors duration-300 ${
                isFocused || hasValue
                  ? 'text-xs font-bold text-white'
                  : 'text-base text-gray-400'
              } ${error ? 'text-red-400' : ''}`}
              style={{
                top: isFocused || hasValue ? '12px' : '50%',
                transform: isFocused || hasValue ? 'translateY(-50%)' : 'translateY(-50%)',
              }}
            >
              {label}
            </motion.label>
            <input
              {...props}
              ref={ref}
              className={baseStyles}
              onFocus={handleFocus}
              onBlur={handleBlur}
              onChange={handleChange}
              placeholder={isFocused ? props.placeholder : ''}
            />
          </motion.div>
          
          <AnimatePresence>
            {error && (
              <motion.p
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="mt-2 text-sm text-red-400"
              >
                {error}
              </motion.p>
            )}
          </AnimatePresence>
          
          {helperText && !error && (
            <p className="mt-2 text-sm text-gray-400">{helperText}</p>
          )}
        </div>
      );
    }

    return (
      <div className="relative">
        {label && (
          <label className="block text-sm font-bold text-gray-700 mb-2">
            {label}
          </label>
        )}
        <div className="relative">
          {/* Glass focus glow */}
          <motion.div
            className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 opacity-0 blur-xl"
            animate={{
              opacity: isFocused ? 0.3 : 0,
            }}
            transition={{ duration: 0.3 }}
          />
          <input
            {...props}
            ref={ref}
            className={`relative z-10 ${baseStyles}`}
            onFocus={handleFocus}
            onBlur={handleBlur}
            onChange={handleChange}
          />
        </div>
        
        <AnimatePresence>
          {error && (
            <motion.p
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="mt-2 text-sm text-red-400"
            >
              {error}
            </motion.p>
          )}
        </AnimatePresence>
        
        {helperText && !error && (
          <p className="mt-2 text-sm text-gray-400">{helperText}</p>
        )}
      </div>
    );
  }
);

GlassInput.displayName = 'GlassInput';

export default GlassInput;


