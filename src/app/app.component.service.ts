import { Car } from './app.model';
import { HttpClient, HttpParams } from '@angular/common/http'
import { Injectable } from "@angular/core";


@Injectable()
export class CarService {

    constructor(private http: HttpClient) { }

    getCarsSmall(page?: string, rows?: string, field?: string) {
        let params: HttpParams = undefined
        if (page || rows){
            params = new HttpParams().set('p', page).set('r', rows)
        }
        return this.http.get<Car[]>(`${'http://localhost:3000'}/data`, {params: params})
    }
}
