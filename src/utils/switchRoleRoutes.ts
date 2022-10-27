import { RouteObject } from 'react-router'
import { NavItemType } from 'types'
import {
    admin_items,
    account_manager_items,
    report_viewer_items,
} from '../menu-items/Sample'
import {
    adminRoutes,
    accountManagerRoutes,
    defaultRoutes,
    ReportViewerRoutes,
} from '../routes/MainRoutes'

interface switchRoleReturn {
    items: NavItemType
    routes: RouteObject
    path: string
}

export const switchRoleRoutes = (role): switchRoleReturn => {
    switch (role) {
        case 'crm_user':
            return {
                items: admin_items,
                routes: adminRoutes,
                path: adminRoutes.path,
            }

        case ' administrator':
            return {
                items: admin_items,
                routes: adminRoutes,
                path: '/',
            }

        case 'account_manager':
            return {
                items: account_manager_items,
                routes: accountManagerRoutes,
                path: accountManagerRoutes.children[0].path,
            }
        case 'report_viewer':
            return {
                items: report_viewer_items,
                routes: ReportViewerRoutes,
                path: ReportViewerRoutes.children[0].path,
            }
        default:
            return {
                items: {},
                routes: defaultRoutes,
                path: '/',
            }
    }
}
