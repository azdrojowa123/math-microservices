import {TestingPerson} from "../pages/survival-curve/SurvivalCurveCalc";
import {survivalCurveData} from "../pages/survival-curve/Data";


const survivalCurveService = {

    survivalResults: (periods: number, data: TestingPerson[]) => {
        return fetch(`http://localhost:8080/estimator/${periods}`, {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json; charset=utf-8',
            },
            body: JSON.stringify(data)
        })
    },
    checkCSVData: (periods: number, data: any[]) => {
        return fetch(`http://localhost:8081/csv-data/validate/${periods}`, {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json; charset=utf-8',
            },
            body: JSON.stringify(data)
        })
    },
    survivalResultsCSV: (periods: number, data: any[]) => {
        return fetch(`http://localhost:8081/csv-data/calc/${periods}`, {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json; charset=utf-8',
            },
            body: JSON.stringify(data)
        })
    }

};

export default survivalCurveService;
