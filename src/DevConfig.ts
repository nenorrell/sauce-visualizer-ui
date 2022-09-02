import { VisualizerConfig } from "./@types/VisualizerConfig";

const fetchDocs = async () => {
    try {
        const res = await fetch(`${process.env.REACT_APP_BASE_URL}${process.env.REACT_APP_DOCS_ENDPOINT}`);
        return await res.json();
    }
    catch (e) {
        console.error(e);
    }
};

export const devConfig = async () :Promise<VisualizerConfig> => {
    return {
        appRoutes: [(await fetchDocs()).response],
        appName: "Visualizer",
        apiBaseUrl: process.env.REACT_APP_BASE_URL,
        // apiDocsPath: process.env.REACT_APP_DOCS_ENDPOINT,
        apiHealthcheckPath: process.env.REACT_APP_DOCS_HEALTHCHECK_ENDPOINT,
        defaultTheme: "dark",
        brandIcon: "bullseye",
        brandImageUrl: "https://dev.w3.org/SVG/tools/svgweb/samples/svg-files/android.svg"
    };
};
