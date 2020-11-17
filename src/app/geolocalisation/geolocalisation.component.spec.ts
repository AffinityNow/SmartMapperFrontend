import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { GeolocalisationComponent } from './geolocalisation.component';


describe('LocalisationComponent', () => {
  let component: GeolocalisationComponent;
  let fixture: ComponentFixture<GeolocalisationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GeolocalisationComponent ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GeolocalisationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
