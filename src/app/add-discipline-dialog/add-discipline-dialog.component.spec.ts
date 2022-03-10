import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddDisciplineDialogComponent } from './add-discipline-dialog.component';

describe('AddDisciplineDialogComponent', () => {
  let component: AddDisciplineDialogComponent;
  let fixture: ComponentFixture<AddDisciplineDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddDisciplineDialogComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddDisciplineDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
