module.exports = {
    devServer: {
        public: 'http://www.tolls-vpn.gob.ve:9088',
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
