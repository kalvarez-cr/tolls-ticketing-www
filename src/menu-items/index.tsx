import { NavItemType } from 'types'
import Sample from './Sample'

// ==============================|| MENU ITEMS ||============================== //

const handleItems = () => {
    const menuItems: { items: NavItemType[] } = {
        items: [Sample],
    }
    return menuItems
}

export default handleItems
