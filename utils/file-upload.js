const aws = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3');

//Configurations for aws s3
aws.config.update({
    secretAccessKey:process.env.S3_SECRET_ACCESS_KEY,
    accessKeyId:process.env.S3_ACCESS_KEY_ID,
    region:'eu-central-1'
});
 
const s3 = new aws.S3();
const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: 'upspot-images',
    acl: 'public-read',
    metadata: function (req, file, cb) {
      cb(null, {fieldName: 'TESTING_META_DATA'});
    },
    key: function (req, file, cb) {
      cb(null, Date.now().toString())
    }
  })
});

module.exports = upload;


