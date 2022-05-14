import React, {ReactElement} from 'react';
import { ThemeContext } from '../../modules/ThemeContext';

interface IRouteList {
    routes :any[]
}

export const RouteList :React.FC<IRouteList> = ({routes}) :ReactElement =>{
    const themeConfig = React.useContext(ThemeContext);
    console.log(themeConfig?.theme)
    
    return (
        <div>
            <p>Hello</p>
        </div>
    )

}