const {DynamoDBClient, GetItemCommand} = require("@aws-sdk/client-dynamodb");
const tableName = process.env.CAPACITY_TABLE;
const dynamodbEndpoint = process.env.DYNAMODB_ENDPOINT;

const config = dynamodbEndpoint ? {endpoint: dynamodbEndpoint} : {};
const docClient = new DynamoDBClient(config);

exports.getCapacityByDateLocation = async (event) => {
    if (event.httpMethod !== 'GET') {
        throw new Error(`getAllItems only accept GET method, you tried: ${event.httpMethod}`);
    }

    console.info('received:', event);

    const params = {
        TableName : tableName,
        Key: {"date": {"S": event.queryStringParameters.date}, "location": {"S": event.queryStringParameters.location}},
    };
    const getCmd = new GetItemCommand(params);
    const result = await docClient.send(getCmd);
    const items = result.Item;

    const response = {
        statusCode: 200,
        body: JSON.stringify(items)
    };

    // All log statements are written to CloudWatch
    console.info(`response from: ${event.path} statusCode: ${response.statusCode} body: ${response.body}`);
    return response;
}
