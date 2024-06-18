import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import QRCode from 'qrcode';
import {QrCodeService} from "../../../../qr-code.service";

@Component({
  selector: 'app-qr-generation-page',
  templateUrl: './qr-generation-page.component.html',
  styleUrls: ['./qr-generation-page.component.css']
})
export class QrGenerationPageComponent implements OnInit {
  @ViewChild('qrCanvas', { static: false }) qrCanvas!: ElementRef<HTMLCanvasElement>;
  qrCodeUrl = '';
  course_id: string = '';
  validity_period: number = 10; // Default validity period in minutes
  date: string = ''; // Formatted date

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private qrCodeService: QrCodeService
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.course_id = params.get('id') || '';
      console.log('Course ID:', this.course_id); // Debug statement
    });
    this.date = this.formatDate(new Date());
  }

  private formatDate(date: Date): string {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${year}/${month}/${day}`;
  }

  async generateQr() {
    console.log('Course ID:', this.course_id); // Debug statement
    console.log('Validity Period:', this.validity_period); // Debug statement

    if (this.course_id && this.validity_period > 0) {
      this.qrCodeService.generatePasscode(this.course_id, this.validity_period, this.date).subscribe(async response => {
        const qrData = {
          passcode: response.passcode,
          course_id: this.course_id,
          date: this.date
        };

        // Generate the link pointing to the new component with query parameters
        const link = `http://192.168.1.40:4200/student-dashboard/scanQR?passcode=${encodeURIComponent(qrData.passcode)}&course_id=${encodeURIComponent(qrData.course_id)}&date=${encodeURIComponent(qrData.date)}`;

        this.qrCodeUrl = link;

        // Generate QR code on canvas
        const canvas = this.qrCanvas.nativeElement;
        await QRCode.toCanvas(canvas, this.qrCodeUrl, { width: 500 });

        // Overlay logo
        const ctx = canvas.getContext('2d');
        if (ctx) {
          const logo = new Image();
          logo.src = 'assets/imgs/ph-logo.png';
          logo.onload = () => {
            const logoSize = 80; // Logo size
            const x = (canvas.width - logoSize) / 2;
            const y = (canvas.height - logoSize) / 2;
            ctx.drawImage(logo, x, y, logoSize, logoSize);
          };
        }
      }, error => {
        console.error('Error generating passcode:', error);
      });
    } else {
      console.error('Course ID or validity period is invalid.');
    }
  }
}
