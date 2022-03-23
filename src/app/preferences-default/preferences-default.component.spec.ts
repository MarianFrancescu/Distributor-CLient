import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreferencesDefaultComponent } from './preferences-default.component';

describe('PreferencesDefaultComponent', () => {
  let component: PreferencesDefaultComponent;
  let fixture: ComponentFixture<PreferencesDefaultComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PreferencesDefaultComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PreferencesDefaultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
