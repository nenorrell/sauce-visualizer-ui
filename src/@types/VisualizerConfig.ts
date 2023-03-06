import { FormattedRoute, RouteGrouping } from "@sauce-api/core";
import { IconName } from "@fortawesome/free-solid-svg-icons";

export interface VisualizerConfig {
    appName ?:string
    apiBaseUrl ?:string
    apiHealthcheckPath ?:string
    // apiDocsPath ?:string
    defaultTheme ?:string
    appRoutes :(RouteGrouping | FormattedRoute)[]
    /** Mutually exclusive with brandImageUrl */
    brandIcon ?:IconName
    /** Mutually exclusive with brandIcon */
    brandImageUrl ?:string
    browserIconUrl ?:string
    /** Shows up in the hero */
    welcomeMessage ?:string
}
