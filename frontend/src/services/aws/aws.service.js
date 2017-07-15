'use strict';


export default class AWSService {

    static get $inject(){
        return ['$http', '$window','API_URL'];
    }

    constructor($http,$window,API_URL) {
        this.$http = $http;
        this.$window = $window;
        this.API_URL = API_URL;
        this.AWS = require('aws-sdk');
        this.AWS.config.update({ accessKeyId: 'AKIAIC2KHRKPKSVPW4QQ', secretAccessKey: '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' });
        this.AWS.config.region = 'eu-central-1';
        this.s3 = new AWS.S3();

    }

    static get name(){
        return 'AWSService';
    }

    upload(file){
        return new Promise((resolve, reject) =>{
            var key =  guid();
            var params = { Bucket: "delivere", Key: key, Body: file.data, ContentType: file.type, ServerSideEncryption: 'AES256' };
     
            this.s3.putObject(params, function(err, data) {
                if(err){
                    reject(err);
                }else{
                    resolve("https://s3.eu-central-1.amazonaws.com/delivere/" + key);
                }
            });
        });
    }

}

function guid() {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }
  return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
    s4() + '-' + s4() + s4() + s4();
}