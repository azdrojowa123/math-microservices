import { Button, makeStyles } from '@material-ui/core';
import { useHistory } from "react-router-dom";


const useStyles = makeStyles(theme => ({
    wrapper: {
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh', /*  height of this element is equal to 80% of the viewport height. */
        display: 'flex',
        align: 'center',
        background: 'linear-gradient(45deg, #C9E7E7 30%, #E5ECEC 90%)'
    },

    button: {
        textAlign: 'center',
        background: 'linear-gradient(45deg, #239890 30%, #47EEE3 90%)',
        color: '#1a0000',
        '&:hover': {
            backgroundColor: '#A8AEAE',
        },
        width: '20%', /* 60% of body width (100vw) */
        height: '5%'
    }
}));

export function LandingPage() {

    const classes = useStyles();
    const history = useHistory();

    const routeChange = () =>{
        history.push('/main-page');
    }

    return (
        <>
            <div className={classes.wrapper}>
                <Button className={classes.button} onClick={routeChange} fullWidth>Go to app  →</Button>
            </div>
        </>
    );
}
