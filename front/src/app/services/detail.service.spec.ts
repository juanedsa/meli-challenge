import { TestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { DetailService } from './detail.service';

describe('Service: Detail', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [DetailService]
    });
  });

  it('should ...', inject([DetailService], (service: DetailService) => {
    expect(service).toBeTruthy();
  }));
});
