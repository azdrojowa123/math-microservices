import {CsvRegression} from "./CsvRegression";
import * as React from "react";
import {useState} from "react";
import {Box} from "@material-ui/core";
import {AddTestCase} from "./AddTestCase";

export function LogisticRegressionCalc() {

    const [disableCustomModelTest, setDisableCustomModelTest] = useState<boolean>(true);
    const [modelId, setModelId] = useState<string>()

    const unlockCustomModel = (id: string) => {
        setDisableCustomModelTest(false);
        setModelId(id)
    }


    return (
        <>
            <Box m={20}>
                <CsvRegression unlockCustomModel={unlockCustomModel}></CsvRegression>
                <AddTestCase disableCustomModel={disableCustomModelTest} modelId={modelId}></AddTestCase>
            </Box>
        </>
    );
}