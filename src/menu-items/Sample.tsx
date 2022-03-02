// third-party
import { FormattedMessage } from 'react-intl'

// assets
import { IconBrandChrome } from '@tabler/icons'

// constant
const icons = {
    IconBrandChrome,
}

// ==============================|| SAMPLE PAGE & DOCUMENTATION MENU ITEMS ||============================== //

const Sample = {
    id: 'sample-docs-roadmap',
    type: 'group',
    children: [
        {
            id: 'sample-page',
            title: <FormattedMessage id="sample-page" />,
            type: 'item',
            url: '/sample-page',
            icon: icons.IconBrandChrome,
            breadcrumbs: false,
        },
    ],
}

export default Sample
