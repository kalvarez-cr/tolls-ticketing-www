import { TIconProps } from './TIconProps'
export default function AccountCircle({ className = '' }: TIconProps) {
    return (
        <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                d="M8.25 18.25H5.75V9.5H8.25V18.25ZM13.25 18.25H10.75V5.75H13.25V18.25ZM18.25 18.25H15.75V13.25H18.25V18.25ZM21.375 20.875H2.625V3.25H21.375V20.875ZM21.375 0.75H2.625C1.25 0.75 0.125 1.875 0.125 3.25V20.75C0.125 22.125 1.25 23.25 2.625 23.25H21.375C22.75 23.25 23.875 22.125 23.875 20.75V3.25C23.875 1.875 22.75 0.75 21.375 0.75Z"
                fill="#9E9E9E"
            />
        </svg>
    )
}
