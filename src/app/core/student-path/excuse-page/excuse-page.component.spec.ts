import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExcusePageComponent } from './excuse-page.component';

describe('ExcusePageComponent', () => {
  let component: ExcusePageComponent;
  let fixture: ComponentFixture<ExcusePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ExcusePageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ExcusePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
