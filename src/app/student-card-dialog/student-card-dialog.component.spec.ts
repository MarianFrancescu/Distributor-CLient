import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentCardDialogComponent } from './student-card-dialog.component';

describe('StudentCardDialogComponent', () => {
  let component: StudentCardDialogComponent;
  let fixture: ComponentFixture<StudentCardDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StudentCardDialogComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentCardDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
