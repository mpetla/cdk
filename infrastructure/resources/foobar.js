const AWS = require('aws-sdk');

function setFooBar(number) {
  let value = '';
  
  if (number % 2 === 0) {
      value = "foo";
  }
  if (number % 3 === 0) {
      value = value + "bar";
  }

  return value;
}

exports.main = async function(event, context) {
  try {
    const method = event.httpMethod;

    if (method === "GET") {
      const foobarNumber = event.queryStringParameters.number;
      if (event.path === "/") {
        const foobarValue = setFooBar(foobarNumber);
        const body = { value: foobarValue };
        return {
          statusCode: 200,
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "Application/json"
          },
          body: JSON.stringify(body)
        };
      }
    }

    return {
      statusCode: 400,
      headers: {},
      body: "We only accept GET /"
    };
  } catch(error) {
    const body = error.stack || JSON.stringify(error, null, 2);
    return {
      statusCode: 400,
        headers: {},
        body: JSON.stringify(body)
    }
  }
}