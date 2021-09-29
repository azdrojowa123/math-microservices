import Typography from '@material-ui/core/Typography';
import { Button, makeStyles } from '@material-ui/core';
import { Col, Row, Grid } from "react-native-easy-grid";
import {CSSTransition} from 'react-transition-group';
import {
    Switch,
    Route,
    BrowserRouter,
    useHistory,
    Link
} from "react-router-dom";


const useStyles = makeStyles(theme => ({
    wrapper: {
        alignItems: 'center',
        justifyContent: 'space-between',
        height: '100vh', /*  height of this element is equal to 80% of the viewport height. */
        display: 'flex',
        align: 'center',
        marginRight: '50px',
        marginLeft: '50px'
    },
    button: {
        textAlign: 'center',
        background: 'linear-gradient(45deg, #667275 30%, #d9d7d7 90%)',
        color: '#FFFFFF',
        '&:hover': {
            backgroundColor: '#A8AEAE',
        },
        width: '20%', /* 60% of body width (100vw) */
        height: '5%'
    }
}));

export function MainPage() {

    const classes = useStyles()
    const history = useHistory();

    return (
        <>
            <div className={classes.wrapper}>
                <Button className={classes.button} onClick={() => {history.push("/calc/survival-curve");}}>survival curve</Button>
                <Button className={classes.button}>Go to app !</Button>
                <Button className={classes.button}>Go to app !</Button>
            </div>
        </>
    );
}
