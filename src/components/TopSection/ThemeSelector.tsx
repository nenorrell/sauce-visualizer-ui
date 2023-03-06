import React, { useContext, useState } from "react";
import { VisualizerConfig } from "../../@types/VisualizerConfig";
import { ConfigContext } from "../../modules/ConfigContext";
import { v4 as uuidv4 } from "uuid";
import { Select } from "daisy-ui-react-components";

export const ThemeSelector = ()=>{
    const config = useContext<VisualizerConfig>(ConfigContext);
    const theme = localStorage.getItem("theme") || config.defaultTheme || "light";
    const supportedThemes :string[] = [
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
    ].sort();
    const [currentTheme, setCurrentTheme] = useState<string>(theme);
    document.documentElement.setAttribute("data-theme", currentTheme);

    const handleThemeChange = (e :React.ChangeEvent<HTMLSelectElement>) => {
        const theme :string = e.currentTarget.value;
        localStorage.setItem("theme", theme);
        setCurrentTheme(theme);
    };

    return (
        <Select variant="accent" className="w-full max-w-xs" value={currentTheme} onChange={handleThemeChange}>
            {
                supportedThemes.map(theme => (
                    <option key={uuidv4()} value={theme}>{theme}</option>
                ))
            }
        </Select>
    );
};
