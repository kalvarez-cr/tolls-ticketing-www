module.exports = {
    devServer: {
        public: 'www.regional-toll-qa.local:3000',
        disableHostCheck: true,
        port: 3000
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
