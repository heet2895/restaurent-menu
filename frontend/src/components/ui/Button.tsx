import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline';
}

export const Button: React.FC<ButtonProps> = ({ variant = 'primary', children, className = '', ...props }) => {
  const baseStyle = "px-4 py-2 rounded font-medium transition-colors focus:outline-none focus:ring-2";
  const variants = {
    primary: "bg-primary text-white hover:bg-opacity-90 focus:ring-primary",
    secondary: "bg-accent text-white hover:bg-opacity-90 focus:ring-accent",
    outline: "border-2 border-primary text-primary hover:bg-gray-50 focus:ring-primary",
  };

  return (
    <button className={`${baseStyle} ${variants[variant]} ${className}`} {...props}>
      {children}
    </button>
  );
};
