module.exports = {
    devServer: {
        public: 'http://www.regional-toll-qa.local',
        disableHostCheck: true,
        port: 3000,
    },
    // devServer: {
    //     public: 'http://www.regional-occidente-prod.vpn',
    //     disableHostCheck: true,
    //     port: 3000,
    // },

    style: {
        postcss: {
            plugins: [require('tailwindcss'), require('autoprefixer')],
        },
    },
    babel: {
        loaderOptions: {
            ignore: ['./node_modules/mapbox-gl/dist/mapbox-gl.js'],
        },
    },
}
