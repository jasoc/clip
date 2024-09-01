import { ComponentFixture, TestBed } from '@angular/core/testing';

import { M3TabComponent } from './m3-tab.component';

describe('M3TabComponent', () => {
  let component: M3TabComponent;
  let fixture: ComponentFixture<M3TabComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [M3TabComponent],
    });
    fixture = TestBed.createComponent(M3TabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
