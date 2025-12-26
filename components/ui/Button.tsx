import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary';
    children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({ children, variant = 'primary', className = '', ...props }) => {
    if (variant === 'primary') {
        return (
            <button 
                className={`relative group flex items-center justify-center gap-2 px-8 py-3.5 font-semibold rounded-full transition-all duration-300 tracking-tight text-xs shadow-[0_0_20px_-5px_rgba(251,191,36,0.6)] hover:shadow-[0_0_30px_-5px_rgba(251,191,36,0.8)] hover:scale-[1.02] active:scale-[0.98] ${className}`} 
                style={{ background: 'linear-gradient(180deg, #FFD573 0%, #FFB224 100%)', color: '#1a1a1a' }}
                {...props}
            >
                <span className="relative z-10 flex items-center gap-2">{children}</span>
            </button>
        );
    }
    return (
        <button 
            className={`group flex items-center justify-center gap-2 px-8 py-3.5 text-neutral-300 font-medium rounded-full border border-white/10 bg-white/5 hover:bg-white/10 hover:border-white/20 hover:text-white transition-all duration-300 tracking-tight text-xs backdrop-blur-sm ${className}`}
            {...props}
        >
            {children}
        </button>
    );
};