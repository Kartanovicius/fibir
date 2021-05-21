module.exports = {
    future: {
        removeDeprecatedGapUtilities: true
    },
    plugins: [
        require('@tailwindcss/custom-forms'),
    ],
    theme: {
        fill: (theme) => ({
            red: theme('colors.red.primary')
        }),
        colors: {
            white: '#ffffff',
            blue: {
                medium: '#067BB4',
                light: '#048CC5'
            },
            black: {
                primary: '#161616',
                light: '#262626',
                faded: '#00000059',
            },
            gray: {
                base: '#616161',
                100: '#afafaf'
            },
            red: {
                primary: '#D3584E',
                800: '#9a1d1b',
                500: '#ef4545'
            },
            yellow: {
                600: '#d87706',
                500: '#f69d0d'
            },
            pink: {
                500: '#eb4897'
            },
            green: {
                500: '#7abc1e'
            }
        }
    }
};