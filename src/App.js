import { useContext, createContext } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

import { useLogin } from './routes/Login/services';

import Login from './routes/Login';
import Dishes from './routes/Dishes';
import './App.css'

const AuthContext = createContext({});

function ProvideAuth({ children }) {
    const auth = useLogin();
    return (
        <AuthContext.Provider value={{ ...auth }}>
            {children}
        </AuthContext.Provider>
    )
}

export default function App() {
    return (
        <Router>
            <ProvideAuth>
                    <div>
                        <Switch>
                            <Redirect exact from="/" to="login" />
                            <Route path="/login">
                                <Login />
                            </Route>
                            <PrivateRoute path="/dishes">
                                <Dishes />
                            </PrivateRoute>
                        </Switch>
                    </div>
            </ProvideAuth>
        </Router>
    )
}

function PrivateRoute({ children, ...rest }) {
    const { isValid } = useAuth();
    return (
        <Route
            {...rest}
            render={({ location }) =>
                isValid ? (
                    children
                ) : (
                    <Redirect
                        to={{
                            pathname: "/login",
                            state: { from: location }
                        }}
                    />
                )
            }
        />
    );
}

export function useAuth() {
    return useContext(AuthContext);
}
