import { ReactNode } from 'react';
import clsx from 'clsx';

interface IButton2 {
    type?: "primary" | "ghost" | "secondary"
    text: string,
    isDisabled?: boolean,
    isLoading?: boolean,
    icon?: ReactNode,
    onClick?: () => void
}

const Button = ({
    type = "primary",
    text,
    isDisabled = false,
    isLoading = false,
    icon,
    onClick
}: IButton2) => {
    const typeClass = {
        primary: 'bg-primary-500 text-white',
        ghost: ' text-primary-500 bg-primary-50',
        secondary: 'text-gray-400 border border-gray-400',
    };

    return (
        <button
            onClick={() => {
                if (onClick && !isDisabled && !isLoading) onClick()
            }}
            className={clsx(
                'px-[14px] py-[10px] rounded-[8px] text-m-semibold  flex items-center justify-center gap-1',
                typeClass[type],
                {
                    'opacity-65 cursor-not-allowed': isDisabled || isLoading,
                    'hover:opacity-80': !isDisabled && !isLoading
                }
            )}
            disabled={isDisabled || isLoading}
        >
            {isLoading ?
                <div className="border-gray-300 h-4 w-4 animate-spin rounded-full border-2 border-t-black-500" /> : icon
            }
            {text}
        </button>
    );
};

export default Button;
