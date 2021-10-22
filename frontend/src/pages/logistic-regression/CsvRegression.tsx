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
    const [disableSubmit, setDisableSubmit] = useState<boolean>(true);
    const classes = useStyles();
    const [snackbarMsg, setSnackbarMsg] = useState<string>('');

    useEffect(() => {
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
                    NCP: values[6],
                    CAEC: values[7],
                    SMOKE: values[8],
                    CH2O: values[9],
                    SCC: values[10],
                    FAF: values[11],
                    TUE: values[12],
                    CALC: values[13],
                    MTRANS: values[14],
                    NObeyesdad: values[15],
                })

            });
            setCsvFile(dataSet);

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