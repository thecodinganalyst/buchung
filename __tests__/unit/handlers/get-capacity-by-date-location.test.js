const lambda = require('../../../src/handlers/get-capacity-by-date-location.js');
const {DynamoDBClient} = require("@aws-sdk/client-dynamodb");

describe('Test getCapacityByDateLocationFunction', () => {
    let spy;
 
    // Test one-time setup and teardown, see more in https://jestjs.io/docs/en/setup-teardown 
    beforeAll(() => { 
        // Mock dynamodb get and put methods 
        // https://jestjs.io/docs/en/jest-object.html#jestspyonobject-methodname 
        spy = jest.spyOn(DynamoDBClient.prototype, 'send');
    }); 
 
    // Clean up mocks 
    afterAll(() => { 
        spy.mockRestore();
    }); 
 
    it('should run without errors', async () => {

        spy.mockReturnValue({
            promise: () => Promise.resolve({ statusCode: 200 })
        }); 
 
        const event = { 
            httpMethod: 'GET',
            queryStringParameters: {
                "location": "ZSG Hot-desk",
                "date": "2021-05-12"
            }
        } 
 
        const result = await lambda.getCapacityByDateLocation(event);
 
        const expectedResult = { 
            statusCode: 200,
        }; 
 
        // Compare the result with the expected result 
        expect(result).toEqual(expectedResult); 
    }); 
}); 
