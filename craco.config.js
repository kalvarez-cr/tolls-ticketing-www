module.exports = {
    devServer: {
        public: 'www.regional-toll-qa.local',
        disableHostCheck: true,
        port: 9088
    },

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
