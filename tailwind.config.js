module.exports = {
    content: [
        "./src/**/*.{js,ts,jsx,tsx}",
        "./node_modules/daisy-ui-react-components/**/*.{js,ts,jsx,tsx}"
    ],
    plugins: [require("daisyui")],
    daisyui: {
        themes: [
            "light",
            "dark",
            "cyberpunk",
            "corporate",
            "cupcake",
            "business",
            "bumblebee",
            "dracula",
            "halloween",
            "winter",
            "lofi",
            "emerald",
            "synthwave",
            "fantasy",
            "night"
        ],
    }
};

