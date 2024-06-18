import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LecturerPathComponent } from './lecturer-path.component';

describe('LecturerPathComponent', () => {
  let component: LecturerPathComponent;
  let fixture: ComponentFixture<LecturerPathComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LecturerPathComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LecturerPathComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
