import {Button, Grid, makeStyles, Typography} from '@material-ui/core';
import {useHistory} from "react-router-dom";
import * as React from "react";


const useStyles = makeStyles(theme => ({
    wrapper: {
        /*        alignItems: 'center',
                justifyContent: 'space-between',
                height: '100vh', /!*  height of this element is equal to 80% of the viewport height. *!/
                display: 'flex',
                align: 'center',*/
        background: 'linear-gradient(45deg, #C9E7E7 30%, #E5ECEC 90%)',
        /*        marginRight: '50px',
                marginLeft: '50px'*/
    },
    button: {
        textAlign: 'center',
        background: 'linear-gradient(45deg, #667275 30%, #d9d7d7 90%)',
        color: '#FFFFFF',
        '&:hover': {
            backgroundColor: '#A8AEAE',
        },
        margin: '20px',
        width: '20vw',
        height: '5vh'
    },
    element: {
        margin: '30px'
    }
}));

export function MainPage() {

    const classes = useStyles()
    const history = useHistory();

    return (
        <>
            <div className={classes.wrapper}>
                <Grid
                    container
                    spacing={0}
                    direction="column"
                    alignItems="center"
                    justifyContent="center"
                    style={{minHeight: '100vh'}}
                >
                    <Grid item>
                        <Typography variant="h3" component="div" className={classes.element}>
                            Select calculation
                        </Typography>
                    </Grid>
                    <Grid item>
                        <Button variant='contained' className={classes.button} onClick={() => {
                            history.push("/calc/survival-curve");
                        }}>survival curve</Button>
                        <Button variant='contained' className={classes.button} onClick={() => {
                            history.push("/calc/logistic-regression");
                        }}>Obesity level with logistic regression</Button>
                    </Grid>
                </Grid>
            </div>


        </>
    )

}
