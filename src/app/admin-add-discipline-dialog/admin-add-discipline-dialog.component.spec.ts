import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminAddDisciplineDialogComponent } from './admin-add-discipline-dialog.component';

describe('AdminAddDisciplineDialogComponent', () => {
  let component: AdminAddDisciplineDialogComponent;
  let fixture: ComponentFixture<AdminAddDisciplineDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminAddDisciplineDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminAddDisciplineDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
