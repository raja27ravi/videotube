import { Component, OnInit, Input } from '@angular/core';
import { FileUpload } from '../file-upload';

@Component({
  selector: 'app-details-upload',
  templateUrl: './details-upload.component.html',
  styleUrls: ['./details-upload.component.css']
})
export class DetailsUploadComponent implements OnInit {

  @Input() fileUpload: FileUpload;
  netImage:any = "../assets/play.jpeg";
  constructor() { }

  ngOnInit() {
  }
  goTourl(filename:any) {
    debugger;
    // refer this like to form s3 url
    // https://stackoverflow.com/questions/44400227/how-to-get-the-url-of-a-file-on-aws-s3-using-aws-sdk
    window.location.href = filename;
  }
}
