import {Button, Grid, makeStyles, MenuItem, TextField} from '@material-ui/core';
import {useEffect, useState} from 'react';


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

    const occurrenceArray = Array.from(Array(2).keys());
    const timeUnits = ["Miesiąc", "Dzień", "Rok"]
    const classes = useStyles();
    const [durationArray, setDurationArray] = useState<number[]>();
    const [duration, setDuration] = useState<number>();
    const [canAdding, setCanAdding] = useState<boolean>(false);
    const [timeUnit, seTimeUnit] = useState<string>();
    const [entireDuration, setEntireDuration] = useState<number>();
    const [occurrence, setOccurrence] = useState<boolean>();

    useEffect(() => {
        if (timeUnit !== undefined && entireDuration !== undefined) {
            setDurationArray(Array.from(Array(entireDuration).keys()))
            setCanAdding(true)
        }
    })

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
                        label="Całkowity czas trwania próby"
                        onChange={event => {
                            setEntireDuration(Number(event.target.value))
                        }}
                    />
                </Grid>
                <Grid item>
                    <TextField
                        id="outlined-start-adornment"
                        label="Jednostka czasu"
                        select
                        onChange={event => {
                            seTimeUnit(event.target.value.toString())
                        }}
                    >
                        {timeUnits.map((option) => (
                            <MenuItem key={option} value={option}>
                                {option}
                            </MenuItem>
                        ))}
                    </TextField>
                </Grid>
            </Grid>

            {
                canAdding && durationArray !== undefined &&
                <Grid container direction={"row"} spacing={10}>
                    <Grid item>
                        <TextField
                            id="standard-select-currency"
                            className={classes.form}
                            select
                            label="Czas trwania"
                            onChange={event => {
                                setDuration(Number(event.target.value))
                            }}
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
                            onChange={event => {
                                setOccurrence(event.target.value.toString() == '1')
                            }}
                        >
                            {occurrenceArray.map((option) => (
                                <MenuItem key={option} value={option}>
                                    {option}
                                </MenuItem>
                            ))}
                        </TextField>
                    </Grid>
                    <Grid item>
                        <Button className={classes.button} onClick={addTestingPerson} fullWidth>Dodaj przypadek</Button>
                    </Grid>
                </Grid>
            }

        </>
    );
}
