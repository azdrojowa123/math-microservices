import {CsvRegression} from "./CsvRegression";
import * as React from "react";
import {useState} from "react";
import {Box, makeStyles} from "@material-ui/core";
import {AddTestCase} from "./AddTestCase";

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
        width: '40vh',
        height: '3vh'
    },
    form: {
        display: 'flex',
        width: '20vw',
    },
}));

export function LogisticRegressionCalc() {

    const classes = useStyles();
    const [dataSource, setDataSource] = useState<any[]>([]);

    const submitDataSource = (data: any[]) => {
        setDataSource(data);
    }


    return (
        <>
            <Box m={20}>
                <CsvRegression submitData={submitDataSource}></CsvRegression>
                <AddTestCase></AddTestCase>
            </Box>
        </>
    );
}