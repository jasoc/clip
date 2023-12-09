import { ComponentFixture, TestBed } from '@angular/core/testing';

import { M3IconComponent } from './m3-icon.component';

describe('M3IconComponent', () => {
  let component: M3IconComponent;
  let fixture: ComponentFixture<M3IconComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [M3IconComponent]
    });
    fixture = TestBed.createComponent(M3IconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
