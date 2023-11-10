import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeMainComponent } from './home-main.component';

describe('HomePageComponent', () => {
  let component: HomeMainComponent;
  let fixture: ComponentFixture<HomeMainComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HomeMainComponent]
    });
    fixture = TestBed.createComponent(HomeMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
