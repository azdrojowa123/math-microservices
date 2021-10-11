import {createBrowserHistory, Location, State} from 'history';
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

    function calculatePathDepth(location: Location<State>) {
        return location.pathname.split('/').filter((n: any) => n !== '').length;
    }

    function getPathDepth(location: Location<State>) {
        console.log("LOCATION")
        console.log(location)
        let result: boolean = calculatePathDepth(location) - prevDepth >= 0;
        console.log("stara")
        console.log(prevDepth)
        console.log("nowa")
        console.log(calculatePathDepth(location))
        console.log(result)
        prevDepth = calculatePathDepth(location);
        return result;
    }

    return (
        <Router history={history}>
            <Route render={({location}) =>
                <TransitionGroup>
                    <CSSTransition key={location.pathname.split('/')[1]} timeout={timeout}
                                   classNames={getPathDepth(location) ? 'pageSliderLeft' : 'pageSliderRight'} mountOnEnter={true}
                                   unmountOnExit={true}>
                        <Switch location={location}>
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
