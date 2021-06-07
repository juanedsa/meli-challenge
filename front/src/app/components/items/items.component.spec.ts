import { ComponentFixture, fakeAsync, TestBed, tick, waitForAsync } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { ItemsComponent } from './items.component';
import { RouterTestingModule } from '@angular/router/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { of, Subject } from 'rxjs';
import { Items } from 'src/app/models/items.model';
import { ActivatedRoute, Params } from '@angular/router';

describe('ItemsComponent', () => {
  let component: ItemsComponent;
  let fixture: ComponentFixture<ItemsComponent>;
  let params: Subject<Params>;

  beforeEach(
    waitForAsync(() => {
      params = new Subject<Params>();
      TestBed.configureTestingModule({
        imports: [RouterTestingModule, HttpClientTestingModule, FormsModule],
        declarations: [ItemsComponent],
        providers: [{ provide: ActivatedRoute, useValue: { params } }],
        schemas: [
          CUSTOM_ELEMENTS_SCHEMA
        ],
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should set the variables of component', () => {
    const expectedItems: Items = {
      categories: ['Computacion', 'Juegos'],
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

    const searchSpy = spyOn((component as any).searchService, 'search').and.returnValue(of(expectedItems));

    component.search('query');

    expect(component.isReady).toBeTruthy();
    expect(component.categories.length).toBeGreaterThanOrEqual(0);
    expect(component.loading).toBeFalsy();
  });

  it('should navigate to detail page', () => {
    const navigateSpy = spyOn((component as any).router, 'navigate');

    component.goToDetail('query');

    expect(navigateSpy).toHaveBeenCalledWith(['/detalle/query']);
  });

  describe('When getParams() is called', () => {
    it('should call search()', fakeAsync(() => {
      const searchSpy = spyOn(component as any, 'search');
      params.next({ query: 1 });
      tick();
      (component as any).getParams();
      expect(searchSpy).toHaveBeenCalled();
    }));

    it('should not call search()', fakeAsync(() => {
      const searchSpy = spyOn(component as any, 'search');
      params.next({ query: null });
      tick();
      (component as any).getParams();
      expect(searchSpy).not.toHaveBeenCalled();
    }));
  });
});
