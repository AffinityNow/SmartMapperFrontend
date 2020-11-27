import { TestBed } from '@angular/core/testing';

import { PointInteretService } from './point-interet.service';

describe('PointInteretService', () => {
  let service: PointInteretService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PointInteretService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
