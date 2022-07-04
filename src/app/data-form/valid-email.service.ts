import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
// import { delay, tap } from 'rxjs';
import { delay, tap, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})

export class ValidEmailService {
  constructor(private http: HttpClient) {}

  validEmail(email: string) {
    return this.http.get('assets/data/emails.json').pipe(
      // delay(2000),
      map((data: any) => data.emails),
      tap(console.log),
      map((data: { email: string }[]) => data.filter(v => v.email === email)),
      tap(console.log),
      map((data: any[]) => data.length > 0),
      tap(console.log),
    );
  }
}
