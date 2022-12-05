// material-ui
import { makeStyles } from '@material-ui/styles'
import { Theme } from '@material-ui/core'

// project imports
import MainCard from 'ui-component/cards/MainCard'

// style constant
const useStyles = makeStyles((theme: Theme) => ({
    card: {
        backgroundColor:
            theme.palette.mode === 'dark'
                ? theme.palette.dark.dark
                : theme.palette.secondary.dark,
        color: '#fff',
        overflow: 'hidden',
        position: 'relative',
        '&:after': {
            content: '""',
            position: 'absolute',
            width: '210px',
            height: '210px',
            background:
                theme.palette.mode === 'dark'
                    ? `linear-gradient(210.04deg, ${theme.palette.secondary.dark} -50.94%, rgba(144, 202, 249, 0) 95.49%)`
                    : theme.palette.secondary[800],
            borderRadius: '50%',
            top: '-85px',
            right: '-95px',
            [theme.breakpoints.down('xs')]: {
                top: '-105px',
                right: '-140px',
            },
        },
        '&:before': {
            content: '""',
            position: 'absolute',
            width: '210px',
            height: '210px',
            background:
                theme.palette.mode === 'dark'
                    ? `linear-gradient(140.9deg, ${theme.palette.secondary.dark} -14.02%, rgba(144, 202, 249, 0) 85.50%)`
                    : theme.palette.secondary[800],
            borderRadius: '50%',
            top: '-125px',
            right: '-15px',
            opacity: 0.5,
            [theme.breakpoints.down('xs')]: {
                top: '-155px',
                right: '-70px',
            },
        },
    },
    content: {
        padding: '20px !important',
    },
}))

// ===========================|| DASHBOARD DEFAULT - EARNING CARD ||=========================== //

export interface TotalRevenueCardProps {
    loading: boolean
    data: any
}

const TotalRevenueCard = ({ loading, data }: TotalRevenueCardProps) => {
    const classes = useStyles()

    return (
        <MainCard
            border={false}
            className={classes.card}
            contentClass={classes.content}
        >
            <div className="flex flex-col justify-center h-32 ml-2 mb-2">
                {data ? (
                    <h1 className="mt-5 mb-1.5 mr-8 font-medium text-4xl">
                        {data?.account_detail?.last_use_date}
                    </h1>
                ) : (
                    <div className="flex flex-row items-center mt-5 mb-1.5 mr-8 font-medium text-4xl">
                        <svg
                            role="status"
                            className="inline w-5 h-5 mr-3 text-white animate-spin"
                            viewBox="0 0 100 101"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                                fill="#E5E7EB"
                            />
                            <path
                                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                                fill="currentColor"
                            />
                        </svg>
                        {/* <h1 className="text-gray-200 animate-pulse">
                            Actualizando...
                        </h1> */}
                    </div>
                )}
                <h2 className="text-lg text-gray-200 font-medium text-opacity-80">
                    Último uso
                </h2>
            </div>
        </MainCard>
    )
}

export default TotalRevenueCard
