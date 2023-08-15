import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavigationDrawerComponent } from './navigation-drawer.component';

describe('NavigationDrawerComponent', () => {
  let component: NavigationDrawerComponent;
  let fixture: ComponentFixture<NavigationDrawerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NavigationDrawerComponent]
    });
    fixture = TestBed.createComponent(NavigationDrawerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
