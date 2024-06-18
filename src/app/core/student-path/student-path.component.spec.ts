import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentPathComponent } from './student-path.component';

describe('StudentPathComponent', () => {
  let component: StudentPathComponent;
  let fixture: ComponentFixture<StudentPathComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StudentPathComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(StudentPathComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
