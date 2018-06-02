import { Car } from './app.model';
import { HttpClient, HttpParams } from '@angular/common/http'
import { Injectable } from "@angular/core";


@Injectable()
export class CarService {

    constructor(private http: HttpClient) { }

    getCarsSmall() {
        let params: HttpParams = undefined
        return this.http.get<Car[]>(`${'http://localhost:3000'}/data`, {params: params})
    }
}
