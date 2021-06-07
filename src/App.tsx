import {
    Switch,
    Route,
    Redirect
} from 'react-router-dom'
import Details from './components/Details/Details'
import Search from './components/Search/Search'
import { URLs } from './history'

function App (): JSX.Element {
    return (
        <Switch>
            <Route path={URLs.details}>
                <Details />
            </Route>
            <Route exact path={URLs.base}>
                <Search />
            </Route>
            <Redirect to={URLs.base} />
        </Switch>
    )
}

export default App
