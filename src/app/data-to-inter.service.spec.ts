import { TestBed } from '@angular/core/testing';

import { DataToInterService } from './data-to-inter.service';

describe('DataToInterService', () => {
  let service: DataToInterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DataToInterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
