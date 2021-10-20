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

interface CsvReaderI {
    submitData: (data: any[]) => void;
    periods: number;
}

export function CsvReader(props: CsvReaderI) {
    const {submitData, periods} = props;
    const [csvFile, setCsvFile] = useState<any[]>();
    const [disableSubmit, setDisableSubmit] = useState<boolean>(true);
    const classes = useStyles();
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
        const dataSet: any[] = []
        reader.onload = function (e) {
            const text = e.target?.result as string;
            const rows = text.slice(text.indexOf('\r\n') + 2).split('\r\n').slice(0, -1);
            if (!checkIfResultsNumbers(rows, delim)) {
                setSnackbarMsg('Data in in columns are not numeric values')
                setCsvFile(undefined);
            } else {
                Promise.all(
                    rows.map(async (row: any) => {
                        const values = row.split(delim);
                        console.log(Number(values[0]))
                        dataSet.push([Number(values[0]), Number(values[1])])
                    })
                ).then(() => {
                    setCsvFile(dataSet);
                })
            }
        }
        if (file != undefined) {
            reader.readAsText(file);
        }
    }

    const checkCSVData = () => {
        if (periods !== undefined && csvFile !== undefined) {
            service.checkCSVData(periods, csvFile).then(res => {
                if (res.ok) {
                    return res.json()
                } else {
                    return Promise.reject(res.statusText);
                }
            }).then(data => {
                if (data == false) {
                    setSnackbarMsg('Entered CSV data are not correct, please check if period number in data are not bigger than declared periods and if occurrence is 0/1')
                } else {
                    setSnackbarMsg('Your CSV is correct, you can click on generating chart')
                }
            }).catch(_ => {
                setSnackbarMsg('Error occurred during connection to CSV validation server')
            })
        }
    }

    const submit = () => {
        if (periods !== undefined && csvFile !== undefined) {
            service.survivalResultsCSV(periods, csvFile).then(async res => {
                if (res.ok) {
                    submitData(await res.json())
                } else {
                    res.text().then((errorMsg: any) => {
                        setSnackbarMsg(errorMsg)
                    })
                }
            })
            .catch(_ => {
                setSnackbarMsg('Error occurred during connection to CSV validation serverY')
            })
        }
    }

    const handleClose = () => {
        setSnackbarMsg('')
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
                                <ListItemIcon>
                                    <KeyboardArrowRightSharpIcon/>
                                </ListItemIcon>
                                <ListItemText
                                    primary="Blank line must be appended to the end of the file"/>
                            </ListItem>
                        </List>
                    </Box>
                </Grid>
                <Box width="100%"/>
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
                        Generate chart base on CSV
                    </Button>
                </Grid>
            </Grid>
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
        </>

    )
}