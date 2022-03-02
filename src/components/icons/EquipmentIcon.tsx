import { TIconProps } from './TIconProps'

export default function LogoLight({ className = '' }: TIconProps) {
    return (
        <svg
            width="22"
            height="18"
            viewBox="0 0 22 18"
            fill="none"
            // xmlns="http://www.w3.org/2000/svg"
            className={className}
        >
            <path
                d="M20 7H11.99V4L8 8L11.99 12V9H20V14H2V2H20V5H22V2C22 0.9 21.1 0 20 0H2C0.9 0 0 0.9 0 2V14C0 15.1 0.9 16 2 16H7V18H15V16H20C21.1 16 21.99 15.1 21.99 14V9H22C22 7.9 21.1 7 20 7Z"
                fill="#2196F3"
            />
        </svg>
    )
}
