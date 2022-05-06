module.exports = {
    devServer: {
        public: 'http://www.tolls-vpn.gob.ve:9212',
        disableHostCheck: true,
        port: 9212
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
