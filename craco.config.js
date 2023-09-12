module.exports = {
    devServer: {
        // public: 'www.regional-toll-qa.local:3000',
         public: 'www.tolls-vpn.gob.ve:9088',
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
