import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecherchPointInteretComponent } from './recherch-point-interet.component';

describe('RecherchPointInteretComponent', () => {
  let component: RecherchPointInteretComponent;
  let fixture: ComponentFixture<RecherchPointInteretComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecherchPointInteretComponent ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RecherchPointInteretComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
