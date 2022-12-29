import React from 'react'
import DeleteIcon from '@mui/icons-material/Delete'
import VisibilityIcon from '@material-ui/icons/Visibility'
import {
    Button,
    Grid,
    Menu,
    MenuItem,
    Theme,
    Typography,
} from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import ShowImage from 'components/removeForms/ShowImage'
import { axiosRequest } from 'store/axios'
import { SNACKBAR_OPEN } from 'store/actions'
import { useDispatch } from 'react-redux'

export interface TDocumentTypes {
    label?: string
    value?: string
    disabled?: boolean
}
export interface TDocuments {
    disabled?: boolean
    label?: string
    value?: string
    file?: any
}
export interface TUserDocuments {
    id: string
    label: string
    value: string
}
interface AddDocumentsProps {
    userDocuments: TUserDocuments[]
    documents: TDocuments[]
    documentTypes: TDocumentTypes[]
    setDocumentTypes: React.Dispatch<React.SetStateAction<TDocumentTypes[]>>
    setDocuments: React.Dispatch<React.SetStateAction<TDocuments[]>>
    setUserDocuments: React.Dispatch<React.SetStateAction<TUserDocuments[]>>
    setDeleteDocuments: React.Dispatch<React.SetStateAction<string[]>>
    deleteDocuments: string[]
    readOnlyState: boolean | undefined
    viewFileUrlRequest: string
}

const useStyles = makeStyles((theme: Theme) => ({
    searchControl: {
        width: '100%',
        '& input': {
            background: 'transparent !important',
        },
        '& .Mui-focused input': {
            boxShadow: 'none',
        },
        ' & .css-1xu5ovs-MuiInputBase-input-MuiOutlinedInput-input': {
            color: '#6473a8',
        },

        [theme.breakpoints.down('lg')]: {
            width: '250px',
        },
        [theme.breakpoints.down('md')]: {
            width: '100%',
            marginLeft: '4px',
        },
    },
}))

