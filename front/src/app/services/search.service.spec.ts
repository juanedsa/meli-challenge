import { SearchService } from './search.service';
import { of } from 'rxjs';
import { Items } from '../models/items.model';

describe('Service: Search', () => {
  let httpClientSpy: { get: jasmine.Spy };
  let service: SearchService;

  beforeEach(() => {
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);
    service = new SearchService(httpClientSpy as any);
  });

  it('should return expected items (HttpClient called once)', () => {
    const expectedItems: Items = {
      categories: [],
      items: [
        {
          id: 'MLA908685377',
          title: 'Samsung Galaxy A12 64gb 4gb Ram',
          condition: 'new',
          picture: 'http://http2.mlstatic.com/D_750425-MLA44947327770_022021-O.jpg',
          shipping: true,
          state_name: 'Buenos Aires',
          price: { amount: 29999, currency: 'ARS', decimals: null }
        }
      ],
      lastName: 'Salazar',
      name: 'Juan'
    };

    const query = 'Android';

    httpClientSpy.get.and.returnValue(of(expectedItems));

    service.search(query).subscribe((itemsResult) => {
      expect(itemsResult.items.length).toBeGreaterThan(0);
    });
  });
});
