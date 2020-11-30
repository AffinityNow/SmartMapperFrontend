import { TestBed } from '@angular/core/testing';

import { PointInteretService } from './point-interet.service';
import {HttpClientTestingModule} from "@angular/common/http/testing";

describe('PointInteretService', () => {
  let service: PointInteretService;

  beforeEach(() => {
    TestBed.configureTestingModule({imports: [HttpClientTestingModule]});
    service = TestBed.inject(PointInteretService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
