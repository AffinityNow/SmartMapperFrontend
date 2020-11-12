import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GeolocalsiationComponent } from './geolocalsiation.component';

describe('GeolocalsiationComponent', () => {
  let component: GeolocalsiationComponent;
  let fixture: ComponentFixture<GeolocalsiationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GeolocalsiationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GeolocalsiationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
