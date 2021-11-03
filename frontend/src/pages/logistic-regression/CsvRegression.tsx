import * as React from "react";
import {ChangeEvent, useEffect, useRef, useState} from "react";
import {
    Box,
    Button,
    CircularProgress,
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
    unlockCustomModel: (id: string) => void;
}

export function CsvRegression(props: CsvRegressionI) {

    const {unlockCustomModel} = props
    const [csvFile, setCsvFile] = useState<any[]>();
    const [loadingRegression, setLoadingRegression] = useState<boolean>(false)
    const [loadingValidation, setLoadingValidation] = useState<boolean>(false);
    const refRegression = useRef(loadingRegression);
    const refValidation = useRef(loadingValidation);
    const [disableValidation, setDisableValidation] = useState<boolean>(true);
    const classes = useStyles();
    const service = logisticRegressionService;
    const [snackbarMsg, setSnackbarMsg] = useState<string>('');

    useEffect(() => {
        refRegression.current = loadingRegression
        refValidation.current = loadingValidation
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
        setLoadingValidation(true)
        if (csvFile !== undefined) {
            service.checkCSVData(csvFile).then(res => {
                return res.json().then(resObj => {
                    var nre = setInterval(() => {
                        checkStatus(resObj['id_msg'])
                    }, 5000);
                    const checkStatus = async (id: string) => {
                        console.log("ID " + id)
                        let res = await service.checkStatus(id)
                        let r = await res.json()
                        if (refValidation.current) {
                            if (r['result'] == 'success') {
                                setLoadingValidation(false)
                                clearInterval(nre)
                                setSnackbarMsg('CSV file is correct')
                            } else if (r['result'] == 'fail') {
                                clearInterval(nre)
                                setSnackbarMsg('CSV file is not correct. Please consider to check if all requirements are met')
                                setLoadingValidation(false)
                            }
                        }
                    }
                    setTimeout(function () {
                        if (refValidation.current) {
                            clearInterval(nre);
                            setSnackbarMsg('Some problems occurred during validation, please try again later')
                        }
                    }, 100000)
                })
            }).catch(_ => {
                setSnackbarMsg('Connection with backend service cannot be established')
                setLoadingRegression(false)
            })
        }
    }

    const submit = () => {
        setLoadingRegression(true)
        if (csvFile !== undefined) {
            service.logisticRegressionFit(csvFile).then(res => {
                res.json().then(async resObj => {
                    const nre = setInterval(() => {
                        checkStatus(resObj['id_msg'])
                    }, 5000);
                    const checkStatus = async (id: string) => {
                        console.log("ID " + id)
                        let res = await service.checkStatus(id)
                        let r = await res.json()
                        if (refRegression.current) {
                            if (r['result'] == 'fail') {
                                if (r['stage'] == 'validation') {
                                    setSnackbarMsg('Something is wrong with CSV validation')
                                } else {
                                    setSnackbarMsg('Logistic regression calculation failed')
                                }
                                setLoadingRegression(false)
                                clearInterval(nre)
                            } else if (r['result'] == 'success' && r['stage'] == 'regression') {
                                setSnackbarMsg(`Logistic regression was successful. Your model's accuracy is ${r['accuracy']} `)
                                unlockCustomModel(id)
                                clearInterval(nre)
                                setLoadingRegression(false)
                            }
                        }
                    }
                    setTimeout(() => {
                        if (refRegression.current) {
                            setSnackbarMsg('Some problems occurred during process, please try again later ')
                            setLoadingRegression(false)
                            clearInterval(nre)
                        }
                    }, 25000)
                })
            }).catch(_ => {
                setSnackbarMsg('Connection with backend service cannot be established')
                setLoadingRegression(false)
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
                    <Typography variant="h1" component="div">
                        Requirements for importing a CSV file
                    </Typography>
                    <List>
                        <ListItem>
                            <ListItemIcon>
                                <KeyboardArrowRightSharpIcon/>
                            </ListItemIcon>
                            <ListItemText
                                primary="Blank line must be appended to the end of the file"/>
                        </ListItem>
                        <ListItem>
                            <ListItemIcon>
                                <KeyboardArrowRightSharpIcon/>
                            </ListItemIcon>
                            <ListItemText
                                primary="Specific headers must be placed: Gender, Age, Height, Weight, family_history_with_overweight, FAVC(frequently consuming of high caloric food), FCVC(Frequency of consumption of vegetables), NCP(number of main meals), CAEC(consumption of food between meals),
                                    SMOKE, CH2O(water of daily), SCC(calories consumption monitoring), FAF(physical activity frequency), TUE(time using technology devices), CALC, MTRANS(way of transport), NObeyesdad(obesity level)"
                            />
                        </ListItem>
                        <ListItem>
                            <ListItemIcon>
                                <KeyboardArrowRightSharpIcon/>
                            </ListItemIcon>
                            <ListItemText
                                style={{fontSize: 5}}
                                primary="Specific requirements for columns: Gender(Female/Male), Age(num.), Height(num.), Weight(num.), family_history_with_overweight(yes/no), FAVC(yes/no), FCVC(num.), NCP(num.), CAEC(no/Sometimes/Frequently/Always),
                                    SMOKE(yes/no), CH2O(num.), SCC(yes/no), FAF(num.), TUE(num.), CALC(no/Sometimes/Frequently/Always), MTRANS(Automobile/Motorbike/Bike/Public_Transportation/Walking), NObeyesdad(Insufficient_Weight/Normal_Weight/Overweight_Level_I/Overweight_Level_II/Obesity_Type_I/Obesity_Type_II/Obesity_Type_III)"/>
                        </ListItem>
                    </List>
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
                    <Button variant='contained' className={classes.button}
                            disabled={disableValidation || loadingValidation}
                            onClick={checkCSVData}>
                        {loadingValidation && <CircularProgress size={16}/>}
                        Check CSV File
                    </Button>
                </Grid>
                <Grid item>
                    <Button variant='contained' className={classes.button} onClick={submit}
                            disabled={loadingRegression || disableValidation}>
                        {loadingRegression && <CircularProgress size={16}/>}
                        Upload logistic regression model
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