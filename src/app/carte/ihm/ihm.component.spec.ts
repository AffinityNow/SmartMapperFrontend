import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IHMComponent } from './ihm.component';
import {HttpClientTestingModule} from "@angular/common/http/testing";


describe('IHMComponent', () => {
  let component: IHMComponent;
  let fixture: ComponentFixture<IHMComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
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
