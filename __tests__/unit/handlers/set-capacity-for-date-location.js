const lambda = require('../../../src/handlers/set-capacity-for-date-location.js');
const {DynamoDBClient} = require("@aws-sdk/client-dynamodb");
 
describe('Test setCapacityForDateLocation', function () {
    let spy;

    beforeAll(() => {
        spy = jest.spyOn(DynamoDBClient.prototype, 'send');
    }); 
 
    // Clean up mocks 
    afterAll(() => {
        spy.mockRestore();
    }); 
 
    it('should run without errors ', async () => {
        const returnedItem = {
            statusCode: 200,
            body: {
                "location": {"S": "ZSG Hot-desk"},
                "date": {"S": "2021-05-12"},
                "capacity": {"N": "15"},
                "occupied": {"N":  "0"}
            }
        };
 
        // Return the specified value whenever the spied put function is called 
        spy.mockReturnValue({
            promise: () => Promise.resolve(returnedItem) 
        }); 
 
        const event = { 
            httpMethod: 'POST', 
            body: {
                "location": {"S": "ZSG Hot-desk"},
                "date": {"S": "2021-05-12"},
                "capacity": {"N": "15"},
                "occupied": {"N":  "0"}
            }
        }; 
     
        // Invoke putItemHandler() 
        const result = await lambda.setCapacityForDateLocation(event);
 
        // Compare the result with the expected result 
        expect(result).toBeTruthy();
    }); 
}); 
