import { ReactNode } from 'react';
import clsx from 'clsx';

export interface IButtonProps {
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
}: IButtonProps) => {
    const typeClass = {
        primary: 'bg-primary-500 text-white',
        ghost: ' text-primary-500 bg-primary-50',
        secondary: 'text-gray-400 border border-gray-400',
    };

    const typeLoading = {
        primary: 'border-white border-t-primary-500',
        ghost: 'border-primary-500 border-t-primary-50',
        secondary: 'border-gray-400 border-t-white',
    };

    return (
        <button
            onClick={() => {
                if (onClick && !isDisabled && !isLoading) onClick()
            }}
            className={clsx(
                'px-[14px] py-[10px] rounded-[8px] text-m-semibold transition-colors  flex items-center justify-center gap-1',
                typeClass[type],
                {
                    'opacity-65 cursor-not-allowed': isDisabled,
                    'opacity-65': isLoading,
                    'hover:opacity-80': !isDisabled && !isLoading
                }
            )}
        >
            {isLoading ?
                <div className={clsx(`${typeLoading[type]} h-4 w-4 animate-spin rounded-full border-2 `)} /> : icon
            }
            {text}
        </button>
    );
};

export default Button;
