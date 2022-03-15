import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminEditDisciplineComponent } from './admin-edit-discipline.component';

describe('AdminEditDisciplineComponent', () => {
  let component: AdminEditDisciplineComponent;
  let fixture: ComponentFixture<AdminEditDisciplineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminEditDisciplineComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminEditDisciplineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
