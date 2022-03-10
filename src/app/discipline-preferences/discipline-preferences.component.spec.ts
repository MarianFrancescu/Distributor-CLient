import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisciplinePreferencesComponent } from './discipline-preferences.component';

describe('DisciplinePreferencesComponent', () => {
  let component: DisciplinePreferencesComponent;
  let fixture: ComponentFixture<DisciplinePreferencesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DisciplinePreferencesComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DisciplinePreferencesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
