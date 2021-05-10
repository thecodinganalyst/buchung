const {DynamoDBClient, PutItemCommand} = require("@aws-sdk/client-dynamodb");
const tableName = process.env.CAPACITY_TABLE;
const dynamodbEndpoint = process.env.DYNAMODB_ENDPOINT;

const config = dynamodbEndpoint ? {endpoint: dynamodbEndpoint} : {};
const docClient = new DynamoDBClient(config);

exports.setCapacityForDateLocation = async (event) => {
    if (event.httpMethod !== 'POST') {
        throw new Error(`postMethod only accepts POST method, you tried: ${event.httpMethod} method.`);
    }
    console.info('received:', event);

    const params = {
        TableName : tableName,
        Item: event.body
    };

    const putItemCmd = new PutItemCommand(params);

    const result = await docClient.send(putItemCmd);
    const response = {
        statusCode: 200,
        body: JSON.stringify(result)
    };

    // All log statements are written to CloudWatch
    console.info(`response from: ${event.path} statusCode: ${response.statusCode} body: ${response.body}`);
    return response;
}
