import {
    Box,
    Button, IconButton,
    makeStyles,
    Paper,
    Snackbar,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow
} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import * as React from 'react';
import {useState} from 'react';
import {AddingTestingPersonForm} from './AddingTestingPersonForm';
import StepLineChart from './StepLineChart';
import survivalCurveService from "../../services/survivalCurveService";
import {SnackbarContentWrapper} from "../../UI-addons/SnackbarContentWrapper";

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
        height: '30%'
    }
}));

export interface TestingPerson {
    id: number,
    duration: number,
    occurrence: boolean
}

export function SurvivalCurveCalc() {

    const [rows, setRows] = useState<TestingPerson[]>([]);
    const [dataSource, setDataSource] = useState<[]>([]);
    const [disableGenerateChart, setDisableGenerateChart] = useState<boolean>(true);
    const service = survivalCurveService;
    const [display, setDisplay] = useState<boolean>(false);
    const [snackbarMsg, setSnackbarMsg] = useState<string>('');

    const handleClose = () => {
        setDisplay(false)
    }

    const addingNewPerson = (duration: number, occurrence: boolean) => {
        setRows([...rows, {id: rows.length, duration: duration, occurrence: occurrence}]);
    };

    const classes = useStyles();

    const generateChart = () => {
        service.getSurvivalResults(12, rows).then(async res => {
            if (res.ok) {
                const data = await res.json()
                setDataSource(data)
            } else {
                setSnackbarMsg("Some error occurred during connection to backend")
                setDisplay(true)
            }
        }).catch( () => {
            setSnackbarMsg("Connection to backend server refused")
            setDisplay(true)
        })
    };


    return (
        <>
            <Box m={20}>

                <AddingTestingPersonForm adding={addingNewPerson}/>

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
                <Button className={classes.button} onClick={generateChart}>Wygeneruj wykres</Button>
                {
                    display &&
                    <Snackbar
                        anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'right',
                        }}
                        open={display}
                        autoHideDuration={6000}
                        onClose={handleClose}
                    >
                        <SnackbarContentWrapper
                            onClose={handleClose}
                            variant="warning"
                            message={snackbarMsg}
                        />
                    </Snackbar>
                }
                {
                    dataSource.length !== 0 &&
                    <StepLineChart data={dataSource}/>
                }
            </Box>
        </>
    );

}
