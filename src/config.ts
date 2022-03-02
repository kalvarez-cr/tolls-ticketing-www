import { PaletteMode } from '@material-ui/core';

const config: {
    basename: string;
    defaultPath: string;
    fontFamily: string;
    borderRadius: number;
    outlinedFilled: boolean;
    theme: PaletteMode | any;
    presetColor: string;
    i18n: string;
    rtlLayout: boolean;
    jwt: {
        secret: string;
        timeout: string;
    };
    firebase: {
        apiKey: string;
        authDomain: string;
        projectId: string;
        storageBucket: string;
        messagingSenderId: string;
        appId: string;
        measurementId: string;
    };
    auth0: {
        client_id: string;
        domain: string;
    };
} = {
    // basename: only at build time to set, and Don&apos;t add '/' at end off BASENAME for breadcrumbs, also Don&apos;t put only '/' use blank('') instead,
    // like '/berry-material-react/react/default'
    basename: '',
    defaultPath: '/',
    fontFamily: `'Roboto', sans-serif`,
    borderRadius: 12,
    outlinedFilled: true,
    theme: window.localStorage.getItem('theme') ? window.localStorage.getItem('theme') : 'light', // light, dark
    presetColor: 'default', // default, theme1, theme2, theme3, theme4, theme5, theme6
    // 'en' - English, 'fr' - French, 'ro' - Romanian, 'zh' - Chinese
    i18n: 'en',
    rtlLayout: false,
    jwt: {
        secret: 'SECRET-KEY',
        timeout: '1 days'
    },
    firebase: {
        apiKey: 'AIzaSyBernKzdSojh_vWXBHt0aRhf5SC9VLChbM',
        authDomain: 'berry-material-react.firebaseapp.com',
        projectId: 'berry-material-react',
        storageBucket: 'berry-material-react.appspot.com',
        messagingSenderId: '901111229354',
        appId: '1:901111229354:web:a5ae5aa95486297d69d9d3',
        measurementId: 'G-MGJHSL8XW3'
    },
    auth0: {
        client_id: 'HvYn25WaEHb7v5PBT7cTYe98XATStX3r',
        domain: 'demo-localhost.us.auth0.com'
    }
};

export default config;
