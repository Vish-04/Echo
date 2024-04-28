import { S3 } from 'aws-sdk';

export const uploadToS3 = async (src, file_name) => {
    if (!src) return;

    const s3 = new S3({
        credentials: {
            accessKeyId: process.env.NEXT_PUBLIC_AWS_ACCESS_KEY_ID,
            secretAccessKey: process.env.NEXT_PUBLIC_AWS_SECRET_ACCESS_KEY,
        },
        region: process.env.NEXT_PUBLIC_AWS_REGION
    });

    const audioBlob = await fetch(src).then(res => res.blob());
    const params = {
        Bucket: process.env.NEXT_PUBLIC_AWS_S3_BUCKET,
        Key: `${file_name}.mp3`,
        Body: audioBlob,
        ContentType: 'audio/mpeg', // Set the Content-Type header to indicate audio content
        ContentDisposition: 'inline',
    };

    try {
        const data = await s3.putObject(params).promise();
        console.log("Audio uploaded to S3 successfully!", data);

        const publicUrl = `https://${params.Bucket}.s3.amazonaws.com/${params.Key}`;
        console.log("Public URL:", publicUrl);
        
        return publicUrl;
    } catch (error) {
        console.error("Error uploading audio to S3:", error);
        return null;
    }
};