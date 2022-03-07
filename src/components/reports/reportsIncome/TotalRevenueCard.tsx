/* eslint-disable react-hooks/exhaustive-deps */
// material-ui
import React from  'react'
import { makeStyles } from '@material-ui/styles';
import { CardContent, Divider, List, ListItemButton, ListItemIcon, ListItemText, Theme } from '@material-ui/core';

// third party
import PerfectScrollbar from 'react-perfect-scrollbar';

// project imports
import MainCard from 'ui-component/cards/MainCard';

// assets
// import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp';
import { RESPONSE } from '../../../_mockApis/summary_criterias/reports'
// import { DefaultRootStateProps } from 'types';
// import { useSelector } from 'react-redux';

// style constant
const useStyles = makeStyles((theme: Theme) => ({
    incomingRequestsCard: {
        padding: '0px',
        paddingBottom: '0px !important'
    },
    textSuccess: {
        color: theme.palette.success.dark
    },
    textError: {
        color: theme.palette.error.main
    },
    ScrollHeight: {
        height: '260px',
        '& svg': {
            width: '32px',
            margin: '-6px 6px -6px -6px'
        }
    },
    coinText: {
        display: 'flex',
        justifyContent: 'space-between'
    }
}));

// ===========================|| DASHBOARD ANALYTICS - TOTAL REVENUE CARD ||=========================== //

export interface TotalRevenueCardProps {
    title?: string;
}

const TotalRevenueCard = ({ title }: TotalRevenueCardProps) => {
    const classes = useStyles();
    // const response = useSelector(
    //     (state: DefaultRootStateProps) => state.reportsIncome
    // )
    const [data, setData] = React.useState<any[]>([])
    const [report, setReport]=React.useState<any[]>([])
    const [view, setview]=React.useState<boolean>(false)
    const response = RESPONSE
    const handleData = () => {
        const data = response.data
        const header = response.header
        const array : any[] = []
        var date:any[] = []
        var groupDate:any[] = []
        let groupCompany:any[] =[]

        if(header && header.find((find) => find.action_code === 'total') === undefined){
            header.push({action_code:'total', name:'Total' })
        }
        console.log(data)
        data.map((map)=>{
            if(array.length === 0 ) array.push(map.company_code)
            if(!array.includes(map.company_code)) array.push(map.company_code)
            return map
        })
        
        array.map((m)=>{
            const group_company = data.filter((fil) => fil.company_code === m)
            groupCompany.push(group_company)
            return m
        })
        data.map((map)=>{
            if(date.length === 0 ) {
                date.push(map.moment)
                groupDate.push({
                    date:map.moment,
                    company:"", 
                    data:[]
                })
            }
            if(!date.includes(map.moment)){
                date.push(map.moment)
                groupDate.push({
                    date:map.moment,
                    company:"", 
                    data:[]
                })
            }
            return map
        })
        groupDate.map((map) => {
            groupCompany.map((fil) => { 
                fil.map((com) => {
                    if(map.date === com.moment ){
                        if(map.data.length === 0 ){
                            map.data.push({
                                company:com.company_code, 
                                data:[]
                            })
                        }
                        if(map.data.find((fin) => fin.company ===com.company_code) === undefined ){
                            map.data.push({
                                company:com.company_code, 
                                data:[{
                                    date:com.moment,
                                    company:com.company_code,
                                    count:com.count,
                                    nominal_amount:com.nominal_amount,
                                    action_code:com.action_code
                                }]})
                        }                        
                        map.data.flatMap((d)=>{
                            if(d.company.includes(com.company_code)){
                                d.data.push({
                                    date:com.moment,
                                    company:com.company_code,
                                    count:com.count,
                                    nominal_amount:com.nominal_amount,
                                    action_code:com.action_code
                                })
                            }
                            return d
                        })
                    }
                    return com
                })
                return fil
            })
            return map 
        })
        setReport(groupDate)
        console.log(groupDate)
        handleSub(groupDate)
    }

    const handleSub = (groupDate) => {
        const  sub_total = response.Sub_total
        const arr: any[] = []
        groupDate.map((map) => {
            // const da = map.date.split("-")
            // const date = `${da[2]}-${da[1]}-${da[0]}`
            const sub = sub_total[map.date]
            if(sub === undefined) {
                return map 
            }
            sub.map((da)=>{
                if(arr.find((fin)=> fin.date === map.date) === undefined) {
                    arr.push({date:map.date, nominal: da.nominal_amount_total})
                } 
                return da
            })
            return map 
        })
        setData(arr)
    }

    React.useEffect(() => {
        handleData()
        console.log(report)
        setview(true)
        
    },[])

    return view ? (
        <MainCard title={title} content={false}>
            <CardContent className={classes.incomingRequestsCard}>
                <PerfectScrollbar className={classes.ScrollHeight}>
                    <List component="nav" aria-label="main mailbox folders">
                        {data && data.map((map)=>{
                            return <>
                                <ListItemButton>
                                    <ListItemIcon>
                                        <ArrowDropUpIcon className={classes.textSuccess} />
                                    </ListItemIcon>
                                    <ListItemText
                                        primary={
                                            <div className={classes.coinText}>
                                                <span>{map.date}</span>
                                                <span className={classes.textSuccess}>{`Bs ${map.nominal}`}</span>
                                            </div>
                                        }
                                    />
                                </ListItemButton>
                                <Divider />
                            </>
                        })}
                    </List>
                </PerfectScrollbar>
            </CardContent>
        </MainCard>
    ): <></>
};

export default TotalRevenueCard;
