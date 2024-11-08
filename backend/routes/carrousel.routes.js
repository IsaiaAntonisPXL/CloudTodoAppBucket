const express = require('express');
const carrouselRouter = express.Router();
const AWS = require('aws-sdk');

// Configure the AWS SDK (it will use the default credentials provider chain)
const s3 = new AWS.S3();

// S3 bucket name
const BUCKET_NAME = 'isaia-test-bucket';  // Your bucket name

// Endpoint to retrieve carousel data from the S3 bucket
carrouselRouter.get('', async (req, res) => {
    try {
        // List objects in the specified S3 bucket
        const params = {
            Bucket: BUCKET_NAME,
        };

        const data = await s3.listObjectsV2(params).promise();

        // Extract the URLs of the images from S3 and URL encode the keys
        const imageUrls = data.Contents.map((item) => {
            // URL encode the item.Key to handle special characters (like spaces)
            const encodedKey = encodeURIComponent(item.Key);
            return `https://${BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${encodedKey}`;
        });

        // Return the image URLs as JSON
        res.json({
            images: imageUrls
        });
    } catch (err) {
        console.error('Error fetching images from S3', err);
        res.status(500).json({ error: 'Failed to retrieve images from S3' });
    }
});

module.exports = carrouselRouter;

