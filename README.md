A Swagger UI esque visualizer for [Apollo API](https://github.com/nenorrell/apollo)


# Usage
Consuming in Apollo API would look similar to: 

```javascript
    import { visualizerUI, setupVisualizerUI } from "@apollo-api/visualizer-ui";

    const visualizerConfig = {
        appRoutes: [], // Apollo API formatted routes
        appName: "Visualizer",
        apiBaseUrl: process.env.REACT_APP_BASE_URL,
        apiHealthcheckPath: process.env.REACT_APP_DOCS_HEALTHCHECK_ENDPOINT,
        defaultTheme: "dark",
        brandIcon: "bullseye",
        brandImageUrl: "https://dev.w3.org/SVG/tools/svgweb/samples/svg-files/android.svg"
    };

    setupVisualizerUI(this.app);
    this.app.get("/docs", async (req, res, next)=>{
        const appRoutes = await new Routes(apolloConfig).getFormattedRoutes(true);
        const tpl = await visualizerUI(visualizerConfig);
        res.send(tpl);
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
| appRoutes | An Array of formatted Apollo API route objects. See  [Apollo API](https://github.com/nenorrell/apollo) for details on formatted routes|
| appName | The App name that will be displayed in the docs UI |
| apiBaseUrl | The base URL for the API you're displaying docs for. Ex: `https://<some-apollo-api>.com` |
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
