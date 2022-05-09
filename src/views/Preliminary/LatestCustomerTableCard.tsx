// material-ui
import { makeStyles } from '@material-ui/styles'
import {
    Button,
    CardActions,
    CardContent,
    Divider,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Theme,
} from '@material-ui/core'

// third party
import PerfectScrollbar from 'react-perfect-scrollbar'

// project imports
import MainCard from 'ui-component/cards/MainCard'

import { useNavigate, useLocation } from 'react-router'

// style constant
const useStyles = makeStyles((theme: Theme) => ({
    projectTableCard: {
        padding: '0px',
    },
    projectTableFooter: {
        justifyContent: 'flex-end',
    },
    imgFlag: {
        width: '30px',
        height: 'auto',
    },
    ScrollHeight: {
        height: '345px',
        padding: 0,
    },
}))

// table data
function createData(subject: string, dept: string, date: Date | string) {
    return { subject, dept, date }
}

const rows = [
    createData('Operador', 'empresa', '56.00'),
    createData('Operador', 'empresa', '25.23'),
    createData('Operador', 'empresa', '12.45'),
    createData('Operador', 'empresa', '8.65'),
    createData('Operador', 'empresa', '3.56'),
    createData('Operador', 'empresa', '12.45'),
    createData('Operador', 'empresa', '25.23'),
    createData('Operador', 'empresa', '12.45'),
    createData('Operador Kingdom', 'empresa', '8.65'),
]

// =========================|| DASHBOARD ANALYTICS - LATEST CUSTOMERS TABLE CARD ||========================= //

export interface LatestCustomerTableCardProps {
    title?: string
}

const LatestCustomerTableCard = ({ title }: LatestCustomerTableCardProps) => {
    const classes = useStyles()
    const navigate = useNavigate()
    const location = useLocation()
    console.log(location)
    const handleFormView = () => {
        navigate('/reportes/recudacion/detallado')
    }

    return (
        <MainCard title={title} content={false}>
            <CardContent className={classes.projectTableCard}>
                <PerfectScrollbar className={classes.ScrollHeight}>
                    <TableContainer>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Operador </TableCell>
                                    <TableCell>Empresa</TableCell>
                                    <TableCell align="right" sx={{ pr: 3 }}>
                                        Monto
                                    </TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {rows.map((row, index) => (
                                    <TableRow hover key={index}>
                                        <TableCell>{row.subject}</TableCell>
                                        <TableCell>{row.dept}</TableCell>
                                        <TableCell align="right" sx={{ pr: 3 }}>
                                            {row.date}
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </PerfectScrollbar>
            </CardContent>
            <Divider />
            <CardActions sx={{ justifyContent: 'flex-end' }}>
                <Button
                    variant="contained"
                    size="large"
                    onClick={handleFormView}
                >
                    Reporte detallado
                </Button>
            </CardActions>
        </MainCard>
    )
}

export default LatestCustomerTableCard
