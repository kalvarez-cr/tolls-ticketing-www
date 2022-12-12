import React from 'react'

// material-ui
import { makeStyles } from '@material-ui/styles'
import { useTheme, Theme } from '@material-ui/core/styles'
import MuiAccordion from '@material-ui/core/Accordion'
import MuiAccordionDetails from '@material-ui/core/AccordionDetails'
import MuiAccordionSummary from '@material-ui/core/AccordionSummary'

// assets
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'

// style constant
const useStyles = makeStyles((theme: Theme) => ({
    root: {
        width: '100%',
    },
    heading: {
        fontSize: theme.typography?.pxToRem(15)!,
        fontWeight: theme.typography?.fontWeightRegular!,
    },
}))

// ==============================|| ACCORDION ||============================== //

export interface accordionProps {
    children: any
    defaultExpandedId?: string | boolean | null
    expandIcon?: React.ReactElement
    square?: boolean
    toggle?: boolean
    title?: string
}

const Collapse = ({
    children,
    defaultExpandedId = null,
    expandIcon,
    square,
    toggle,
    title,
}: accordionProps) => {
    const classes = useStyles()
    const theme = useTheme()

    const [expanded, setExpanded] = React.useState<string | boolean | null>(
        null
    )
    console.log(expanded)
    const handleChange =
        (panel: string) =>
        (event: React.SyntheticEvent<Element, Event>, newExpanded: boolean) => {
            toggle && setExpanded(newExpanded ? panel : false)
        }

    React.useEffect(() => {
        setExpanded(defaultExpandedId)
    }, [defaultExpandedId])

    return (
        <div className={classes.root}>
            <MuiAccordion square={square} onChange={handleChange('1')}>
                <MuiAccordionSummary
                    expandIcon={
                        expandIcon || expandIcon === false ? (
                            expandIcon
                        ) : (
                            <ExpandMoreIcon />
                        )
                    }
                    sx={{
                        color:
                            theme.palette.mode === 'dark'
                                ? 'grey.500'
                                : 'grey.800',
                        fontWeight: 500,
                    }}
                >
                    {title}
                </MuiAccordionSummary>
                <MuiAccordionDetails>{children}</MuiAccordionDetails>
            </MuiAccordion>
        </div>
    )
}

export default Collapse
