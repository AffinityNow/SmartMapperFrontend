import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecherchMotCleComponent } from './recherch-mot-cle.component';

describe('RecherchMotCleComponent', () => {
  let component: RecherchMotCleComponent;
  let fixture: ComponentFixture<RecherchMotCleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecherchMotCleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RecherchMotCleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
