import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Resource } from './resource.model';

@Injectable({
  providedIn: 'root',
})
export class ResourceService {
  constructor(private http: HttpClient) {}

  private handleError(errorRes: HttpErrorResponse): Observable<never> {
    let message;

    if (errorRes.error instanceof ErrorEvent) {
      message = errorRes.error.message;
    } else {
      message = errorRes.error;
    }

    // returns observable with error message
    return throwError(message);
  }

  getResources(): Observable<Resource[]> {
    return this.http.get<Resource[]>('/api/resources');
  }

  searchResources(searchedTerm: string): Observable<Resource[]> {
    return this.http.get<Resource[]>(`/api/resources/s/${searchedTerm}`);
  }

  getResourceById(id: string): Observable<Resource> {
    return this.http.get<Resource>(`/api/resources/${id}`);
  }

  createResource(body: Resource): Observable<Resource> {
    return this.http
      .post<Resource>(`/api/resources`, body)
      .pipe(catchError(this.handleError));
  }

  updateResource(id: string, body: Resource): Observable<Resource> {
    return this.http
      .patch<Resource>(`/api/resources/${id}`, body)
      .pipe(catchError(this.handleError));
  }

  deleteResource(id: string): Observable<Resource> {
    return this.http.delete<Resource>(`/api/resources/${id}`);
  }
}
