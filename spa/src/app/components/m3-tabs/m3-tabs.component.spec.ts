import { ComponentFixture, TestBed } from '@angular/core/testing';

import { M3TabsComponent } from './m3-tabs.component';

describe('M3TabsComponent', () => {
  let component: M3TabsComponent;
  let fixture: ComponentFixture<M3TabsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [M3TabsComponent]
    });
    fixture = TestBed.createComponent(M3TabsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
