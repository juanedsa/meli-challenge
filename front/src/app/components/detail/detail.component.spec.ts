import { ComponentFixture, fakeAsync, TestBed, tick, waitForAsync } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { DetailComponent } from './detail.component';
import { RouterTestingModule } from '@angular/router/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { of, Subject } from 'rxjs';
import { ActivatedRoute, Params } from '@angular/router';

describe('DetailComponent', () => {
  let component: DetailComponent;
  let fixture: ComponentFixture<DetailComponent>;
  let params: Subject<Params>;

  beforeEach(
    waitForAsync(() => {
      params = new Subject<Params>();
      TestBed.configureTestingModule({
        imports: [RouterTestingModule, HttpClientTestingModule, FormsModule],
        declarations: [DetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: { params } }],
        schemas: [CUSTOM_ELEMENTS_SCHEMA]
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  describe('When getParams() is called', () => {
    it('should call getDetail()', fakeAsync(() => {
      const getDetailSpy = spyOn(component as any, 'getDetail');
      params.next({ id: 1 });
      tick();
      (component as any).getParams();
      expect(getDetailSpy).toHaveBeenCalled();
    }));

    it('should not call getDetail()', fakeAsync(() => {
      const getDetailSpy = spyOn(component as any, 'getDetail');
      params.next({ id: null });
      tick();
      (component as any).getParams();
      expect(getDetailSpy).not.toHaveBeenCalled();
    }));
  });

  describe('When productCondition() is called', () => {
    it('should return "Usado"', () => {
      component.condition = 'used';
      expect(component.productCondition).toBe('Usado');
    });
    it('should return "Nuevo"', () => {
      component.condition = 'new';
      expect(component.productCondition).toBe('Nuevo');
    });
  });

  describe('When search() is called', () => {
    it('should navidate to /query', () => {
      const navigateSpy = spyOn((component as any).router, 'navigate');
      component.search('query');
      expect(navigateSpy).toHaveBeenCalledWith(['/query']);
    });
  });

  describe('When getDetail() is called', () => {
    it('should get Datail of product', () => {
      const navigateSpy = spyOn((component as any).detailService, 'detail').and.returnValue(
        of({
          description: 'description',
          item: {
            picture: 'picture',
            sold_quantity: 200,
            title: 'title',
            condition: 'new',
            price: {
              amount: 200,
              currency: 'USD'
            }
          }
        })
      );

      (component as any).getDetail(1);

      expect(component.loading).toBeFalsy();
      expect(component.picture).toBe('picture');
      expect(component.condition).toBe('new');
      expect(component.soldQuantity).toBe(200);
      expect(component.title).toBe('title');
      expect(component.currency).toBe('USD');
    });
  });
});
