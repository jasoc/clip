import { ComponentFixture, TestBed } from '@angular/core/testing';

import { M3ChipComponent } from './m3-chip.component';

describe('M3ChipComponent', () => {
  let component: M3ChipComponent;
  let fixture: ComponentFixture<M3ChipComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [M3ChipComponent]
    });
    fixture = TestBed.createComponent(M3ChipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
