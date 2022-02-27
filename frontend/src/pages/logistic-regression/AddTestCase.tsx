import {
    Button,
    CircularProgress,
    FormHelperText,
    Grid,
    makeStyles,
    MenuItem,
    Snackbar,
    TextField,
    Typography
} from "@material-ui/core";
import * as React from "react";
import {BaseSyntheticEvent, useEffect, useRef, useState} from "react";
import Box from '@mui/material/Box';
import {SubmitHandler, useForm} from "react-hook-form";
import * as yup from "yup";
import {yupResolver} from "@hookform/resolvers/yup";
import logisticRegressionService from "../../services/logisticRegressionService";
import {SnackbarContentWrapper} from "../SnackbarContentWrapper";

const useStyles = makeStyles(theme => ({
    wrapper: {
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
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
        marginBottom: '10px',
        width: '20vh',
        height: '5vh'
    },
    form: {
        display: 'flex',
        width: '10vw',
    },
    formLong: {
        display: 'flex',
        width: '13vw',
    },
}));

interface AddTestCaseI {
    disableCustomModel: boolean,
    modelId: string | undefined
}

export function AddTestCase(props: AddTestCaseI) {

    const classes = useStyles()
    const {disableCustomModel, modelId} = props;
    const service = logisticRegressionService
    const gender = ['Female', 'Male']
    const family_history_with_overweight = ['yes', 'no']
    const FAVC = ['yes', 'no']
    const CAEC = ['NO', 'Sometimes', 'Frequently', 'Always']
    const SMOKE = ['yes', 'no']
    const SCC = ['yes', 'no']
    const CALC = ['NO', 'Sometimes', 'Frequently', 'Always']
    const MTRANS = ['Automobile', 'Motorbike', 'Bike', 'Public_Transportation', 'Walking']
    const [loadingOwnModel, setLoadingOwnModel] = useState<boolean>(false)
    const [loadingCustomModel, setLoadingCustomModel] = useState<boolean>(false)
    const refCalcOwn = useRef(loadingOwnModel)
    const refCalcCustom = useRef(loadingCustomModel)
    const [estimatedLevel, setEstimatedLevel] = useState<string>('')
    const [snackbarMsg, setSnackbarMsg] = useState<string>('')
    const schema = yup.object().shape({
        Gender: yup.string().required(),
        Age: yup.number()
            .typeError('age must be a number')
            .required("age is required")
            .min(0, "age cannot be less than 0"),
        Weight: yup.number()
            .typeError('weight must be a number')
            .required("weight is required")
            .min(0, "weight cannot be less than 0"),
        Height: yup.number().required()
            .typeError('height must be a number')
            .required("height is required")
            .min(0, "height cannot be less than 0"),
        family_history_with_overweight: yup.string().required(),
        FAVC: yup.string().required(),
        FCVC: yup.string().required(),
        NCP: yup.number().required()
            .typeError('NCP must be a number')
            .required("NCP is required")
            .min(0, "NCP value cannot be less than 0"),
        CAEC: yup.string().required(),
        SMOKE: yup.string().required(),
        CH2O: yup.number().required()
            .typeError('CH2O must be a number')
            .required("CH2O is required")
            .min(0, "CH2O value cannot be less than 0"),
        SCC: yup.string().required(),
        FAF: yup.number().required()
            .typeError('FAF must be a number')
            .required("FAF is required")
            .min(0, "FAF value cannot be less than 0"),
        TUE: yup.number().required()
            .typeError('TUE must be a number')
            .required("TUE is required")
            .min(0, "TUE value cannot be less than 0"),
        CALC: yup.string().required(),
        MTRANS: yup.string().required(),
    })

    const {register, handleSubmit, formState: {errors}, reset} = useForm({
        resolver: yupResolver(schema),
    });

    const handleClose = () => {
        setSnackbarMsg('')
    }

    useEffect(() => {
        refCalcOwn.current = loadingOwnModel
        refCalcCustom.current = loadingCustomModel
    })

    const onSubmit: SubmitHandler<any> = (data, event: BaseSyntheticEvent | undefined) => {
        const submitEvent = event?.nativeEvent as SubmitEvent
        const buttonId = submitEvent.submitter?.id
        console.log(buttonId)
        const orderedJSON = JSON.parse(JSON.stringify(data, ["Gender", "Age", "Height", "Weight", "family_history_with_overweight", "FAVC", "FCVC", "NCP", "CAEC",
            "SMOKE", "CH2O", "SCC", "FAF", "TUE", "CALC", "MTRANS"]));
        orderedJSON['Height'] = orderedJSON['Height'] / 100
        if (buttonId == 'ourModel') {
            setLoadingOwnModel(true)
            service.logisticRegressionCalcOwn(orderedJSON, 'own').then(res => {
                return res.json().then(resObj => {
                    var nre = setInterval(() => {
                        checkStatus(resObj['id_msg'])
                    }, 4000);
                    const checkStatus = async (id: string | number) => {
                        console.log("ID test case" + id)
                        let res = await service.checkStatus(id)
                        let r = await res.json()
                        if (refCalcOwn.current) {
                            if (r['result'] == 'success') {
                                setSnackbarMsg('Logistic regression calculation finished')
                                setEstimatedLevel(r['estimation'])
                                setLoadingOwnModel(false)
                                clearInterval(nre)
                            } else if (r['result'] == 'fail') {
                                clearInterval(nre)
                                setSnackbarMsg('Logistic regression calculation failed, please try again later')
                                setLoadingOwnModel(false)
                            }
                        }
                    }
                    setTimeout(function () {
                        if (refCalcOwn.current) {
                            clearInterval(nre);
                            setSnackbarMsg('Some problems occurred during calculation. Probably it is problem with our server. Please try again later')
                            setLoadingOwnModel(false)
                        }
                    }, 200000)
                })
            }).catch(_ => {
                setSnackbarMsg('Connection with backend service cannot be established')
                setLoadingOwnModel(false)
            })
        } else if (buttonId == 'customModel' && modelId !== undefined) {
            setLoadingCustomModel(true)
            service.logisticRegressionCalcCustom(orderedJSON, 'custom', modelId).then(res => {
                return res.json().then(resObj => {
                    var nre = setInterval(() => {
                        checkStatus(resObj['id_msg'])
                    }, 4000);
                    const checkStatus = async (id: string | number) => {
                        console.log("ID test case" + id)
                        let res = await service.checkStatus(id)
                        let r = await res.json()
                        if (refCalcCustom.current) {
                            if (r['result'] == 'success') {
                                setSnackbarMsg('Logistic regression calculation finished')
                                setEstimatedLevel(r['estimation'])
                                setLoadingCustomModel(false)
                                clearInterval(nre)
                            } else if (r['result'] == 'fail') {
                                clearInterval(nre)
                                setSnackbarMsg('Logistic regression calculation failed, please try again later')
                                setLoadingCustomModel(false)
                            }
                        }
                    }
                    setTimeout(function () {
                        if (refCalcCustom.current) {
                            clearInterval(nre);
                            setSnackbarMsg('Some problems occurred during calculation. Probably it is problem with our server. Please try again later')
                            setLoadingCustomModel(false)
                        }
                    }, 200000)
                })
            }).catch(_ => {
                setSnackbarMsg('Connection with backend service cannot be established')
                setLoadingCustomModel(false)
            })
        } else {

        }
    }

    return (
        <>
            <Grid container direction={"row"} spacing={10}>
                <Grid item xs={10}>
                    <Box borderRadius={8}>
                        <Typography variant="h1" component="div">
                            Please complete test case with proper values.
                        </Typography>
                    </Box>
                </Grid>
            </Grid>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Grid container direction={"row"} spacing={10}>
                    <Grid item>
                        <TextField
                            id="outlined-start-adornment"
                            label="Gender"
                            className={classes.form}
                            select
                            {...register("Gender")}
                        >
                            {gender.map((option) => (
                                <MenuItem key={option} value={option}>
                                    {option}
                                </MenuItem>
                            ))}
                        </TextField>
                        <FormHelperText error>{errors.Gender?.message}</FormHelperText>
                    </Grid>
                    <Grid item>
                        <TextField
                            {...register("Age")}
                            id="outlined-start-adornment"
                            label="Age"
                            className={classes.form}
                            type="number"
                        >
                        </TextField>
                        <FormHelperText error>{errors.Age?.message}</FormHelperText>
                    </Grid>
                    <Grid item>
                        <TextField
                            id="outlined-start-adornment"
                            label="Height [cm]"
                            className={classes.form}
                            type="number"
                            {...register("Height")}
                        >
                        </TextField>
                        <FormHelperText error>{errors.Height?.message}</FormHelperText>
                    </Grid>
                    <Grid item>
                        <TextField
                            id="outlined-start-adornment"
                            label="Weight"
                            {...register("Weight")}
                            className={classes.form}
                            type="number"
                        >
                        </TextField>
                        <FormHelperText error>{errors.Weight?.message}</FormHelperText>
                    </Grid>
                    <Grid item>
                        <TextField
                            id="outlined-start-adornment"
                            label="Family history with overweight"
                            className={classes.formLong}
                            select
                            {...register("family_history_with_overweight")}
                        >
                            {family_history_with_overweight.map((option) => (
                                <MenuItem key={option} value={option}>
                                    {option}
                                </MenuItem>
                            ))}
                        </TextField>
                        <FormHelperText error>{errors.family_history_with_overweight?.message}</FormHelperText>
                    </Grid>
                    <Grid item>
                        <TextField
                            id="outlined-start-adornment"
                            label="FAVC"
                            className={classes.form}
                            select
                            {...register("FAVC")}
                        >
                            {FAVC.map((option) => (
                                <MenuItem key={option} value={option}>
                                    {option}
                                </MenuItem>
                            ))}
                        </TextField>
                        <FormHelperText error>{errors.FAVC?.message}</FormHelperText>
                    </Grid>
                    <Grid item>
                        <TextField
                            id="outlined-start-adornment"
                            label="FCVC"
                            className={classes.form}
                            {...register("FCVC")}
                            type="number"
                        >
                        </TextField>
                        <FormHelperText error>{errors.FCVC?.message}</FormHelperText>
                    </Grid>
                </Grid>
                <Grid container direction={"row"} spacing={10}>
                    <Grid item>
                        <TextField
                            id="outlined-start-adornment"
                            label="NCP"
                            {...register("NCP")}
                            className={classes.form}
                            type="number"
                        >
                        </TextField>
                        <FormHelperText error>{errors.NCP?.message}</FormHelperText>
                    </Grid>
                    <Grid item>
                        <TextField
                            id="outlined-start-adornment"
                            label="CAEC"
                            className={classes.form}
                            select
                            {...register("CAEC")}
                        >
                            {CAEC.map((option) => (
                                <MenuItem key={option} value={option}>
                                    {option}
                                </MenuItem>
                            ))}
                        </TextField>
                        <FormHelperText error>{errors.CAEC?.message}</FormHelperText>
                    </Grid>
                    <Grid item>
                        <TextField
                            id="outlined-start-adornment"
                            label="SMOKE"
                            className={classes.form}
                            select
                            {...register("SMOKE")}
                        >
                            {SMOKE.map((option) => (
                                <MenuItem key={option} value={option}>
                                    {option}
                                </MenuItem>
                            ))}
                        </TextField>
                        <FormHelperText error>{errors.SMOKE?.message}</FormHelperText>
                    </Grid>
                    <Grid item>
                        <TextField
                            id="outlined-start-adornment"
                            label="CH2O"
                            className={classes.form}
                            type="number"
                            {...register("CH2O")}
                        >
                        </TextField>
                        <FormHelperText error>{errors.CH2O?.message}</FormHelperText>
                    </Grid>
                    <Grid item>
                        <TextField
                            id="outlined-start-adornment"
                            label="SCC"
                            className={classes.form}
                            select
                            {...register("SCC")}
                        >
                            {SCC.map((option) => (
                                <MenuItem key={option} value={option}>
                                    {option}
                                </MenuItem>
                            ))}
                        </TextField>
                        <FormHelperText error>{errors.SCC?.message}</FormHelperText>
                    </Grid>
                    <Grid item>
                        <TextField
                            id="outlined-start-adornment"
                            label="FAF"
                            className={classes.form}
                            type="number"
                            {...register("FAF")}
                        >
                        </TextField>
                        <FormHelperText error>{errors.FAF?.message}</FormHelperText>
                    </Grid>
                    <Grid item>
                        <TextField
                            id="outlined-start-adornment"
                            label="TUE"
                            className={classes.form}
                            {...register("TUE")}
                            type="number"
                        >
                        </TextField>
                        <FormHelperText error>{errors.TUE?.message}</FormHelperText>
                    </Grid>
                </Grid>
                <Grid container direction={"row"} spacing={10}>
                    <Grid item>
                        <TextField
                            id="outlined-start-adornment"
                            label="CALC"
                            className={classes.form}
                            select
                            {...register("CALC")}
                        >
                            {CALC.map((option) => (
                                <MenuItem key={option} value={option}>
                                    {option}
                                </MenuItem>
                            ))}
                        </TextField>
                        <FormHelperText error>{errors.CALC?.message}</FormHelperText>
                    </Grid>
                    <Grid item>
                        <TextField
                            id="outlined-start-adornment"
                            label="MTRANS"
                            className={classes.form}
                            select
                            {...register("MTRANS")}
                        >
                            {MTRANS.map((option) => (
                                <MenuItem key={option} value={option}>
                                    {option}
                                </MenuItem>
                            ))}
                        </TextField>
                        <FormHelperText error>{errors.MTRANS?.message}</FormHelperText>
                    </Grid>
                </Grid>
                <Grid container direction={"row"} spacing={10}>
                    <Grid item>
                        <Button
                            variant='contained'
                            id="ourModel"
                            type="submit"
                            className={classes.button}
                            disabled={loadingOwnModel}>
                            {loadingOwnModel && <CircularProgress size={16}/>}
                            Calculate with our model
                        </Button>
                    </Grid>
                    <Grid item>
                        <Button
                            variant='contained'
                            id="customModel"
                            type="submit"
                            className={classes.button}
                            disabled={loadingCustomModel || disableCustomModel}>
                            {loadingCustomModel && <CircularProgress size={16}/>}
                            Calculate with custom model</Button>
                    </Grid>
                </Grid>
            </form>
            {
                estimatedLevel !== '' &&
                <Box
                    sx={{
                        boxShadow: 1,
                        bgcolor: 'background.paper',
                        marginLeft: '30px',
                        margin: '20px',
                        width: '80vw',
                        height: '5vh',
                        alignItems: 'center', // po środku wertykalnie
                        justifyContent: 'center', // po środku horyzontalnie
                        display: 'flex'
                    }}
                >
                    <Typography variant="h2" align={'center'} style={{margin: '5px'}}>
                        {`Estimated level of obesity based on eating habits and physical condition is `}
                    </Typography>
                    <Typography variant="h6">
                        {` ${estimatedLevel}`}
                    </Typography>

                </Box>
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
        </>
    )
}