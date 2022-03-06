/* eslint-disable react-hooks/exhaustive-deps */

import React from 'react'
import { Theme } from "@material-ui/core"

// import Stack from '@mui/material/Stack';
// import CircularProgress from '@mui/material/CircularProgress';


import { RESPONSE } from '../../../_mockApis/summary_criterias/reports'
// import Spinner from '../../icons/Spinner'
import { makeStyles } from '@material-ui/styles'
// import { DefaultRootStateProps } from 'types'
// import { useSelector } from 'react-redux'
import { COMPANY } from '../../../_mockApis/operating_companies/create_company' 



// interface reporTypes[
    
//     date: string,
//     data : Array<Object>,
    
// ]

const useStyles = makeStyles((theme: Theme) => ({
    alertIcon: {
        height: '16px',
        width: '16px',
        marginRight: '5px',
        verticalAlign: 'text-bottom',
        marginTop: '15px',
        marginLeft: '-15px',
    },
    userAvatar: {
        height: '80px',
        width: '80px',
    },
    searchControl: {
        width: '100%',
        paddingRight: '16px',
        paddingLeft: '16px',
        '& input': {
            background: 'transparent !important',
            paddingLeft: '5px !important',
        },
        '& .Mui-focused input': {
            boxShadow: 'none',
        },
        [theme.breakpoints.down('lg')]: {
            width: '250px',
        },
        [theme.breakpoints.down('md')]: {
            width: '100%',
            marginLeft: '4px',
            background:
                theme.palette.mode === 'dark'
                    ? theme.palette.dark[800]
                    : '#fff',
        },
    },
    ButtonControl: {
        width: '50%',
        '& input': {
            color: ' transparent !important',
            marginLeft: '5px',
        },
        [theme.breakpoints.down('md')]: {
            background:
                theme.palette.mode === 'dark'
                    ? theme.palette.dark[800]
                    : '#ffff',
        },
    },
    Button: {
        background: '#2196f3',
        '&:hover':{
            background:'#2e81c5',
            color: 'white', 
        }
    },
    ButtonVolver : {
        color: '#2196f3',
        background: 'transparent',
        '&:hover':{
            background:'#2e81c5', 
            color: 'white',
        }
    },
    borderDebug: {
        border: '1px solid red',
        
    },
    input: {
        opacity: 0,
        position: 'absolute',
        zIndex: 1,
        padding: 0.5,
        cursor: 'pointer',
        width: '30%',
    },
    ScrollHeight: {
        height: 'calc(50vh - 88px)',
        // paddingLeft: '16px',
        // paddingRight: '16px',
        [theme.breakpoints.down('sm')]: {
            height: 'calc(100vh - 56px)'
        }
    },
    table:{
        background:
                theme.palette.mode === 'dark'
                    ? theme.palette.dark[800]
                    : '#ffff',

    },
    header:{
        background:
                theme.palette.mode === 'dark'
                    ? theme.palette.dark[800]
                    : '#ffff',
    }
}))


