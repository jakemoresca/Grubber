import {Http, Headers} from 'angular2/http';
import {Injectable} from 'angular2/core';
import {Car} from '../core/cars/car';
import {CarMake} from '../core/cars/car-make';

/**
 * car service
 */
@Injectable()
export class CarService {
    cars: Car[] = [];
    carMakes: CarMake[] = [];
    apiUrl: string = "/api/";

    constructor(private _http: Http) { }

    getCars() {
        //return an observable
        return this._http.get(this.apiUrl + 'car')
            .map((response) => {
                return response.json();
            })
            .map((cars: Array<any>) => {
                let result: Array<Car> = [];

                if (cars) {
                    cars.forEach((car) => {
                        result.push(car)
                    });
                }
                return result;
            });
    }

    getCar(userId: string) {
        return this._http.get(this.apiUrl + 'car/' + userId)
            .map((response) => {
                return response.json();
            })
            .map((car: Car) => {
                let result: any = null;

                if (car) {
                    result = car;
                };
                return result;
            });
    }

    saveCar(car: Car) {
        var body = JSON.stringify(car);
        var headers = new Headers();
        headers.append('Content-Type', 'application/json');

        return this._http.post(this.apiUrl + 'car', body, {
                headers: headers
            })
            .map((response) => {
                return response.json();
            })
            .map((car: Car) => {
                let result: any = null;

                if (car) {
                    result = car;
                };
                return result;
            });
    }

    getCarMakes() {
        //return an observable
        return this._http.get(this.apiUrl + 'carmake')
            .map((response) => {
                return response.json();
            })
            .map((carMakes: Array<any>) => {
                let result: Array<CarMake> = [];

                if (carMakes) {
                    carMakes.forEach((carMake) => {
                        result.push(carMake)
                    });
                }
                return result;
            });
    }

    getCarMake(id: number) {
        return this._http.get(this.apiUrl + 'carmake/' + id.toString())
            .map((response) => {
                return response.json();
            })
            .map((carMake: CarMake) => {
                let result: any = null;

                if (carMake) {
                    result = carMake;
                };
                return result;
            });
    }

    private _fetchFailed(error: any) {
        console.error(error);
        return Promise.reject(error);
    }
}