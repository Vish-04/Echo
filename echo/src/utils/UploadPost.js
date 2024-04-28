import { DynamoDB } from 'aws-sdk';

const dynamodb = new DynamoDB({
    accessKeyId: process.env.NEXT_PUBLIC_AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.NEXT_PUBLIC_AWS_SECRET_ACCESS_KEY,
    region: process.env.NEXT_PUBLIC_AWS_REGION
});

export const uploadPost = async (postId, userId, headlineUrl, bodyUrl) => {

    const params = {
        TableName: 'post',
        Item: {
            'postID': { S: postId },
            'userID': { S: userId },
            'header': { S: headlineUrl },
            'body': { S: bodyUrl }
        }
    };

    dynamodb.putItem(params, (err, data) => {
        if (err) {
            console.error("Unable to add item", err);
        } else {
            console.log("Item added successfully", data);
        }
    });
}