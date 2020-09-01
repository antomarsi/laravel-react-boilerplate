import React from "react";
import {
    Route,
    Switch,
    RouteProps,
    Redirect,
    RouteComponentProps
} from "react-router-dom";
import { useSelector } from "react-redux";
import { ConnectedRouter, RouterState } from "connected-react-router";
import history from "./history";
import { ApplicationState } from "./../store";
import NotFoundPage from "./../pages/NotFound/index";
import LoginPage from "./../pages/Login";
import Header from "./../components/Header";
import { Container, Row } from "react-bootstrap";
import Home from "./../pages/Home/index";
import Dashboard from "../pages/Dashboard";
import LoginSuccess from "./../pages/Login/LoginSuccess";
import Sidebar from "./../components/Sidebar";
import Notifications from "../components/Notifications";
import { SidebarWrapper, ContentPageWrapper } from "./styles";

const UnloggedRoute: React.SFC<RouteProps> = ({ component, ...rest }: any) => {
    const NotAuthenticated = useSelector(
        (state: ApplicationState) => !state.auth.token
    );
    return (
        <Route
            {...rest}
            render={(props: RouteComponentProps) =>
                NotAuthenticated ? (
                    React.createElement(component, props)
                ) : (
                    <Redirect
                        to={{
                            pathname: "/dashboard",
                            state: { from: props.location }
                        }}
                    />
                )
            }
        />
    );
};

const PrivateRoute: React.SFC<RouteProps> = ({ component, ...rest }: any) => {
    const isAuthenticated = useSelector(
        (state: ApplicationState) => !!state.auth.token
    );
    return (
        <Route
            {...rest}
            render={(props: RouteComponentProps) =>
                isAuthenticated ? (
                    <Row>
                        <SidebarWrapper>
                            <Sidebar />
                        </SidebarWrapper>
                        <ContentPageWrapper>
                            {React.createElement(component, props)}
                        </ContentPageWrapper>
                    </Row>
                ) : (
                    <Redirect
                        to={{
                            pathname: "/login",
                            state: { from: props.location }
                        }}
                    />
                )
            }
        />
    );
};

const Routes: React.SFC<{}> = props => {
    const location = useSelector(
        (state: ApplicationState) => (state.router as RouterState).location
    );
    return (
        <ConnectedRouter history={history}>
            <Header />
            <Container fluid className="h-100">
                <Notifications />
                <Switch location={location}>
                    <PrivateRoute
                        exact
                        path="/dashboard"
                        component={Dashboard}
                    />
                    <UnloggedRoute
                        exact
                        path="/login/:provider/success"
                        component={LoginSuccess}
                    />
                    <UnloggedRoute exact path="/login" component={LoginPage} />
                    <Route exact path="/" component={Home} />
                    <Route path="*" component={NotFoundPage} />
                </Switch>
            </Container>
        </ConnectedRouter>
    );
};

export default Routes;
