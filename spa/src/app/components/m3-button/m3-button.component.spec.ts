import { ComponentFixture, TestBed } from '@angular/core/testing';

import { M3ButtonComponent } from './m3-button.component';

describe('M3ButtonComponent', () => {
  let component: M3ButtonComponent;
  let fixture: ComponentFixture<M3ButtonComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [M3ButtonComponent]
    });
    fixture = TestBed.createComponent(M3ButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
