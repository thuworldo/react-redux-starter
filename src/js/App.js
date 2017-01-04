import './vendor_modules/css/normalize.css';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { Router, Route,  hashHistory } from 'react-router';
import reducer from './reducers';
import { syncHistoryWithStore } from 'react-router-redux';
// import routes from './routing/Routes';

var store; 
// switch devtools only in dev mod 
if (__DEV__) {
    store = createStore(reducer,  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());
} else {
    store = createStore(reducer);    
}
const history = syncHistoryWithStore( hashHistory, store); 


// temporary class to test config work
class Temporary extends React.Component {
    render() {
        return (
            <div>
                Temporary root comp
            </div>
        )
    }
}


ReactDOM.render(
    <Provider store={store} > 
        <Router history={history}>
            <Route path='*' component={Temporary} />
        </Router>
    </Provider>,
    document.getElementById('root')
);