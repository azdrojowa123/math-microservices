import {Box, Button, Grid, makeStyles, MenuItem, TextField, Typography} from "@material-ui/core";
import * as React from "react";
import {useRef} from "react";


const useStyles = makeStyles(theme => ({
    wrapper: {
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh', /*  height of this element is equal to 80% of the viewport height. */
        display: 'flex',
        align: 'center',
    },

    button: {
        textAlign: 'center',
        background: 'linear-gradient(45deg, #239890 30%, #47EEE3 90%)',
        color: '#1a0000',
        '&:hover': {
            backgroundColor: '#A8AEAE',
        },
        marginTop: '10px',
        marginBottom: '10px',
        width: '40vh',
        height: '3vh'
    },
    form: {
        display: 'flex',
        width: '10vw',
    },
    formLong: {
        display: 'flex',
        width: '13vw',
    },
}));

export function AddTestCase() {

    const classes = useStyles()
    const formRef = useRef();
    const gender = ['Female', 'Male']
    const family_history_with_overweight = ['yes', 'no']
    const FAVC = ['yes', 'no']
    const CAEC = ['NO', 'Sometimes', 'Frequently', 'Always']
    const SMOKE = ['yes', 'no']
    const SCC = ['yes', 'no']
    const CALC = ['NO', 'Sometimes', 'Frequently', 'Always']
    const MTRANS = ['Automobile', 'Motorbike', 'Bike', 'Public_Transportation', 'Walking']

    const submitTestCase = () => {

    }

    return (
        <>
            <Grid container direction={"row"} spacing={10}>
                <Grid item xs={10}>
                    <Box borderRadius={8}>
                        <Typography variant="h1" component="div">
                            Please complete test case with proper values;
                        </Typography>
                    </Box>
                </Grid>
            </Grid>
            <Grid container direction={"row"} spacing={10}>
                <Grid item>
                    <TextField
                        id="outlined-start-adornment"
                        label="Gender"
                        className={classes.form}
                        select
                        defaultValue={""}
                        onChange={event => {
                            //seTimeUnit(event.target.value.toString())
                        }}
                    >
                        {gender.map((option) => (
                            <MenuItem key={option} value={option}>
                                {option}
                            </MenuItem>
                        ))}
                    </TextField>
                </Grid>
                <Grid item>
                    <TextField
                        id="outlined-start-adornment"
                        label="Age"
                        className={classes.form}
                        type="number"
                        defaultValue={""}
                        onChange={event => {
                            //seTimeUnit(event.target.value.toString())
                        }}
                    >
                    </TextField>
                </Grid>
                <Grid item>
                    <TextField
                        id="outlined-start-adornment"
                        label="Height"
                        className={classes.form}
                        type="number"
                        defaultValue={""}
                        onChange={event => {
                            //seTimeUnit(event.target.value.toString())
                        }}
                    >
                    </TextField>
                </Grid>
                <Grid item>
                    <TextField
                        id="outlined-start-adornment"
                        label="Weight"
                        className={classes.form}
                        type="number"
                        defaultValue={""}
                        onChange={event => {
                            //seTimeUnit(event.target.value.toString())
                        }}
                    >
                    </TextField>
                </Grid>
                <Grid item>
                    <TextField
                        id="outlined-start-adornment"
                        label="Family history with overweight"
                        className={classes.formLong}
                        select
                        defaultValue={""}
                        onChange={event => {
                            //seTimeUnit(event.target.value.toString())
                        }}
                    >
                        {family_history_with_overweight.map((option) => (
                            <MenuItem key={option} value={option}>
                                {option}
                            </MenuItem>
                        ))}
                    </TextField>
                </Grid>
                <Grid item>
                    <TextField
                        id="outlined-start-adornment"
                        label="FAVC"
                        className={classes.form}
                        select
                        defaultValue={""}
                        onChange={event => {
                            //seTimeUnit(event.target.value.toString())
                        }}
                    >
                        {FAVC.map((option) => (
                            <MenuItem key={option} value={option}>
                                {option}
                            </MenuItem>
                        ))}
                    </TextField>
                </Grid>
                <Grid item>
                    <TextField
                        id="outlined-start-adornment"
                        label="FCVC"
                        className={classes.form}
                        type="number"
                        onChange={event => {
                            //seTimeUnit(event.target.value.toString())
                        }}
                    >
                    </TextField>
                </Grid>
            </Grid>
            <Grid container direction={"row"} spacing={10}>
                <Grid item>
                    <TextField
                        id="outlined-start-adornment"
                        label="NCP"
                        className={classes.form}
                        type="number"
                        onChange={event => {
                            //seTimeUnit(event.target.value.toString())
                        }}
                    >
                    </TextField>
                </Grid>
                <Grid item>
                    <TextField
                        id="outlined-start-adornment"
                        label="CAEC"
                        className={classes.form}
                        select
                        defaultValue={""}
                        onChange={event => {
                            //seTimeUnit(event.target.value.toString())
                        }}
                    >
                        {CAEC.map((option) => (
                            <MenuItem key={option} value={option}>
                                {option}
                            </MenuItem>
                        ))}
                    </TextField>
                </Grid>
                <Grid item>
                    <TextField
                        id="outlined-start-adornment"
                        label="SMOKE"
                        className={classes.form}
                        select
                        defaultValue={""}
                        onChange={event => {
                            //seTimeUnit(event.target.value.toString())
                        }}
                    >
                        {SMOKE.map((option) => (
                            <MenuItem key={option} value={option}>
                                {option}
                            </MenuItem>
                        ))}
                    </TextField>
                </Grid>
                <Grid item>
                    <TextField
                        id="outlined-start-adornment"
                        label="CH20"
                        className={classes.form}
                        type="number"
                        onChange={event => {
                            //seTimeUnit(event.target.value.toString())
                        }}
                    >
                    </TextField>
                </Grid>
                <Grid item>
                    <TextField
                        id="outlined-start-adornment"
                        label="SCC"
                        className={classes.form}
                        select
                        defaultValue={""}
                        onChange={event => {
                            //seTimeUnit(event.target.value.toString())
                        }}
                    >
                        {SCC.map((option) => (
                            <MenuItem key={option} value={option}>
                                {option}
                            </MenuItem>
                        ))}
                    </TextField>
                </Grid>
                <Grid item>
                    <TextField
                        id="outlined-start-adornment"
                        label="FAF"
                        className={classes.form}
                        type="number"
                        onChange={event => {
                            //seTimeUnit(event.target.value.toString())
                        }}
                    >
                    </TextField>
                </Grid>
                <Grid item>
                    <TextField
                        id="outlined-start-adornment"
                        label="TUE"
                        className={classes.form}
                        type="number"
                        onChange={event => {
                            //seTimeUnit(event.target.value.toString())
                        }}
                    >
                    </TextField>
                </Grid>
            </Grid>
            <Grid container direction={"row"} spacing={10}>
                <Grid item>
                    <TextField
                        id="outlined-start-adornment"
                        label="CALC"
                        className={classes.form}
                        select
                        defaultValue={""}
                        onChange={event => {
                            //seTimeUnit(event.target.value.toString())
                        }}
                    >
                        {CALC.map((option) => (
                            <MenuItem key={option} value={option}>
                                {option}
                            </MenuItem>
                        ))}
                    </TextField>
                </Grid>
                <Grid item>
                    <TextField
                        id="outlined-start-adornment"
                        label="MTRANS"
                        className={classes.form}
                        select
                        defaultValue={""}
                        onChange={event => {
                            //seTimeUnit(event.target.value.toString())
                        }}
                    >
                        {MTRANS.map((option) => (
                            <MenuItem key={option} value={option}>
                                {option}
                            </MenuItem>
                        ))}
                    </TextField>
                </Grid>
                <Grid item>
                    <Button className={classes.button} type={'submit'} onClick={submitTestCase}>
                        Add case</Button>
                </Grid>
            </Grid>
        </>
    )
}