import { Component, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-input-page',
  templateUrl: './input-page.component.html',
  styleUrls: ['./input-page.component.css']
})
export class InputPageComponent {
  fileName: string = '';
  fileSelected: boolean = false;
  file: any;

  @Output() dataEvent = new EventEmitter<any>();
  @ViewChild('fileInput', { static: false }) fileInput!: ElementRef<HTMLInputElement>;

  onFileSelected(event: any): void {
    this.file = event.target.files[0];
    if (this.file) {
      this.fileName = this.file.name;
      this.fileSelected = true;
    } else {
      this.fileName = '';
      this.fileSelected = false;
    }
  }

  onUpload(): void {
    // Implement your upload logic here
    const formBody = new FormData();
    formBody.append('file', this.file);
    fetch('http://127.0.0.1:5000/cluster/cluster', {
      method: 'POST',
      body: formBody
    })
      .then((res) => res.json())
      .then((data) => {
        // data in json format
        // key: name, value: [lat, lng, cluster]
        // pass the values to map component
        console.log('sending');
        this.dataEvent.emit(data);
        console.log('sent');
      })
      .catch((err) => console.log(err));

  }

  changeFile(): void {
    this.fileName = '';
    this.fileSelected = false;
    this.fileInput.nativeElement.value = '';
  }
}
