/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./src/**/*.{js, ts, jsx, tsx}"],
    theme: {
        extend: {
            backgroundImage: {
                'light-pattern': "url('/assets/patternpad1.svg')",
                'dark-pattern': "url('/assets/patternpad2.svg')",
            }
        }
    },
    plugins: [require('daisyui')],
    daisyui: {
        styled: true,
        themes: true,
        base: true,
        utils: true,
        logs: true,
        rtl: false,
        prefix: "",
        darkTheme: "dark",
    },
}