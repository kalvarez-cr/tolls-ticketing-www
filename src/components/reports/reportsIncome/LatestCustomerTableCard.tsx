// import { useState, useEffect} from 'react'
// import { useDispatch } from 'react-redux';
// material-ui
import { makeStyles } from '@material-ui/styles';
import {
    Button,
    CardActions,
    CardContent,
    // CardMedia,
    Divider,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Theme
} from '@material-ui/core';

// third party
import PerfectScrollbar from 'react-perfect-scrollbar';

// project imports
import MainCard from 'ui-component/cards/MainCard';
// import { RESPONSE } from '../../../_mockApis/summary_criterias/summary_criterias'
// import { DefaultRootStateProps } from 'types';
// import { useSelector } from 'react-redux';
// import { getCompaniesRequest } from 'store/operatingCompany/operatingCompanyActions'

// style constant
const useStyles = makeStyles((theme: Theme) => ({
    projectTableCard: {
        padding: '0px'
    },
    projectTableFooter: {
        justifyContent: 'flex-end'
    },
    imgFlag: {
        width: '30px',
        height: 'auto'
    },
    ScrollHeight: {
        height: '345px',
        padding: 0
    }
}));

function createData( date: string, company_name: string, nominal_amount_total: string, transaction_amount_total: string) {
    return { date, company_name, nominal_amount_total, transaction_amount_total };
}
const rows = [
    createData('Germany', 'Germany', 'Angelina Jolly', '56.23%'),
    createData('USA', 'USA', 'John Deo', '25.23%'),
    createData('Australia', 'Australia', 'Jenifer Vintage', '12.45%'),
    createData('United', 'United Kingdom', 'Lori Moore', '8.65%'),
    createData('Brazil', 'Brazil', 'Allianz Dacron', '3.56%'),
    createData('Australia', 'Australia', 'Jenifer Vintage', '12.45%'),
    createData('USA', 'USA', 'John Deo', '25.23%'),
    createData('Australia', 'Australia', 'Jenifer Vintage', '12.45%'),
    createData('United', 'United Kingdom', 'Lori Moore', '8.65%')
];

// =========================|| DASHBOARD ANALYTICS - LATEST CUSTOMERS TABLE CARD ||========================= //

export interface LatestCustomerTableCardProps {
    title?: string;
    handleViewTable: () => void
}

const LatestCustomerTableCard = ({ handleViewTable, title }: LatestCustomerTableCardProps) => {
    const classes = useStyles();
    // const dispatch = useDispatch()

    // const response = useSelector(
    //     ( state: DefaultRootStateProps ) => state.reportsIncome
    // )
    // const company =  useSelector(
    //     (state : DefaultRootStateProps) => state.operatingCompanies
    // )
    // const [data , setData] = useState<any>([]) 

    // const handleCompany = () => {
    //     const arr = new Array()
    //     console.log("company",company)
    //     console.log("response",response)
    //     const  resp = response.Total_by_company

    //     resp.map((map) => {
    //         let name = ""
    //         company.map((com) => {
    //             if(map.company === com.company_code){
    //                 // map.Empresa = com.name
    //                 name= com.name

    //             }
    //         })
    //         // const date = map.date.split("-")
    //         // const str =`${date[2]}-${date[1]}-${date[0]}`
    //         // console.log("str",str)


    //         arr.push({...map, date: map.date, company_name : name})

    //     })
    //     console.log(arr)
    //     setData(arr)

    // } 
    // useEffect(() => {
    //     // dispatch(getCompaniesRequest())
    //     setTimeout(()=> {
    //         handleCompany()
    //     }, 100)

    // }, [])

    return (
        <MainCard title={title} content={false} >
            <CardContent className={classes.projectTableCard}>
                <PerfectScrollbar className={classes.ScrollHeight}>
                    <TableContainer>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell >Fecha</TableCell>
                                    <TableCell>Empresa</TableCell>
                                    <TableCell>Cantidad</TableCell>
                                    <TableCell >
                                        Monto
                                    </TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {rows.map((row, index) => (
                                    <TableRow hover key={index}>
                                        <TableCell>{row.date}</TableCell>
                                        <TableCell>{row.company_name}</TableCell>
                                        <TableCell>{row.nominal_amount_total }</TableCell>
                                        <TableCell >{row.transaction_amount_total}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </PerfectScrollbar>
            </CardContent>
            <Divider />
            <CardActions sx={{ justifyContent: 'flex-end' }}>
                <Button variant="contained" size="large" onClick={handleViewTable}>
                    Ver reporte detallado
                </Button>
            </CardActions>
        </MainCard>
    );
};

export default LatestCustomerTableCard;
