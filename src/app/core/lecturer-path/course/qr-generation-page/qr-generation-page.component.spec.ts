import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QrGenerationPageComponent } from './qr-generation-page.component';

describe('QrGenerationPageComponent', () => {
  let component: QrGenerationPageComponent;
  let fixture: ComponentFixture<QrGenerationPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [QrGenerationPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(QrGenerationPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
