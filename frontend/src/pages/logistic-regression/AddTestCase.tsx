import {Box, Button, FormHelperText, Grid, makeStyles, MenuItem, TextField, Typography} from "@material-ui/core";
import * as React from "react";
import {BaseSyntheticEvent, useState} from "react";
import {SubmitHandler, useForm} from "react-hook-form";
import * as yup from "yup";
import {yupResolver} from "@hookform/resolvers/yup";
import logisticRegressionService from "../../services/logisticRegressionService";

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

export function AddTestCase() {

    const classes = useStyles()
    const service = logisticRegressionService
    const gender = ['Female', 'Male']
    const family_history_with_overweight = ['yes', 'no']
    const FAVC = ['yes', 'no']
    const CAEC = ['NO', 'Sometimes', 'Frequently', 'Always']
    const SMOKE = ['yes', 'no']
    const SCC = ['yes', 'no']
    const CALC = ['NO', 'Sometimes', 'Frequently', 'Always']
    const MTRANS = ['Automobile', 'Motorbike', 'Bike', 'Public_Transportation', 'Walking']
    const [disableOwnModel, setDisableOwnModel] = useState<boolean>(true)
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
            .min(0, "NCP cannot be less than 0"),
        CAEC: yup.string().required(),
        SMOKE: yup.string().required(),
        CH20: yup.number().required()
            .typeError('CH20 must be a number')
            .required("CH20 is required")
            .min(0, "CH20 cannot be less than 0"),
        SCC: yup.string().required(),
        FAF: yup.number().required()
            .typeError('FAF must be a number')
            .required("FAF is required")
            .min(0, "FAF cannot be less than 0"),
        TUE: yup.number().required()
            .typeError('TUE must be a number')
            .required("TUE is required")
            .min(0, "TUE cannot be less than 0"),
        CALC: yup.string().required(),
        MTRANS: yup.string().required(),
    });

    const {register, handleSubmit, formState: {errors}, reset} = useForm({
        resolver: yupResolver(schema),
    });

    const onSubmit: SubmitHandler<any> = (data, event: BaseSyntheticEvent | undefined) => {
        const submitEvent = event?.nativeEvent as SubmitEvent
        const buttonId = submitEvent.submitter?.id
        console.log(data)
        if (buttonId == 'ourModel') {
            //['Female', 22, 1.7, 65, 'no', 'no', 5, 4, 'Sometimes', 'no', 2, 'yes', 3, 8, 'Frequently', 'Bike']

            service.logisticRegressionCalc(data).then(res => {
                console.log(res)
            })
        } else if (buttonId == 'customModel') {

        } else {

        }
        //reset();

    }

    return (
        <>
            <Grid container direction={"row"} spacing={10}>
                <Grid item xs={10}>
                    <Box borderRadius={8}>
                        <Typography variant="h1" component="div">
                            Please complete test case with proper values;
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
                            onChange={event => {
                                //seTimeUnit(event.target.value.toString())
                            }}
                        >
                            {gender.map((option) => (
                                <MenuItem key={option} value={option}>
                                    {option}
                                </MenuItem>
                            ))}
                        </TextField>
                        <FormHelperText error>{errors.gender?.message}</FormHelperText>
                    </Grid>
                    <Grid item>
                        <TextField
                            {...register("Age")}
                            id="outlined-start-adornment"
                            label="Age"
                            className={classes.form}
                            type="number"
                            onChange={event => {
                                //seTimeUnit(event.target.value.toString())
                            }}
                        >
                        </TextField>
                        <FormHelperText error>{errors.age?.message}</FormHelperText>
                    </Grid>
                    <Grid item>
                        <TextField
                            id="outlined-start-adornment"
                            label="Height"
                            className={classes.form}
                            type="number"
                            {...register("Height")}
                            onChange={event => {
                                //seTimeUnit(event.target.value.toString())
                            }}
                        >
                        </TextField>
                        <FormHelperText error>{errors.height?.message}</FormHelperText>
                    </Grid>
                    <Grid item>
                        <TextField
                            id="outlined-start-adornment"
                            label="Weight"
                            {...register("Weight")}
                            className={classes.form}
                            type="number"
                            onChange={event => {
                                //seTimeUnit(event.target.value.toString())
                            }}
                        >
                        </TextField>
                        <FormHelperText error>{errors.weight?.message}</FormHelperText>
                    </Grid>
                    <Grid item>
                        <TextField
                            id="outlined-start-adornment"
                            label="Family history with overweight"
                            className={classes.formLong}
                            select
                            {...register("family_history_with_overweight")}
                            onChange={event => {
                                //seTimeUnit(event.target.value.toString())
                            }}
                        >
                            {family_history_with_overweight.map((option) => (
                                <MenuItem key={option} value={option}>
                                    {option}
                                </MenuItem>
                            ))}
                        </TextField>
                        <FormHelperText error>{errors.familyHistory?.message}</FormHelperText>
                    </Grid>
                    <Grid item>
                        <TextField
                            id="outlined-start-adornment"
                            label="FAVC"
                            className={classes.form}
                            select
                            {...register("FAVC")}
                            onChange={event => {
                                //seTimeUnit(event.target.value.toString())
                            }}
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
                            onChange={event => {
                                //seTimeUnit(event.target.value.toString())
                            }}
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
                            onChange={event => {
                                //seTimeUnit(event.target.value.toString())
                            }}
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
                            onChange={event => {
                                //seTimeUnit(event.target.value.toString())
                            }}
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
                            onChange={event => {
                                //seTimeUnit(event.target.value.toString())
                            }}
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
                            label="CH20"
                            className={classes.form}
                            type="number"
                            {...register("CH20")}
                            onChange={event => {
                                //seTimeUnit(event.target.value.toString())
                            }}
                        >
                        </TextField>
                        <FormHelperText error>{errors.CH20?.message}</FormHelperText>
                    </Grid>
                    <Grid item>
                        <TextField
                            id="outlined-start-adornment"
                            label="SCC"
                            className={classes.form}
                            select
                            {...register("SCC")}
                            onChange={event => {
                                //seTimeUnit(event.target.value.toString())
                            }}
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
                            onChange={event => {
                                //seTimeUnit(event.target.value.toString())
                            }}
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
                            onChange={event => {
                                //seTimeUnit(event.target.value.toString())
                            }}
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
                            onChange={event => {
                                //seTimeUnit(event.target.value.toString())
                            }}
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
                            onChange={event => {
                                //seTimeUnit(event.target.value.toString())
                            }}
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
                        <Button id="ourModel" type="submit" className={classes.button}>Calculate with our model</Button>
                    </Grid>
                    <Grid item>
                        <Button id="customModel" type="submit" className={classes.button} disabled={disableOwnModel}>Calculate
                            with custom model</Button>
                    </Grid>
                </Grid>
            </form>

        </>
    )
}