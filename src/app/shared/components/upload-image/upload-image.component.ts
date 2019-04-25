import {Component, ViewChild, EventEmitter, Type, Input, Output} from '@angular/core';
import { ImageCroppedEvent } from 'ngx-image-cropper';
@Component({
  selector: 'app-upload-image',
  templateUrl: './upload-image.component.html',
  styleUrls: ['./upload-image.component.scss'],
})

export class UploadImageComponent {

  @Output() sendData : EventEmitter <any> = new EventEmitter<any>();
  imageChangedEvent: any = '';
  originalImageChangeEvent: any = '';
  croppedImage: any = '';
  viewMenuFlag: boolean = false;

  fileChangeEvent(event: any): void {
    if(event.target.files && event.target.files[0]){
      this.originalImageChangeEvent = event;
      this.startCrop();
    }
  }
  startCrop(){
    this.imageChangedEvent = this.originalImageChangeEvent;
    console.log(this.originalImageChangeEvent);
  }
  saveCrop(){
    this.imageChangedEvent = '';
  }
  viewMenu(){
    this.viewMenuFlag = !this.viewMenuFlag;
  }
  imageCropped(event: ImageCroppedEvent) {
    this.croppedImage = event.base64;
    const imageFile = new File([event.base64], this.imageChangedEvent.target.files[0].name, { type: 'image/jpeg' });
    this.sendData.emit(imageFile);
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