import { TestBed } from '@angular/core/testing';

import { AlphabetService } from './alphabet.service';

describe('AlphabetService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AlphabetService = TestBed.get(AlphabetService);
    expect(service).toBeTruthy();
  });
});
