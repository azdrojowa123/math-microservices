import {Button, Grid, makeStyles, Typography} from '@material-ui/core';
import {useHistory} from "react-router-dom";
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import * as React from "react";


const useStyles = makeStyles(theme => ({
    wrapper: {
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh', /*  height of this element is equal to 80% of the viewport height. */
        display: 'flex',
        align: 'center',
        backgroundImage: `url(${"../static/image.jpg"})`,
        //background: 'linear-gradient(45deg, #C9E7E7 30%, #E5ECEC 90%)'
    },
    button: {
        textAlign: 'center',
        background: 'linear-gradient(45deg, #667275 30%, #d9d7d7 90%)',
        color: '#f5fcfc',
        '&:hover': {
            backgroundColor: '#A8AEAE',
        },
        width: '20vw',
        height: '5vh'
    },
    element: {
        margin: '20px'
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
            <Grid
                container
                spacing={0}
                direction="column"
                alignItems="center"
                justifyContent="center"
                style={{
                    minHeight: '100vh',
                    background: 'linear-gradient(45deg, #C9E7E7 30%, #E5ECEC 90%)',
                    padding: '30px'
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
                        to survival curve and obesity level based on logistic regression are available. Please click
                        button below to enter
                        application.
                    </Typography>
                </Grid>
                    <Grid item>
                        <Button variant='contained' className={classes.button} onClick={routeChange}
                                endIcon={<ArrowForwardIcon/>}>Enter app</Button>
                    </Grid>
                </Grid>
        </>
    );
}
