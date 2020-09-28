import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { Items } from '../models/items.model';

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  constructor(private http: HttpClient) {}

  public search(query: string): Observable<Items> {
    const url = `${environment.api}search?q=${query}`;

    return this.http.get<Items>(url);
  }
}
