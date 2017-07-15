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
        var params = { Bucket: "delivere", Key: photo.name, ContentType: file.type, Body: file.data, ServerSideEncryption: 'AES256' };
 
        s3.putObject(params, function(err, data) {
        if(err) {
            return null;
        }
        else {
            console.log(data);
      }
    })

    }

    register(name, surname, email, pass, address, location, district) {
        return this.$http.post(`${ this.API_URL }/user/signup/customer`, {
            name: name,
            surname: surname,
            email: email,
            password: pass,
            address: address,
            location: location,
            district: district
        });
    }



}