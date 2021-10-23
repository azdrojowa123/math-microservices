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
    Typography
} from "@material-ui/core";
import KeyboardArrowRightSharpIcon from "@mui/icons-material/KeyboardArrowRightSharp";
import {SnackbarContentWrapper} from "../../UI-addons/SnackbarContentWrapper";
import logisticRegressionService from "../../services/logisticRegressionService";

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

interface CsvRegressionI {
    submitData: (data: any[]) => void;
}

export function CsvRegression(props: CsvRegressionI) {
    const {submitData} = props;
    const [csvFile, setCsvFile] = useState<any[]>();
    const [idMsg, setIdMsg] = useState<number>();
    const [disableValidation, setDisableValidation] = useState<boolean>(true);
    const classes = useStyles();
    const service = logisticRegressionService;
    const [snackbarMsg, setSnackbarMsg] = useState<string>('');

    useEffect(() => {
        if (csvFile !== undefined) {
            setDisableValidation(false)
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
            rows.forEach((row: any, index: number) => {
                const values = row.split(delim);
                dataSet.push({
                    Gender: values[0],
                    Age: values[1],
                    Height: values[2],
                    Weight: values[3],
                    family_history_with_overweight: values[4],
                    FAVC: values[5],
                    FCVC: values[6],
                    NCP: values[7],
                    CAEC: values[8],
                    SMOKE: values[9],
                    CH2O: values[10],
                    SCC: values[11],
                    FAF: values[12],
                    TUE: values[13],
                    CALC: values[14],
                    MTRANS: values[15],
                    NObeyesdad: values[16],
                })
            });
            setCsvFile(dataSet)
        }
        if (file != undefined) {
            reader.readAsText(file);
        }
    }

    const checkCSVData = () => {

    }

    const submit = () => {

        const checkStatus = function (id: string | number) {

            const timer = setInterval(function () {
                service.checkStatus(id).then(res => {
                    res.json().then(r => {
                        if (r['result'] == 'success') {
                            setSnackbarMsg('CSV file is correct')
                            clearInterval(timer)
                        } else if (r['result'] == 'fail') {
                            setSnackbarMsg('CSV file is not correct. Please consider to check if ')
                            clearInterval(timer)
                        } else {
                            checkStatus(id)
                        }
                    })
                })
            }, 200);

            setTimeout(function () {
                clearInterval(timer);
                setSnackbarMsg('Some problems occurred during validation, please try again later')
            }, 30000)

        };


        if (csvFile !== undefined) {
            service.checkCSVData(csvFile).then(res => {
                return res.json()
            }).then(p => {

                console.log(p)
            })
        }
    }

    const handleClose = () => {
        setSnackbarMsg('')
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
                                    primary="X"/>
                                <ListItemIcon>
                                    <KeyboardArrowRightSharpIcon/>
                                </ListItemIcon>
                                <ListItemText
                                    primary="X"/>
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
                            disabled={disableValidation}
                            onClick={checkCSVData}>
                        Check CSV File
                    </Button>
                </Grid>
                <Grid item>
                    <Button className={classes.button}
                            disabled={disableValidation}
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