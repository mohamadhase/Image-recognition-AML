import { TestBed } from '@angular/core/testing';

import { SharedPhotoService } from './shared-photo.service';

describe('SharedPhotoService', () => {
  let service: SharedPhotoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SharedPhotoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
