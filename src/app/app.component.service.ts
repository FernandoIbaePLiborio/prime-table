import { Http, Response, Headers, RequestOptionsArgs } from '@angular/http';
import { Car } from './app.model';
import { HttpClient, HttpParams } from '@angular/common/http'
import { Injectable } from "@angular/core";
import { Observable } from 'rxjs';
import { ConsultaFiltro } from './paginador/paginador.model';
import { CAR_API } from './app.api';
import 'rxjs/add/operator/map'

@Injectable()
export class CarService {
    constructor(private http: HttpClient) { }

    cars(filtro?: ConsultaFiltro): Observable<Car[]> {
        let params: HttpParams = undefined
        if (filtro !== undefined) {
            params = new HttpParams().set('vin', filtro.vin).set('year', filtro.year).set('brand', filtro.brand).set('color', filtro.color);
            /* no lugar do set poderia ser usado append e até ser encadeado mais de um set ex:
            params = new HttpParams().set('q', search).set(...) */
        }
        return this.http.get<Car[]>(`${CAR_API}/data`, { params: params })
    }
    carById(id: string): Observable<Car> {
        return this.http.get<Car>(`${CAR_API}/data/${id}`)
    }

    carsSearch(filtro?: string): Observable<Car[]> {
        let params: HttpParams = undefined
        if (filtro) {
            params = new HttpParams().set('q', filtro)
            /* no lugar do set poderia ser usado append e até ser encadeado mais de um set ex:
            params = new HttpParams().set('q', search).set(...) */
        }
        return this.http.get<Car[]>(`${CAR_API}/data`, { params: params })
    }

    /*   exportacaoPDF = (filtro: Car): Observable<string> => {
          let params: HttpParams = undefined;
          if (filtro || filtro){
              params = new HttpParams().set('p', filtro.vin);
          }
          let resourcePath = "http://localhost:3000'}/data";
          return this.http.post<Car[]>(resourcePath, {params: params})
      }; */

}
