import { Router } from 'react-router-dom';
import { history } from '../history';

export const RenderWithRouter = (component: JSX.Element): JSX.Element => {
    return (
        <Router history={history}>
            {component}
        </Router>
    );
};