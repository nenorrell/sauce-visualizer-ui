A Swagger UI esque visualizer for [Sauce API](https://github.com/nenorrell/sauce)


# Usage
Consuming in Sauce API would look similar to: 

```javascript
    import { visualizerUI, setupVisualizerUI } from "@sauce-api/visualizer-ui";

    setupVisualizerUI(this.app);
    this.app.get("/docs", async (req, res, next)=>{
        const appRoutes = await new Routes(sauceConfig)
        .getFormattedRoutes(true);

        const ui = await visualizerUI({
            appRoutes,
            appName: "Visualizer",
            apiBaseUrl: process.env.REACT_APP_BASE_URL,
            apiHealthcheckPath: process.env.REACT_APP_DOCS_HEALTHCHECK_ENDPOINT,
            defaultTheme: "dark",
            brandIcon: "bullseye",
            brandImageUrl: "https://dev.w3.org/SVG/tools/svgweb/samples/svg-files/android.svg"
        });
        res.send(ui);
    });
```



# Options

## Visualizer config

### Example 
```javascript
     import { VisualizerConfig } from "./@types/VisualizerConfig";

    const visualizerConfig = {
        appRoutes: [],
        appName: "Visualizer",
        apiBaseUrl: process.env.REACT_APP_BASE_URL,
        apiHealthcheckPath: process.env.REACT_APP_DOCS_HEALTHCHECK_ENDPOINT,
        defaultTheme: "dark",
        brandIcon: "bullseye",
        brandImageUrl: "https://dev.w3.org/SVG/tools/svgweb/samples/svg-files/android.svg"
    };
```

| Config Property | Description |
| ------ | ------ |
| appRoutes | An Array of formatted Sauce API route objects. See  [Sauce API](https://github.com/nenorrell/sauce) for details on formatted routes|
| appName | The App name that will be displayed in the docs UI |
| apiBaseUrl | The base URL for the API you're displaying docs for. Ex: `https://<some-sauce-api>.com` |
| apiHealthcheckPath | If you have a healthcheck endpoint, you can supply it here and the UI will do a healthcheck for you. This value will be appended to the `apiBaseUrl`. Example: `/healthcheck` |
| defaultTheme | The default theme to display |
| brandIcon | You can supply a (free) font-awesome icon name here to display in the upper left corner. |
| brandImageUrl | This is an alternative to the `brandIcon` value. You can supply your own image here to be displayed in the upper left corner |


## Supported Route Icons
| Icon | Requirements |
| ------ | ------ |
| Admin Shield | Expects a route to have a policy named `isAdmin` |
| Authentication Lock | Expects a route to have a policy named `isAuthenticated` |


# Development
(_Requires Docker_)

# Running
Run `make run` and the app will come up on `http://localhost:3001`

# Bundling
Run `make package`

# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).
