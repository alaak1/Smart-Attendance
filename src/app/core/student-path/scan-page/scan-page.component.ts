import { Component, OnInit } from '@angular/core';
import { ZXingScannerComponent } from '@zxing/ngx-scanner';
import { BarcodeFormat } from '@zxing/library';

@Component({
  selector: 'app-scan-page',
  templateUrl: './scan-page.component.html',
  styleUrls: ['./scan-page.component.css']
})
export class ScanPageComponent implements OnInit {
  qrResultString: string = '';
  currentDevice: MediaDeviceInfo | undefined;
  hasDevices: boolean = false;
  hasPermission: boolean = false;

  formats: BarcodeFormat[] = [BarcodeFormat.QR_CODE];

  constructor() {}

  ngOnInit(): void {
    // Optionally set the device here, or handle device selection logic
  }

  onCamerasFound(devices: MediaDeviceInfo[]): void {
    this.hasDevices = devices && devices.length > 0;
    // Select the preferred device, for example the first one
    if (this.hasDevices) {
      this.currentDevice = devices[0];
    }
  }

  onHasPermission(has: boolean): void {
    this.hasPermission = has;
  }

  handleQrCodeResult(result: string): void {
    this.qrResultString = result;
    try {
      const qrData = JSON.parse(result);
      console.log('Scanned QR Code Data:', qrData);
      // Handle the scanned data as needed
    } catch (error) {
      console.error('Error parsing QR code result:', error);
    }
  }
}
