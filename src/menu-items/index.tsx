import React from 'react'
import { useSelector } from 'react-redux'
import { DefaultRootStateProps, NavItemType } from 'types'
import { switchRoleRoutes } from 'utils/switchRoleRoutes'

// ==============================|| MENU ITEMS ||============================== //

const HandleItems = () => {
    const userRole = useSelector(
        (state: DefaultRootStateProps) => state.login?.user?.role
    )
    const [items, setItems] = React.useState<NavItemType>({})
    React.useEffect(() => {
        const { items } = switchRoleRoutes(userRole)

        setItems(items)
    }, [userRole])

    const menuItems: { items: NavItemType[] } = {
        items: [items],
    }
    return menuItems
}

export default HandleItems
