export const uploadToS3 = async (src) => {
    if (!src) return;

    const s3 = new AWS.S3({
        accessKeyId: process.env.NEXT_PUBLIC_AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.NEXT_PUBLIC_AWS_SECRET_ACCESS_KEY,
        region: process.env.NEXT_PUBLIC_AWS_REGION
    });

    const audioBlob = await fetch(src).then(res => res.blob());
    const params = {
        Bucket: process.env.NEXT_PUBLIC_AWS_S3_BUCKET,
        Key: 'audioRecording.ogg',
        Body: audioBlob
    };

    try {
        await s3.upload(params).promise();
        console.log("Audio uploaded to S3 successfully!");
    } catch (error) {
        console.error("Error uploading audio to S3:", error);
    }
};