import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary';
    children: React.ReactNode;
}

// Industrial buttons — square corners, mono uppercase. Primary is the one hazard accent allowed on a control (spec 6.3 amendment, 2026-08-19).
export const Button: React.FC<ButtonProps> = ({ children, variant = 'primary', className = '', ...props }) => {
    if (variant === 'primary') {
        return (
            <button
                className={`relative group flex items-center justify-center gap-2 px-7 py-3.5 font-mono font-bold uppercase tracking-[0.12em] text-[11px] rounded-sm bg-hazard text-charcoal border border-hazard hover:bg-paper hover:border-paper transition-colors duration-200 active:scale-[0.98] ${className}`}
                {...props}
            >
                <span className="relative z-10 flex items-center gap-2">{children}</span>
            </button>
        );
    }
    return (
        <button
            className={`group flex items-center justify-center gap-2 px-7 py-3.5 font-mono uppercase tracking-[0.12em] text-[11px] rounded-sm text-paper border border-paper/40 bg-transparent hover:border-paper hover:bg-paper/5 transition-colors duration-200 active:scale-[0.98] ${className}`}
            {...props}
        >
            {children}
        </button>
    );
};
