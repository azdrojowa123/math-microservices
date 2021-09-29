import { Box, Button, makeStyles, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@material-ui/core';
import * as React from 'react';
import { useState } from 'react';
import { AddingTestingPersonForm } from './AddingTestingPersonForm';
import StepLineChart from './StepLineChart';

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
    },
    form: {
        display: 'flex',
        flexFlow: 'column',
        height: '5%'
    }
}));

interface TestingPerson {
    id: number,
    duration: number,
    occurrence: boolean
}

export function SurvivalCurveCalc() {

    const [rows, setRows] = useState<TestingPerson[]>([]);

    const addingNewPerson = (duration: number, occurrence: boolean) => {
        setRows([...rows, {id: rows.length, duration: duration, occurrence: occurrence}]);
    };

    const classes = useStyles();

    const generateChart = () => {

    };

    return (
        <>
            <Box m={20}>
                <div className={classes.form}>
                <AddingTestingPersonForm adding={addingNewPerson}/>
                </div>
                <TableContainer component={Paper}>
                    <Table aria-label="customized table">
                        <TableHead>
                            <TableRow>
                                <TableCell>ID</TableCell>
                                <TableCell align="right">Czas odbytej próby</TableCell>
                                <TableCell align="right">Wystąpienie zdarzenia</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {rows.map((row) => (
                                <TableRow key={row.id}>
                                    <TableCell component="th" scope="row">{row.id}</TableCell>
                                    <TableCell align="right">{row.duration}</TableCell>
                                    <TableCell align="right">{row.occurrence ? '1' : '0'}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                <Button onClick={generateChart}>Wygeneruj wykres</Button>
                <StepLineChart/>
            </Box>
        </>
    );

}
