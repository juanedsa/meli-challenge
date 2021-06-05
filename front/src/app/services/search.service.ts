import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { BehaviorSubject, Observable } from 'rxjs';
import { Items } from '../models/items.model';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  private categories: BehaviorSubject<Array<string>> = new BehaviorSubject<Array<string>>(['']);

  constructor(private http: HttpClient) {}

  get categories$() {
    return this.categories.asObservable();
  }

  public search(query: string): Observable<Items> {
    const url = `${environment.api}search?q=${query}`;

    return this.http.get<Items>(url).pipe(tap((items: Items) => this.categories.next(items.categories)));
  }
}
