import { Injectable } from '@angular/core';
import { NgxImageCompressService } from 'ngx-image-compress';
import { environment } from 'src/environments/environment';

const API_URL = environment.urlServer;
@Injectable({
    providedIn: 'root'
})
export class GlobalService {
    host = API_URL;
    constructor(private imageCompress: NgxImageCompressService) {
    }
    public imgResultBeforeCompress: string;
    public imgResultAfterCompress: string;
    public fileImg: File;
    ValueProgress: number = 0;


    b64toBlob(b64Data) {
        // var base64Img = b64Data;//.replace("data:image/jpeg;base64,", "");
        var sliceSize = 512;
        //b64Data.type="image/jpeg";
        var byteCharacters = atob(b64Data);
        var byteArrays = [];

        for (var offset = 0; offset < byteCharacters.length; offset += sliceSize) {
            var slice = byteCharacters.slice(offset, offset + sliceSize);
            var byteNumbers = new Array(slice.length);
            for (var i = 0; i < slice.length; i++) {
                byteNumbers[i] = slice.charCodeAt(i);
            }
            var byteArray = new Uint8Array(byteNumbers);
            byteArrays.push(byteArray);
        }
        var blob = new Blob(byteArrays);
        return blob;
    }


    compressFile() {
    
        this.ValueProgress=0;
        this.imageCompress.uploadFile().then(({ image, orientation }) => {
         
            //this.imgResultBeforeCompress = image;
            var img = new Image();
            var ratio = 100;
            img.onload = () => {
                var oldWidth = img.width;
                var oldHeight = img.height;
                ratio = Math.floor((350 / Math.min(oldHeight, oldWidth)) * 100);
                let interval = setInterval(() => {
                    this.ValueProgress = this.ValueProgress + Math.floor(ratio * 10) + 1;
                    if (this.ValueProgress >= 100) {
                        this.ValueProgress = 100;
                        this.imgResultBeforeCompress = image;
                        clearInterval(interval);
                    }
                }, 2000);
                this.imageCompress.compressFile(image, orientation, ratio, 50).then(
                    result => {
                        this.imgResultAfterCompress = result;
                        var strType = this.imgResultAfterCompress.split(";")[0].split(":")[1];
                        var strImg = this.imgResultAfterCompress.substr(this.imgResultAfterCompress.indexOf(",") + 1);
                        var strExtention = strType.split("/")[1];
                        this.fileImg = new File([this.b64toBlob(strImg)], '.' + strExtention, { type: strType });//'image/png'
                    }
                );
            };
            img.src = image;
        });

    }
}