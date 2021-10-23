import {CsvRegression} from "./CsvRegression";
import {useState} from "react";

export function LogisticRegressionCalc() {

    const [dataSource, setDataSource] = useState<any[]>([]);

    const submitDataSource = (data: any[]) => {
        setDataSource(data);
    }


    return (
        <>
            <CsvRegression submitData={submitDataSource}></CsvRegression>
        </>
    );
}