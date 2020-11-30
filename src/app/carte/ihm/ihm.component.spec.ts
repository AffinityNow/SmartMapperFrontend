import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IHMComponent } from './ihm.component';

describe('IHMComponent', () => {
  let component: IHMComponent;
  let fixture: ComponentFixture<IHMComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IHMComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IHMComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
