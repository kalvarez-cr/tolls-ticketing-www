module.exports = {
    devServer: {
        public: 'www.peajes.local:9088',
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
