import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient, ScanCommand } from '@aws-sdk/lib-dynamodb';

const client = new DynamoDBClient({
    region: process.env.NEXT_PUBLIC_AWS_REGION,
    credentials: {
        accessKeyId: process.env.NEXT_PUBLIC_AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.NEXT_PUBLIC_AWS_SECRET_ACCESS_KEY
    }
});
const docClient = DynamoDBDocumentClient.from(client);

export const fetchFromDynamoDB = async (tableName) => {
    if (!tableName) {
        console.error("Table name is missing.");
        return;
    }

    const params = {
        TableName: tableName,
    };

    try {
        const data = await docClient.send(new ScanCommand(params));
        console.log("Data fetched successfully from DynamoDB!");
        return data.Items;
    } catch (error) {
        console.error("Error fetching data from DynamoDB:", error);
        return null;
    }
};
