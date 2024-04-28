export const uploadToS3 = async (src, file_name) => {
    if (!src) return;

    const s3 = new AWS.S3({
        accessKeyId: process.env.NEXT_PUBLIC_AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.NEXT_PUBLIC_AWS_SECRET_ACCESS_KEY,
        region: process.env.NEXT_PUBLIC_AWS_REGION
    });

    const audioBlob = await fetch(src).then(res => res.blob());
    const params = {
        Bucket: process.env.NEXT_PUBLIC_AWS_S3_BUCKET,
        Key: `${file_name}.ogg`,
        Body: audioBlob,
        ACL: 'public-read'
    };

    try {
        const data = await s3.upload(params).promise();
        console.log("Audio uploaded to S3 successfully!");

        const publicUrl = data.Location;
        console.log("Public URL:", publicUrl);
        
        return publicUrl;
    } catch (error) {
        console.error("Error uploading audio to S3:", error);
        return null;
    }
};