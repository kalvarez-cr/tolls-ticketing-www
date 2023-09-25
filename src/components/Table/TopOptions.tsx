import {  CardContent,  IconButton, Tooltip } from '@material-ui/core'
import HistoryIcon from '@mui/icons-material/History';
import { useState } from 'react'
import HistoryDetailsTable from 'components/removeForms/HistoryDetailsTable';



const TopOptions = ({
    categoryKey,
}) => {
const [open, setOpen] = useState<boolean>(false)
const [modal, setModal ] = useState<string>('')
    const handleDetails = () => {
        setOpen(true)
        setModal('details')
    }

    
    return (
        <>
        <CardContent>
          
                
             
             
                   
                    <Tooltip title="Histórico de cambios">
                        <IconButton onClick={handleDetails}>
                            <HistoryIcon className='-mx-2 -mt-4' />
                        </IconButton>
                    </Tooltip>
                    
                   


         
        </CardContent>

        {modal === 'details' ? 
        <HistoryDetailsTable
        open={open}
        setOpen={setOpen}
        onlyAccept
        title=''
        categoryKey={categoryKey}
        
        />

            

         
        
        
        
        : null}
        </>

        
    )
}

export default TopOptions
