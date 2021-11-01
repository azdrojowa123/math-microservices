import {Button, Grid, makeStyles, Typography} from '@material-ui/core';
import {useHistory} from "react-router-dom";
import * as React from "react";


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
        width: '20vw',
        height: '5vh'
    },
    element: {
        margin: '10px'
    }
}));

export function LandingPage() {

    const classes = useStyles();
    const history = useHistory();

    const routeChange = () => {
        history.push('/main-page');
    }

    return (
        <>
            {/*//<div className={classes.wrapper}>*/}
            <Grid
                container
                spacing={0}
                direction="column"
                alignItems="center"
                justifyContent="center"
                style={{
                    minHeight: '100vh',
                    background: 'linear-gradient(45deg, #C9E7E7 30%, #E5ECEC 90%)',
                    padding: '20px'
                }}
            >
                <Grid item>
                    <Typography variant="h3" component="div" className={classes.element}>
                        Welcome in application
                    </Typography>
                </Grid>
                <Grid item>
                    <Typography variant="h4" component="div" className={classes.element}>
                        At the time of application development (11.2021) calculations connected
                        to survival curve and logistic regression are available. Please click button below to enter
                        application.
                    </Typography>
                </Grid>
                {/*<Box width={'100%'}></Box>*/}
                    <Grid item>
                        <Button className={classes.button} onClick={routeChange}>Enter app →</Button>
                    </Grid>
                </Grid>
        </>
    );
}
