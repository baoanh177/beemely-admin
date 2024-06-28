import { ReactNode } from 'react';
import clsx from 'clsx';
import { FiLoader } from "react-icons/fi";

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
                if (onClick && !isDisabled) onClick()
            }}
            className={clsx(
                'px-[14px] py-[10px] rounded-[8px] text-m-semibold hover:opacity-80 flex items-center justify-center gap-1',
                typeClass[type],
                { 'opacity-0.65 cursor-not-allowed': isDisabled }
            )}
        >
            {isLoading ? <FiLoader /> : icon}
            {text}
        </button>
    );
};

export default Button;
