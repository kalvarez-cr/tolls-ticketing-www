import { TIconProps } from './TIconProps'
export default function AccountCircle({ className = '' }: TIconProps) {
    return (
        <svg
            width="40"
            height="40"
            viewBox="0 0 40 40"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path d="M6.66667 9.99996H36.6667V6.66663H6.66667C4.83333 6.66663 3.33333 8.16663 3.33333 9.99996V28.3333H0V33.3333H23.3333V28.3333H6.66667V9.99996ZM38.3333 13.3333H28.3333C27.4167 13.3333 26.6667 14.0833 26.6667 15V31.6666C26.6667 32.5833 27.4167 33.3333 28.3333 33.3333H38.3333C39.25 33.3333 40 32.5833 40 31.6666V15C40 14.0833 39.25 13.3333 38.3333 13.3333ZM36.6667 28.3333H30V16.6666H36.6667V28.3333Z" />
        </svg>
    )
}
