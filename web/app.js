function showValue() {
    let number = readValue();
    setFooBar(number)
        .then(getFooBarValue)
        .then(setFooBarOutput);
}

function readValue() {
    return document.getElementById("numberValue").value;
}

function setFooBarOutput(value) {
    document.getElementById("fooValue").value = value;
}

function getFooBarValue(response) {
    return Promise.resolve(response.data.value);
}

function setFooBar(number) {
    return axios.get(`https://9r236qzvrb.execute-api.eu-west-1.amazonaws.com/prod/?number=${number}`);
}