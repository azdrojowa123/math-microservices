import {createBrowserHistory} from 'history';
import React from 'react';
import {Route, Router, Switch} from 'react-router-dom';
import {CSSTransition, TransitionGroup} from 'react-transition-group';
import {SurvivalCurveCalc} from '../src/pages/survival-curve/SurvivalCurveCalc';
import {LandingPage} from '../src/pages/startingPages/LandingPage';
import {MainPage} from '../src/pages/startingPages/MainPage';
import './page-transitions/slideTransition.css';

function App() {

    const timeout = {enter: 800, exit: 500};

    const history = createBrowserHistory();
    let prevDepth = calculatePathDepth(history.location);

    function calculatePathDepth(location: any) {
        return location.pathname.split('/').filter((n: any) => n !== '').length;
    }

    function getPathDepth() {
        let result: boolean = calculatePathDepth(history.location) - prevDepth >= 0;
        prevDepth = calculatePathDepth(history.location);
        return result;
    }

    return (
        <Router history={history}>
            <Route render={() =>
                <TransitionGroup>
                    <CSSTransition key={history.location.pathname.split('/')[1]} timeout={timeout}
                                   classNames={getPathDepth() ? 'pageSliderLeft' : 'pageSliderRight'}
                                   mountOnEnter={true}
                                   unmountOnExit={true}>
                        <Switch location={history.location}>
                            <Route path="/" exact component={LandingPage}/>
                            <Route path="/main-page" component={MainPage}/>
                            <Route path="/calc/survival-curve" component={SurvivalCurveCalc}/>
                        </Switch>
                    </CSSTransition>
                </TransitionGroup>
            }/>
        </Router>
    );
}

export default App;
