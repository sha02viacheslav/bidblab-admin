import {Component, ViewChild, EventEmitter, Type, Input, Output, OnInit} from '@angular/core';
import { ImageCroppedEvent } from 'ngx-image-cropper';
@Component({
  selector: 'app-upload-image',
  templateUrl: './upload-image.component.html',
  styleUrls: ['./upload-image.component.scss'],
})

export class UploadImageComponent implements OnInit {

  @Output() sendData : EventEmitter <any> = new EventEmitter<any>();
  @Input() originalImage;
  croppedImage: any = '';
  imageSource: any = '';
  viewMenuFlag: boolean = false;

  ngOnInit(){
    if(this.originalImage){
      var reader = new FileReader();
      reader.onload = (event) => {
        this.croppedImage = reader.result; 
      }
      reader.readAsDataURL(this.originalImage);
    }
  }

  fileChangeEvent(event: any): void {
    if(event.target.files && event.target.files[0]){
      this.originalImage = event.target.files[0]; 
      this.startCrop();
    }
  }
  startCrop(){
    this.imageSource = this.originalImage;
  }
  saveCrop(){
    this.imageSource = '';
  }
  deletePicture(){
    this.imageSource = '';
    this.croppedImage = '';
    this.sendData.emit('');
  }
  viewMenu(){
    this.viewMenuFlag = !this.viewMenuFlag;
  }
  imageCropped(event: ImageCroppedEvent) {
    this.croppedImage = event.base64;
    var imageFile:Blob=this.dataURItoBlob(event.base64);
    this.sendData.emit(imageFile);
  }

  dataURItoBlob(dataURI) {
    var binary = atob(dataURI.split(',')[1]);
    var array = [];
    for (var i = 0; i < binary.length; i++) {
      array.push(binary.charCodeAt(i));
    }
    return new Blob([new Uint8Array(array)], {
      type: 'image/jpeg'
    });
  }
  imageLoaded() {
    // show cropper
    // console.log("imageLoaded");
  }
  cropperReady() {
    // cropper ready
    // console.log("cropperReady");
  }
  loadImageFailed() {
    // show message
    // console.log("loadImageFailed");
  }
}