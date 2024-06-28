import { MouseEvent, ReactNode } from 'react';
import clsx from 'clsx';
import { FiLoader } from "react-icons/fi";

interface IButton2 {
    type?: "primary" | "ghost" | "secondary" | "default",
    text: string,
    isDisabled?: boolean,
    isLoading?: boolean,
    icon?: ReactNode,
    onClick?: (event: MouseEvent<HTMLButtonElement>) => void
}

const Button2 = ({
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
        secondary: 'bg-primary-500 opacity-65 text-white',
        default: "text-gray-400 border border-gray-400"
    };
    const loadingIcon = isLoading ? <span className="loader mr-2"><FiLoader /></span> : null;

    return (
        <button
            onClick={onClick}
            className={clsx(
                'px-[14px] py-2 rounded-[8px] text-sm hover:opacity-80 font-semibold flex items-center justify-center',
                typeClass[type],
                { 'opacity-50 cursor-not-allowed': isDisabled }
            )}
        >
            {isLoading ? loadingIcon : icon && <span className="mr-1">{icon}</span>}
            {text}
        </button>
    );
};

export default Button2;
