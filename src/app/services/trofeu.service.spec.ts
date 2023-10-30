import { TestBed } from '@angular/core/testing';

import { TrofeuService } from './trofeu.service';

describe('TrofeuService', () => {
  let service: TrofeuService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TrofeuService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
