import { TIconProps } from './TIconProps'
export default function AccountCircle({ className = '' }: TIconProps) {
    return (
        <svg
            width="24"
            height="26"
            viewBox="0 0 24 26"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                d="M19.5 19.25H4.5V16.75H19.5V19.25ZM19.5 14.25H4.5V11.75H19.5V14.25ZM19.5 9.25H4.5V6.75H19.5V9.25ZM0.75 25.5L2.625 23.625L4.5 25.5L6.375 23.625L8.25 25.5L10.125 23.625L12 25.5L13.875 23.625L15.75 25.5L17.625 23.625L19.5 25.5L21.375 23.625L23.25 25.5V0.5L21.375 2.375L19.5 0.5L17.625 2.375L15.75 0.5L13.875 2.375L12 0.5L10.125 2.375L8.25 0.5L6.375 2.375L4.5 0.5L2.625 2.375L0.75 0.5V25.5Z"
                fill="#9E9E9E"
            />
        </svg>
    )
}
