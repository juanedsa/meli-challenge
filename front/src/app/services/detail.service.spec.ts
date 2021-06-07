import { DetailService } from './detail.service';
import { of } from 'rxjs';

describe('Service: Detail', () => {
  let httpClientSpy: { get: jasmine.Spy };
  let service: DetailService;

  beforeEach(() => {
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);
    service = new DetailService(httpClientSpy as any);
  });

  it('Should return detail of product', () => {
    const expectedDetail = {
      name: 'Juan',
      lastName: 'Salazar',
      item: {
        id: 'MLA907608945',
        title: 'Teclado Gamer Corsair K70 Mk.2 Qwerty Cherry Mx Speed Español Color Negro Con Luz Rgb',
        condition: 'new',
        picture: 'https://http2.mlstatic.com/D_661367-MLA44069980211_112020-O.jpg',
        shipping: true,
        sold_quantity: 5,
        price: { amount: 17235, currency: 'ARS', decimals: null }
      },
      description: 'Esto es una descripcion'
    };

    const query = 'id';

    httpClientSpy.get.and.returnValue(of(expectedDetail));

    service.detail(query).subscribe((detail) => {
      expect(detail.name).toBe('Juan');
      expect(detail.item.id).toBe('MLA907608945');
      expect(detail).toEqual(expectedDetail);
    });
  });
});
