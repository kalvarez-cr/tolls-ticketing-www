import { ReactNode } from 'react'

// material-ui
import { useTheme } from '@material-ui/core/styles'
import {
    Card,
    CardContent,
    CardHeader,
    Divider,
    Typography,
} from '@material-ui/core'

export interface SubCardProps {
    children: ReactNode | string | null
    content?: boolean
    className?: string
    contentClass?: string
    darkTitle?: boolean
    secondary?: ReactNode | string | {}
    sx?: {}
    title?: ReactNode | string | {}
}

// ==============================|| CUSTOM SUB CARD ||============================== //

const SubCard = ({
    children,
    className,
    content,
    contentClass,
    darkTitle,
    secondary,
    sx = {},
    title,
    ...others
}: SubCardProps) => {
    const theme = useTheme()

    return (
        <Card
            sx={{
                border: '1px solid',
                borderColor:
                    theme.palette.mode === 'dark'
                        ? theme.palette.dark.light + 15
                        : theme.palette.primary.light,
                ':hover': {
                    boxShadow:
                        theme.palette.mode === 'dark'
                            ? '0 2px 14px 0 rgb(33 150 243 / 10%)'
                            : '0 2px 14px 0 rgb(32 40 45 / 8%)',
                },
                ...sx,
            }}
            {...others}
        >
            {/* card header and action */}
            {!darkTitle && title && (
                <CardHeader
                    sx={{ p: 1.2 }}
                    title={<Typography variant="h5">{title}</Typography>}
                    action={secondary}
                />
            )}
            {darkTitle && title && (
                <CardHeader
                    sx={{ p: 1.2 }}
                    title={<Typography variant="h4">{title}</Typography>}
                    action={secondary}
                />
            )}

            {/* content & header divider */}
            {title && (
                <Divider
                    sx={{
                        opacity: 1,
                        borderColor:
                            theme.palette.mode === 'dark'
                                ? theme.palette.dark.light + 15
                                : theme.palette.primary.light,
                    }}
                />
            )}

            {/* card content */}
            {content && (
                <CardContent sx={{ p: 0 }} className={contentClass || ''}>
                    {children}
                </CardContent>
            )}
            {!content && children}
        </Card>
    )
}

SubCard.defaultProps = {
    content: true,
}

export default SubCard
