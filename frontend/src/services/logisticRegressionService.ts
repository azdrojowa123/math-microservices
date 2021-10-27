const logisticRegressionService = {

    checkCSVData: (data: any[]) => {
        return fetch('http://localhost:5000/validation', {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json; charset=utf-8',
                "Access-Control-Allow-Origin": "*"
            },
            body: JSON.stringify(data)
        })
    },
    checkStatus: (id: string | number) => {
        return fetch(`http://localhost:5000/validation/status/${id}`, {
            method: 'GET',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json; charset=utf-8',
                "Access-Control-Allow-Origin": "*"
            },
        })
    },
    logisticRegressionFit: (data: any[]) => {
        return fetch('http://localhost:5000/logistic-regression', {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json; charset=utf-8',
                "Access-Control-Allow-Origin": "*"
            },
            body: JSON.stringify(data)
        })
    },
    logisticRegressionCalc: (data: any) => {
        return fetch('http://localhost:5000/logistic-regression/calc/own-model', {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json; charset=utf-8',
                "Access-Control-Allow-Origin": "*"
            },
            body: JSON.stringify(data)
        })
    }
};

export default logisticRegressionService;
