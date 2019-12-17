

import { Injectable } from '@angular/core';
import * as AWS from 'aws-sdk/global';
import * as S3 from 'aws-sdk/clients/s3';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import { FileUpload } from './file-upload';

@Injectable()
export class UploadFileService {

  // FOLDER = 'jsa-s3/';
  BUCKET;
  //BUCKET1 = 'cdnproxyserver1';
  //BUCKET2 = 'videotubechild1';
 count1=0;
 count2=0;

  constructor() {
    this.getS3BucketNameString();
   }

  getS3BucketNameString() {

    var randomBUCKET = [
      "videotubechildcont1",
      "videotubechildcont2"
    ];
    
     this.BUCKET = randomBUCKET[Math.floor(Math.random()*randomBUCKET.length)];


  }

  private getS3Bucket(): any {
    const bucket = new S3(
      {
        accessKeyId: 'AKIAVS27BLNVB5PD3YBF',
        secretAccessKey: '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',
        region: 'us-east-1'
        
      }
    );

    return bucket;
  }

  uploadfile(file) {
    const params = {
      Bucket: this.BUCKET,
      // Key: this.FOLDER + file.name,
      Key: file.name,
      Body: file,
      ACL: 'public-read-write',
      ContentType: 'video/mp4'
    };

    this.getS3Bucket().upload(params, function (err, data) {
      if (err) {
        console.log('There was an error uploading your file: ', err);
        return false;
      }

      console.log('Successfully uploaded file.', data);
      return true;
    });
  }

  getFiles(): Observable<Array<FileUpload>> {
    const fileUploads = new Array<FileUpload>();

    const params = {
      Bucket: this.BUCKET,
      // Prefix: this.FOLDER
    };

    this.getS3Bucket().listObjects(params, function (err, data) {
      if (err) {
        console.log('There was an error getting your files: ' + err);
        return;
      }

      console.log('Successfully get files.', data);
        debugger;
      const fileDatas = data.Contents;
      console.log(fileDatas);   
      fileDatas.forEach(function (file) {
        fileUploads.push(new FileUpload(file.Key, 'https://s3.amazonaws.com/' + params.Bucket + '/' + file.Key));
      });
    });

    return Observable.of(fileUploads);
  }

}