export const AddDocuments = ({
    userDocuments,
    documentTypes,
    setDocumentTypes,
    setDocuments,
    documents,
    setUserDocuments,
    deleteDocuments,
    setDeleteDocuments,
    readOnlyState,
    viewFileUrlRequest,
}: AddDocumentsProps) => {
    const classes = useStyles()
    // const [open, setOpen] = React.useState<boolean>(true)
    const [loading, setLoading] = React.useState<boolean>(false)
    const [openModalFile, setOpenModalFile] = React.useState<boolean>(false)
    const [base64, setBase64] = React.useState<any>()

    const dispatch = useDispatch()

    const handleSelectItem = (type) => {
        const newDocumentTypes = documentTypes.filter(
            (documentType) => documentType.value !== type.value
        )
        setDocumentTypes([...newDocumentTypes, { ...type, disabled: true }])
        setDocuments([...documents, type])
    }
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
    const openMenu = Boolean(anchorEl)
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget)
    }
    const handleClose = () => {
        setAnchorEl(null)
    }

    const handleDeleteDocument = (e) => {
        e.preventDefault()
        const label = e.currentTarget.dataset.label
        console.log(label)
        const removeDocument = documents.filter((doc) => doc.label !== label)
        const documentType = documentTypes.find((doc) => doc.label === label)
        const removeDocumentType = documentTypes.filter(
            (doc) => doc.label !== label
        )
        setDocumentTypes([
            ...removeDocumentType,
            { ...documentType, disabled: false },
        ])
        setDocuments([...removeDocument])
    }
    const handleDeleteUserDocument = (e) => {
        e.preventDefault()
        const id = e.currentTarget.dataset.id
        const label = e.currentTarget.dataset.label
        const removeDocument = userDocuments.filter(
            (doc) => doc.label !== label
        )
        const documentType = documentTypes.find((doc) => doc.label === label)
        const removeDocumentType = documentTypes.filter(
            (doc) => doc.label !== label
        )
        setDocumentTypes([
            ...removeDocumentType,
            { ...documentType, disabled: false },
        ])
        setUserDocuments([...removeDocument])
        setDeleteDocuments([...deleteDocuments, id])
    }

    const uploadPhoto = async (e) => {
        const file = e.target?.files[0]
        const label = e.currentTarget.dataset.label
        const document = documents.find((doc) => doc.label === label)
        const filterDocument = documents.filter((doc) => doc.label !== label)
        setDocuments([...filterDocument, { ...document, file }])
    }
    const handleClickFile = async (e) => {
        e.preventDefault()
        const { id } = e.currentTarget.dataset
        try {
            setLoading(true)
            const headers: object = {
                'Content-Type': 'application/json',
            }
            const responseType = 'arraybuffer'
            setOpenModalFile(true)
            const data = await axiosRequest(
                'post',
                viewFileUrlRequest,
                {
                    file_type: 'document',
                    file_id: id,
                },
                headers,
                responseType
            )
            const base64data = new Buffer(data.data).toString('base64')
            setBase64(base64data)
            setLoading(false)
        } catch (error) {
            const snackbarOpen = (message, type) => {
                return {
                    type: SNACKBAR_OPEN,
                    open: true,
                    message: message,
                    anchorOrigin: { vertical: 'top', horizontal: 'right' },
                    variant: 'alert',
                    alertSeverity: type,
                }
            }
            dispatch(snackbarOpen(error, 'error'))
            setLoading(false)
            setOpenModalFile(false)
        }
    }

    return (
        <>
            <Grid
                item
                xs={12}
                sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginTop: '25px',
                }}
            >
                <Typography variant="h4">Documentos</Typography>
            </Grid>
            <Grid
                item
                xs={12}
                md={6}
                className={classes.searchControl}
                sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginTop: '25px',
                    marginBottom: '25px',
                }}
            >
                <Button
                    id="basic-button"
                    // aria-controls={open ? 'basic-menu' : undefined}
                    aria-haspopup="true"
                    // aria-expanded={open ? 'true' : undefined}
                    color={'primary'}
                    variant={'contained'}
                    onClick={handleClick}
                    size={'large'}
                    disabled={readOnlyState}
                >
                    Añadir Documento
                </Button>
                <Menu
                    id="basic-menu"
                    anchorEl={anchorEl}
                    open={openMenu}
                    onClose={handleClose}
                    MenuListProps={{
                        'aria-labelledby': 'basic-button',
                    }}
                >
                    {documentTypes &&
                        documentTypes?.map((type) => (
                            <MenuItem
                                disabled={type?.disabled}
                                onClick={() => handleSelectItem(type)}
                            >
                                {type.label}
                            </MenuItem>
                        ))}
                </Menu>
            </Grid>
            {userDocuments?.map((document) => (
                <div className="w-full md:w-1/2 px-4 my-3 flex justify-between border-2 bg-materialgreen  p-2 items-center rounded-md">
                    <div className="font-bold  text-white align-middle">
                        {document.label}
                    </div>
                    <div className="flex gap-4 ml-4">
                        <div className="hover:bg-green-700 rounded-full">
                            <button
                                data-id={document.id}
                                onClick={handleClickFile}
                                color="primary"
                                type="button"
                            >
                                <VisibilityIcon className="w-7 text-white" />
                            </button>
                        </div>
                        <div className="">
                            <button
                                className={`hover:bg-green-700 rounded-full ${
                                    readOnlyState ? 'pointer-events-none' : ''
                                }`}
                                data-id={document.id}
                                data-label={document.label}
                                onClick={handleDeleteUserDocument}
                                disabled={readOnlyState}
                            >
                                <DeleteIcon className="text-red-500 m-0 w-6" />
                            </button>
                        </div>
                    </div>
                </div>
            ))}
            {documents?.map((document) => (
                <div className="w-1/2 my-6 flex ">
                    <div className="w-full flex items-center">
                        <div className="w-full">
                            <p className="font-bold text-black">
                                {document.label}
                            </p>
                            <div className="flex justify-start">
                                <label
                                    className={`flex mt-1 justify-center px-6 h-10 w-full items-center rounded-lg hover:border-logo border-2 cursor-pointer ${
                                        !document?.file?.name
                                            ? 'bg-white text-materialdarkgreen border-materialdarkgreen'
                                            : 'bg-materialgreen text-white'
                                    }`}
                                >
                                    <>
                                        <svg
                                            className="w-7 h-7 mx-2 "
                                            fill="currentColor"
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 20 20"
                                        >
                                            <path d="M16.88 9.1A4 4 0 0 1 16 17H5a5 5 0 0 1-1-9.9V7a3 3 0 0 1 4.52-2.59A4.98 4.98 0 0 1 17 8c0 .38-.04.74-.12 1.1zM11 11h3l-4-4-4 4h3v3h2v-3z" />
                                        </svg>
                                        <span className=" text-base leading-normal mx-2 font-bold">
                                            Subir Archivo
                                        </span>
                                    </>

                                    <input
                                        type="file"
                                        className="hidden"
                                        name={document.label}
                                        onChange={uploadPhoto}
                                        data-label={document.label}
                                    />
                                </label>
                                <div className="self-end py-2 mx-4">
                                    <button
                                        data-label={document.label}
                                        onClick={handleDeleteDocument}
                                    >
                                        <DeleteIcon className="text-red-500 m-0" />
                                    </button>
                                </div>
                            </div>
                            <label className="font-bold">
                                {/* Icono{' '} */}
                                {document?.file &&
                                !document?.file?.type?.includes('image') ? (
                                    <span className="text-red-500">
                                        No es el tipo de documento adecaudo
                                    </span>
                                ) : null}
                            </label>

                            {document?.file &&
                            document?.file?.type?.includes('image') ? (
                                <div className="">
                                    <p className="text-green-900 font-bold">
                                        Cargado correctamente
                                    </p>
                                    <p className="text-green-900 font-bold">
                                        {
                                            // @ts-ignore
                                            document?.file?.name
                                        }
                                    </p>
                                </div>
                            ) : null}
                        </div>
                    </div>
                </div>
            ))}
            <ShowImage
                open={openModalFile}
                setOpen={setOpenModalFile}
                onlyAccept
            >
                {loading ? (
                    <div className="w-96 h-56  flex justify-center items-center">
                        <svg
                            role="status"
                            className="inline w-6 h-4 mr-3 text-white animate-spin"
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
                    </div>
                ) : (
                    <img src={`data:image/jpeg;base64,${base64}`} alt="placa" />
                )}
            </ShowImage>
        </>
    )
}
