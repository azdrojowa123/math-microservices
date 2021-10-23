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
    }
};

export default logisticRegressionService;
