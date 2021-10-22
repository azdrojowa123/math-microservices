import {Box, Button, makeStyles, Snackbar, Table, TableHead, TableRow, TextField, Typography} from '@material-ui/core';
import * as React from 'react';
import {useState} from 'react';
import Divider from '@material-ui/core/Divider';
import StepLineChart from './StepLineChart';
import survivalCurveService from "../../services/survivalCurveService";
import {SnackbarContentWrapper} from "../../UI-addons/SnackbarContentWrapper";
import {ResultsTable} from "./ResultsTable";
import {CsvSurvivalCurve} from "./CsvSurvivalCurve";
import {AddingTestingPersonForm} from "./AddingTestingPersonForm";
import {Paper, TableBody, TableCell, TableContainer} from "@mui/material";

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
        marginTop: '10px',
        width: '20vh',
        height: '3vh'
    },
    form: {
        display: 'flex',
        flexFlow: 'column',
        height: '30%',
        width: '20vh',
        marginBottom: '20px',
    },
    divider: {
        marginBottom: '20px'
    }
}));

export interface TestingPerson {
    id: number,
    duration: number,
    occurrence: boolean
}

export function SurvivalCurveCalc() {

    const [rows, setRows] = useState<TestingPerson[]>([]);
    const [dataSource, setDataSource] = useState<any[]>([]);
    const [periods, setPeriods] = useState<number>(0);
    const service = survivalCurveService;
    const [snackbarMsg, setSnackbarMsg] = useState<string>('');

    const handleClose = () => {
        setSnackbarMsg('')
    }

    const addingNewPerson = (duration: number, occurrence: boolean) => {
        setRows([...rows, {id: rows.length, duration: duration, occurrence: occurrence}]);
    };

    const classes = useStyles();

    const generateChart = () => {
        service.survivalResults(periods, rows).then(async res => {
            if (res.ok) {
                setDataSource(await res.json())
            } else {
                setSnackbarMsg("Some error occurred during connection to backend")
            }
        }).catch(() => {
            setSnackbarMsg("Connection to backend server refused")
        })
    };

    const submitDataSource = (data: any[]) => {
        setDataSource(data);
    }


    return (
        <>
            <Box m={20}>
                <Typography variant="h1" component="div">
                    Before deciding which method of adding data you will use, please specify the total time duration.
                </Typography>
                <TextField
                    id="outlined-name"
                    className={classes.form}
                    label="Total duration"
                    onChange={event => {
                        setPeriods(Number(event.target.value))
                    }}
                />
                <Divider className={classes.divider}/>
                {
                    periods !== 0 &&
                    <>
                        <CsvSurvivalCurve submitData={submitDataSource} periods={periods}/>
                        <Divider className={classes.divider}/>
                        <AddingTestingPersonForm
                            adding={addingNewPerson}
                            periods={periods}/>
                        <TableContainer component={Paper}>
                            <Table aria-label="customized table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>ID</TableCell>
                                        <TableCell align="right">Time of the trial</TableCell>
                                        <TableCell align="right">The occurrence of the trial</TableCell>
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
                        <Button className={classes.button} onClick={generateChart}>
                            Generate chart
                        </Button>
                    </>
                }

                <Snackbar
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'right',
                    }}
                    open={snackbarMsg != ''}
                    autoHideDuration={6000}
                    onClose={handleClose}
                >
                    <SnackbarContentWrapper
                        onClose={handleClose}
                        variant="warning"
                        message={snackbarMsg}
                    />
                </Snackbar>

                {
                    dataSource.length !== 0 &&
                    <>
                        <StepLineChart data={dataSource}/>
                        <ResultsTable data={dataSource}/>
                    </>
                }
            </Box>
        </>
    );
}
