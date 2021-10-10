import {useEffect, useState} from 'react';
import {TestingPerson} from "../pages/survival-curve/SurvivalCurveCalc";
import {survivalCurveData} from "../pages/survival-curve/Data";

function handleErrors (response:any){
    if (!response.ok) {
        console.log('error')
        throw Error(response.statusText);
    }
    return response;
}

const survivalCurveService = {



    getSurvivalResults: (periods: number, data: TestingPerson[]) => {
        return fetch(`http://localhost:8080/estimator/${periods}`, {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json; charset=utf-8', // Your headers
            },
            body: JSON.stringify(survivalCurveData)
        }).then(handleErrors)
    }

};

export default survivalCurveService;
