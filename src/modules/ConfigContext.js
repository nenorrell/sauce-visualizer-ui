import React from 'react';

const ConfigContext = React.createContext();

let url = `${window.location.protocol}//${window.location.host}`;
if(url.includes("localhost")){
    url = "http://localhost:3035";
}

const config = {
    API_SERVICE: url
}

const ConfigProvider = (props) => {
    return (
        <ConfigContext.Provider value={config}>
            {props.children}
        </ConfigContext.Provider>
    );
}

export { ConfigContext, ConfigProvider };