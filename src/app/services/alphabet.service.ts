import { Alphabet } from './../models/alphabet';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, reduce, first, filter, tap } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AlphabetService {

  constructor(private http: HttpClient) { }

  private readonly dataStore = 'assets/alpha-data.json';

  getAlphabetList(): Observable<string[]> {
    return this.http.get<Alphabet[]>(this.dataStore).pipe(map(a => a.map(d => d.character)));
  }

  getAlphabet(character: string): Observable<Alphabet> {
    return this.http.get<Alphabet[]>(this.dataStore).pipe(map(a => a.find(d => d.character === character)));
  }
}
