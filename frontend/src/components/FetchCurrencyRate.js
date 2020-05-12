export const fetchCurrencyRate = function (currency) {
    return new Promise(function (resolve, reject) {
        const testURL = `https://api.exchangeratesapi.io/latest?symbols=${currency}`;
        const myInit = {
            dataType: 'jsonp',
            method: 'GET',
        };
        const myRequest = new Request(testURL, myInit);
        fetch(myRequest).then(response => response.json()).then((json) => {
            const result = json.rates[currency];
            if (!Number.isNaN(result))
                result.toFixed(2);
            resolve(result);
        }).catch(function (e) {
            console.log('error');
            console.log(e);
        });
    })
};