import * as React from "react";
import {ChangeEvent, useEffect, useState} from "react";
import {
    Box,
    Button,
    Grid,
    Input,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    makeStyles,
    Snackbar,
    TextField,
    Typography
} from "@material-ui/core";
import KeyboardArrowRightSharpIcon from "@mui/icons-material/KeyboardArrowRightSharp";
import survivalCurveService from "../../services/survivalCurveService";
import {SnackbarContentWrapper} from "../../UI-addons/SnackbarContentWrapper";

const useStyles = makeStyles(theme => ({
    button: {
        textAlign: 'center',
        background: 'linear-gradient(45deg, #239890 30%, #47EEE3 90%)',
        color: '#1a0000',
        '&:hover': {
            backgroundColor: '#A8AEAE',
        },
        marginTop: '10px',
        marginBottom: '10px',
        width: '20vh',
        height: '5vh'
    },
    form: {
        display: 'flex',
        width: '10vw',
    },
}));

export function CsvReader() {
    const [csvFile, setCsvFile] = useState<{ duration: number | string, occurrence: number | string }[]>();
    const [disableSubmit, setDisableSubmit] = useState<boolean>(true);
    const classes = useStyles();
    const [display, setDisplay] = useState<boolean>(false);
    const [periods, setPeriods] = useState<number>();
    const [snackbarMsg, setSnackbarMsg] = useState<string>('');
    const service = survivalCurveService;

    useEffect(() => {
        if (periods !== undefined && periods !== 0 && csvFile !== undefined) {
            setDisableSubmit(false);
        }
    })

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0]
        const reader = new FileReader();
        const delim = ',';
        reader.onload = function (e) {
            const text = e.target?.result as string;
            const rows = text.slice(text.indexOf('\r\n') + 2).split('\r\n').slice(0, -1);
            if (!checkIfResultsNumbers(rows, delim)) {
                setSnackbarMsg('Data in in columns are not numeric values')
                setDisplay(true);
                setCsvFile(undefined);
            } else {
                const resultArray = rows.map((row: any) => {
                    const values = row.split(delim);
                    return {
                        duration: Number(values[0]),
                        occurrence: Number(values[1])
                    }
                });
                setCsvFile(resultArray);
            }
        }
        if (file != undefined) {
            reader.readAsText(file);
        }
    }

    const checkCSVData = () => {
    }

    const submit = () => {

    }

    const handleClose = () => {
        setDisplay(false)
    }

    function isNumber(value: string | number) {
        return ((value != null) &&
            (value !== '') &&
            !isNaN(Number(value.toString())));
    }

    function checkIfResultsNumbers(resultFromFile: string[], delim: string): boolean {
        let isNumeric = true;
        resultFromFile.forEach(value => {
            const values = value.split(delim);
            if (!isNumber(values[0]) || !isNumber(values[1])) {
                isNumeric = false;
            }
        })
        return isNumeric;
    }

    return (
        <>
            <Grid container direction={"row"} spacing={10}>
                <Grid item>
                    <Box borderRadius={8}>
                        <Typography variant="h1" component="div">
                            Requirements for importing a CSV file
                        </Typography>
                        <List>
                            <ListItem>
                                <ListItemIcon>
                                    <KeyboardArrowRightSharpIcon/>
                                </ListItemIcon>
                                <ListItemText
                                    primary="The first column in the file corresponds to the time of the attempt"/>
                                <ListItemIcon>
                                    <KeyboardArrowRightSharpIcon/>
                                </ListItemIcon>
                                <ListItemText
                                    primary="The second column takes a value of 0 or 1 depending on whether the sample is cut (0) / successful (0) / failed (1)"/>
                                <ListItemIcon>
                                    <KeyboardArrowRightSharpIcon/>
                                </ListItemIcon>
                                <ListItemText
                                    primary="Column headers do not matter, the order of the respective columns counts"/>
                            </ListItem>
                        </List>
                    </Box>
                </Grid>
                <Box width="100%"/>
                <Grid item>
                    <TextField
                        id="outlined-name"
                        className={classes.form}
                        label="Całkow"
                        onChange={event => {
                            setPeriods(Number(event.target.value))
                        }}
                    />
                </Grid>
                <Grid item>
                    <Input
                        type='file'
                        inputProps={{accept: '.csv'}}
                        id='csvFile'
                        onChange={handleChange}
                    />
                </Grid>
            </Grid>
            <Grid container direction={"row"} spacing={10}>
                <Grid item>
                    <Button className={classes.button}
                            disabled={disableSubmit}
                            onClick={checkCSVData}>
                        Check CSV File
                    </Button>
                </Grid>
                <Grid item>
                    <Button className={classes.button}
                            disabled={disableSubmit}
                            onClick={submit}>
                        Load CSV File
                    </Button>
                </Grid>
            </Grid>
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
        </>

    )
}