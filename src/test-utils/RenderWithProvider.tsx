import { Provider } from 'react-redux';
import { store } from '../store/store';

export const RenderWithProvider = (component: JSX.Element): JSX.Element => {
    return (
        <Provider store={store}>
            {component}
        </Provider>
    );
};