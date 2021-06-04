/* tslint:disable:no-unused-variable */

import { TestBed, inject, waitForAsync } from '@angular/core/testing';
import { DetailService } from './detail.service';

describe('Service: Detail', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DetailService]
    });
  });

  it('should ...', inject([DetailService], (service: DetailService) => {
    expect(service).toBeTruthy();
  }));
});
