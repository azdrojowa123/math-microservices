import {Box, Button, Grid, makeStyles, MenuItem, TextField} from '@material-ui/core';
import { ChangeEvent, useState } from 'react';


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
        width: '40vh',
        height: '3vh'
    },
    form: {
        display: 'flex',
        width: '40vh',
    }
}));

interface AddTestingPersonFormI {
    adding: (duration: number, occurrence: boolean) => void;
}

export function AddingTestingPersonForm(props: AddTestingPersonFormI) {

    const {adding} = props;

    const durationArray = Array.from(Array(10).keys());
    const occurrenceArray = Array.from(Array(2).keys());
    const classes = useStyles();
    const [duration, setDuration] = useState<number>();
    const [occurrence, setOccurrence] = useState<boolean>();

    const addTestingPerson = () => {
        if (duration !== undefined && occurrence !== undefined) {
            adding(duration, occurrence);
        }
    };

    return (
        <>
            <Grid container direction={"row"} spacing={10}>
                <Grid item>
                    <TextField
                        id="standard-select-currency"
                        className={classes.form}
                        select
                        label="Czas trwania"
                        onChange={event => {setDuration(Number(event.target.value))}}
                        helperText="Please select your currency"
                    >
                        {durationArray.map((option) => (
                            <MenuItem key={option} value={option}>
                                {option}
                            </MenuItem>
                        ))}
                    </TextField>
                </Grid>
                <Grid item>
                    <TextField
                        id="standard-select-currency"
                        select
                        label="Wystąpienie"
                        onChange={event => {setOccurrence(event.target.value.toString() == '1')}}
                        helperText="Please select your currency"
                    >
                        {occurrenceArray.map((option) => (
                            <MenuItem key={option} value={option}>
                                {option}
                            </MenuItem>
                        ))}
                    </TextField>
                </Grid>
                <Grid item>
                    <Button className={classes.button} onClick={addTestingPerson} fullWidth>Zapisz</Button>
                </Grid>
            </Grid>
        </>
    );
}
