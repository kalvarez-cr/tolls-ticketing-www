import { TIconProps } from './TIconProps'
export default function AccountCircle({ className = '' }: TIconProps) {
    return (
        <svg
            width="26"
            height="26"
            viewBox="0 0 26 26"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path d="M23 0.5H3C1.625 0.5 0.5 1.625 0.5 3V23C0.5 24.375 1.625 25.5 3 25.5H23C24.375 25.5 25.5 24.375 25.5 23V3C25.5 1.625 24.375 0.5 23 0.5ZM23 23H3V3H23V23ZM20.5 5.5H14.25C12.875 5.5 11.75 6.625 11.75 8V10.85C11 11.2875 10.5 12.075 10.5 13C10.5 14.375 11.625 15.5 13 15.5C14.375 15.5 15.5 14.375 15.5 13C15.5 12.075 15 11.275 14.25 10.85V8H18V18H8V8H10.5V5.5H5.5V20.5H20.5V5.5Z" />
        </svg>
    )
}
