import {Provider} from "react-redux";
import {HashRouter, Route} from "react-router-dom";
import React, {ReactElement} from "react";
import {QueryParamProvider} from "use-query-params";
import ErrorBoundary from "./common/ErrorBoundary";
import {CssBaseline} from "@material-ui/core";
import {store} from "../store/store";
import {App} from "./App";
import theme from "../theme/theme";
import ThemeProvider from "@material-ui/styles/ThemeProvider";

const AppContainer: React.FC = (): ReactElement => {
    return (
        <ErrorBoundary>
            <Provider store={store}>
                <HashRouter>
                    <QueryParamProvider ReactRouterRoute={Route}>
                        <ThemeProvider theme={theme}>
                            <CssBaseline/>
                            <App/>
                        </ThemeProvider>
                    </QueryParamProvider>
                </HashRouter>
            </Provider>
        </ErrorBoundary>
    )
};

export default AppContainer;