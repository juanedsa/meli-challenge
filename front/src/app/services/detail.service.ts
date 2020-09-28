import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Detail } from '../models/detail.model';

@Injectable({
  providedIn: 'root'
})
export class DetailService {
  constructor(private http: HttpClient) {}

  public detail(id: string): Observable<Detail> {
    const url = `${environment.api}items/${id}`;

    return this.http.get<Detail>(url);
  }
}
