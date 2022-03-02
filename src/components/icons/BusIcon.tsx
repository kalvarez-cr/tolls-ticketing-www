import { TIconProps } from './TIconProps'

export default function LogoLight({ className = '' }: TIconProps) {
    return (
        <svg
            className={className}
            height={16}
            viewBox="0 0 383.33 296.97"
            style={{
                cursor: 'pointer',
                transform: `translate(${-16 / 2}px,${-16}px)`,
            }}
            fill="currentColor"
            stroke="currentColor"
        >
            <path
                d="M151.73,208.26A39.48,39.48,0,0,0,165,237.62v23.55a13.26,13.26,0,0,0,13.22,13.22h13.23a13.27,13.27,0,0,0,
    13.23-13.22V247.94H310.45v13.23a13.26,13.26,0,0,0,13.22,13.22H336.9a13.26,13.26,0,0,0,13.23-13.22V237.62a39.47,39.47,0,0,0,
    13.22-29.36V76c0-46.3-47.35-52.91-105.81-52.91S151.73,29.7,151.73,76ZM198,221.49a19.84,19.84,0,1,1,19.84-19.84A19.81,19.81,0,0,1,198,221.49Zm119,
    0a19.84,19.84,0,1,1,19.84-19.84A19.81,19.81,0,0,1,317.06,221.49Zm19.84-79.36H178.18V76H336.9Z"
            />
        </svg>
    )
}
