const logisticRegressionService = {

    checkCSVData: (data: any[]) => {
        return fetch('http://192.168.99.111:30100/validation', {
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
        return fetch(`http://192.168.99.111:30100/validation/status/${id}`, {
            method: 'GET',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json; charset=utf-8',
                "Access-Control-Allow-Origin": "*"
            },
        })
    },
    logisticRegressionFit: (data: any[]) => {
        return fetch('http://192.168.99.111:30100/logistic-regression', {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json; charset=utf-8',
                "Access-Control-Allow-Origin": "*"
            },
            body: JSON.stringify(data)
        })
    },
    logisticRegressionCalc: (data: any, model: string) => {
        return fetch('http://192.168.99.111:30100/logistic-regression/calc', {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json; charset=utf-8',
                "Access-Control-Allow-Origin": "*",
                "Model": model
            },
            body: JSON.stringify(data)
        })
    }
};


export default logisticRegressionService;
