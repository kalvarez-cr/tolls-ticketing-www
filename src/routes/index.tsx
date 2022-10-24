import { useNavigate, useRoutes } from 'react-router-dom'

// routes

import LoginRoutes from './LoginRoutes'
import { useSelector } from 'react-redux'
import { DefaultRootStateProps } from 'types'
import { useEffect, useState } from 'react'
import { switchRoleRoutes } from 'utils/switchRoleRoutes'

// ==============================|| ROUTING RENDER ||============================== //

export default function ThemeRoutes() {
    const userRole = useSelector(
        (state: DefaultRootStateProps) => state.login?.user?.role
    )
    const navigate = useNavigate()
    const [roleRoutes, setRoleRoutes] = useState({})

    useEffect(() => {
        const { path, routes } = switchRoleRoutes(userRole)
        setRoleRoutes(routes)
        navigate(path)
    }, [userRole])
    return useRoutes([...LoginRoutes, roleRoutes])
}