const DetailsTable = (props : {handleView:() => void, date}) => {

    const classes = useStyles()
    // const response = useSelector(
    //     (state: DefaultRootStateProps) => state.reportsIncome
    // )
    const response = RESPONSE
    // const company =  useSelector(
    //     (state : DefaultRootStateProps) => state.operatingCompanies
    // )
    const company = COMPANY


    const [report, setReport] = React.useState<any[]>([])
    // const [loading, setLoading] = React.useState<boolean>(true)
    
    // const [groupD, setGroupD] = React.useState<any>({})

    const handleData = () => {
        const data = response.data
        const header = response.header
        const array :any[] = []
        var date:any[] = []
        var groupDate: any[] = []
        let groupCompany:any[] = []

        if(header.find((find) => find.action_code === 'total') === undefined){
            header.push({action_code:'total', name:'Total' })
        }
        data.map((map)=>{
            if(array.length === 0 ) array.push(map?.company_code)
            if(!array.includes(map.company_code)) array.push(map?.company_code)
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
                                    nominal_amount: com.nominal_amount,
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
        console.log("groupDate", groupDate)
        console.log("company", company )
        if(groupDate){
            groupDate.flatMap((map) => {
                map.data.map((d)=>{
                    console.log(d)
                    company.map((com) => {
                        if(d.company === com.company_code){
                            console.log(com.name)
                            d.company_name = com.name
                        }
                        return com
                    })
                    return d
                })
                return map 
            })
        }
        
        setReport(groupDate)
    }
    // const handleTotal = () => {
    // const data = report.map
    // }
    const handleColum = ()=>{
        const data = response.data
        const total_by_company = response.Total_by_company
        const sub_total = response.Sub_total
        const total = response.global_total
        data.map((map)=>{
            const cou = document.getElementById(`${map?.company_code}-${map.moment}-${map.action_code}-count`)
            const spinnerCount = document.getElementById(`spinner`)
            const nominal = document.getElementById(`${map?.company_code}-${map.moment}-${map.action_code}-nominal_amount`)
            
            if (cou !== null && nominal !== null){
                cou.innerText = map.count.toString()
                const number = map.nominal_amount.toFixed(2) 
                nominal.innerText = number.toString()
            }
            if( spinnerCount !== null ){
                spinnerCount.className =""
            }
            return map 
        })

        total_by_company.map((map) => {
            ////
            const count = document.getElementById(`${map?.company}-${map.date}-total-count`)
            const nominal = document.getElementById(`${map?.company}-${map.date}-total-nominal_amount`)
            if(count !== null && nominal !== null){
                count.innerText = map.transaction_amount_total.toString()
                const number = map.nominal_amount_total.toFixed(2) 
                nominal.innerText = number.toString()
                console.log(number)
            }
            return map

        })
        console.log("report ",report)
        
        report.map((map) => {
            const data = sub_total[map.date]    
                  
            if(data=== undefined) {
                return map
            }

            data.map((dat) => {
                for( let [ key, value] of Object.entries(dat)){
                    const count = document.getElementById(`${map.date}-${key}-count`)
                    const nominal = document.getElementById(`${map.date}-${key}-sub_total`)
                    // const count_total = document.getElementById(`${map.date}-${key}-count`)
                    // const nominal_total = document.getElementById(`${map.date}-${key}-`)
                    
                    if(count !== null){
                        count.innerText = `${value}`
                    }
                    console.log(nominal)
                    if(nominal !== null){
                        const number = parseFloat(`${value}`)
                        nominal.innerText = number.toFixed(2).toString()
                    }
                }
                return dat
            })
            return map
        })
        total.map((map) => {
            for( let [key, value] of Object.entries(map)){
                const count = document.getElementById(`-${key}-count-total`)
                const nominal = document.getElementById(`-${key}-nominal-total`)
                // const count_total = document.getElementById(`${map.date}-${key}-count`)
                // const nominal_total = document.getElementById(`${map.date}-${key}-`)
                
                if(count !== null){
                    count.innerText = `${value}`
                }
                if(nominal !== null){
                    const number = parseFloat(`${value}`)
                    nominal.innerText = number.toFixed(2).toString()
                }
            }
            return map 
        })
        
    }
    const handleHTML= () =>{
        
        const div = document.getElementById('div-table')
        console.log(div)
        console.log('prueba')
        if(div !== null){
            console.log(div)
            console.log('prueba2')
        }
    }

    React.useEffect(()=>{
        handleData()
    }, [])

    React.useLayoutEffect(()=>{
        if(report){
            setTimeout(()=>{
                handleColum()
            }, 500)

            setTimeout(()=>{
                handleHTML()
            }, 5000)
        }
    },[report])

    return (
        <>
            <div className="flex justify-center mt-5  w-auto h-20 content-center">
                <div className=' content-center'>
                    <p className='text-4xl whitespace-pre  text-center'>
                        {`${response.tittle[0]}`}
                    </p>
                    <p  className='text-2xl text-center'>
                        {response.tittle[1]}
                    </p>
                </div>
            </div>
           
            <div className="flex justify-between  w-auto content-center">
                <div className='sm:flex w-full justify-between items-center px-6'>
                    <div className='flex sm:block justify-between my-2' >
                        <p> Desde: {props.date.initial }</p>  <p className='ident-8'>  Hasta: {props.date.final} </p>
                    </div>
                    <div className='flex mr-2 justify-end flex-col space-y-2 sm:flex-row  sm:space-x-2 sm:space-y-0  '>
                        <button className={`${classes.ButtonVolver} font-bold py-2 px-4 rounded`}
                            onClick={() => props.handleView()} >
                            Volver
                        </button>
                        <button className={`${classes.Button}   text-white font-bold py-2 px-4 rounded`}
                            onClick={() => console.log("boton")} >
                            Exportar pdf
                        </button>
                        <button className={`${classes.Button} text-white font-bold py-2 px-4 rounded`}
                            onClick={() => console.log("boton")} >
                            Exportar excel
                        </button>
                    </div>
                </div>
            </div>
            {/* style={{height:'450px'}} */}
            <div id='div-table' className='overflow-auto all-content-table-report'>
             <table className={`${classes.table} w-full`}>
                
                 <thead className={`${classes.header} rounded-ful sticky top-0 border-b-2`}>
                     <tr>
                         <th rowSpan={2}>Fecea</th>
                         <th rowSpan={2}>Empresa</th>
                         {response.header.map((map) => {
                             return <th id={map.action_code} colSpan={2} align="center" className="px-6 py-2"> {map.name}  </th>
                         })}
                         {/* <th colSpan={2} align="center" className="px-6 py-2"> TOTAL</th> */}
                     </tr>
                     <tr>
                         {response.header.map((map) => {
                            return <>
                                <th id={`${map.action_code}-count`} align="center" className="px-6 py-2  ">Cantidad</th>
                                <th id={`${map.action_code}-nominal_amount`} align="center" className="px-6 py-2  " >Monto</th>
                            </>
                         })}
                        {/* <th id='-count-Total' align="center" className="px-6 py-2  ">Cantidad</th>
                        <th id={'-nominal_amount-Total'} align="center" className="px-6 py-2  " >Monto</th> */}
                     </tr>
                 </thead>
                
                 <tbody>
                        {report && report?.map((obj) => {           
                            return <>  
                                {/* <tr className="whitespace-nowrap border-b-2 odd:bg-white even:bg-slate-100">*/}
                                <tr className="whitespace-nowrap border-b-2 "> 
                                    <td  id={`${obj?.date}`} className="px-6 py-4"> {obj?.date} </td>
                                    
                                    {obj.data.map((com) => {
                                        return <> 
                                            <tr  className="px-6 py-4 text-smp-4 divide-x-4 divide-x-4">
                                                <td id={`${com?.company}`}className="px-6 py-4 " >{com?.company_name}</td>
                                            </tr>
                                        </>
                                    })}
                                    { response.header.map((r) =>{
                                        return <>
                                            <td id={`${r.action_code}-count`}>
                                                {obj.data.map((com) => {
                                                    return <>
                                                        <tr className="w-full flex justify-center">
                                                            <td id={`${com?.company}-${obj.date}-${r.action_code}-count`} className=" py-4   text-right" >
                                                                {"-"}
                                                            </td>
                                                        </tr>
                                                    </>
                                                })} 
                                            </td>
                                            <td id={`${r.action_code}-nominal_amount`} className='items-end'>
                                                {obj.data.map((com) => {
                                                    return <> 
                                                        <tr  className="w-full flex justify-end">
                                                            <td id={`${com?.company}-${obj.date}-${r.action_code}-nominal_amount`} className="px-6 py-4 text-right" >
                                                                {"-"}
                                                            </td> 
                                                        </tr>
                                                    </>
                                                })}  
                                            </td>
                                        </>
                                    })}
                                </tr> 
                                <tr className="whitespace-nowrap border-b-2">
                                    <td  colSpan={2} id={`${obj.date}-sub_total`} className="px-6 py-4 text-center"> Sub total </td>
                                    {response.header.map((r) =>{
                                        return <>
                                            <td id={`${r.action_code}-count`}>
                                            <tr  className="w-full flex justify-center ">
                                                <td id={`${obj.date}-transaction_amount_${r.action_code}-count`} className=" px-6 py-4 text-center font-bold" >
                                                    {"-"}
                                                </td>
                                            </tr>
                                            </td>
                                            <td id={`${r.action_code}-nominal_amount`}>
                                                <tr  className=" text-sm flex justify-end ">
                                                    <td id={`${obj.date}-nominal_amount_${r.action_code}-sub_total`} className="px-6 py-4 text-right font-bold" >
                                                        {"-"}
                                                    </td> 
                                                </tr>
                                            </td>
                                        </>
                                    })}
                                </tr>
                            </>
                        })}
                        <tr  className="whitespace-nowrap   ">
                            <td  colSpan={2} id={'total'} className="px-6 py-4 text-center">
                                Total
                                </td>
                                {response.header.map((r) =>{
                                        return <>
                                            <td id={`${r.action_code}-count`}>
                                                <tr  className="w-full flex justify-center">
                                                    <td id={`-transaction_amount_${r.action_code}-count-total`} className=" px-6 py-4   text-center font-bold" >
                                                        {"-"}
                                                    </td>
                                                </tr>
                                            </td>
                                            <td id={`${r.action_code}-nominal_amount`}>
                                               
                                                <tr  className=" text-sm flex justify-end">
                                                    <td id={`-nominal_amount_${r.action_code}-nominal-total`} className="px-6 py-4 font-bold" >
                                                        {"-"}
                                                    </td> 
                                                </tr>
                                            </td>
                                        </>
                                })}
                        </tr>
                </tbody>
            </table>
        </div>
        {/* </div> */}
        </>
    )
}
export default DetailsTable
// 192.168.0.107:9088