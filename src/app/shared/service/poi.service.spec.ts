import {PoiService} from './poi.service';
import {HttpErrorResponse} from "@angular/common/http";
import {defer} from "rxjs";

import {PointInteret} from "../model/pointInteret";

// Create async observable error that errors
//  after a JS engine turn
export function asyncError<T>(errorObject: any) {
  return defer(() => Promise.reject(errorObject));
}

export function asyncSucces<T>(data: any) {
  return defer(() => Promise.resolve(data));
}
//Avec Jasmine, la fonction describe décrit un groupe de tests.
describe('PoiService', () => {
  let httpClientSpy: { get: jasmine.Spy };
  let service: PoiService;

  beforeEach(() => {
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);
    service = new PoiService(httpClientSpy as any);
  });

  it('should throw an error when service is not available', () => {
    const errorResponse = new HttpErrorResponse({
      error: '500 error',
      status: 500,
      statusText: 'Not available'
    });

    httpClientSpy.get.and.returnValue(asyncError(errorResponse));


    service.loadPointInteretByCategorieAndPosition("Sports", 48.9504898, 2.1638332).subscribe(
      data => fail('Should have failed with 500 error'),
      (error: any) => {
        expect(error).toEqual('(Erreur Serveur) Echec de la récupération des points d\'interet');
      });
  });

  it('should throw an error when request timeout', () => {
    const errorResponse = new HttpErrorResponse({
      error: new ErrorEvent("", {message: "Request timeout"}),
      status: 408,
      statusText: 'Request timeout'
    });

    httpClientSpy.get.and.returnValue(asyncError(errorResponse));


    service.loadPointInteretByCategorieAndPosition("Sports", 48.9504898, 2.1638332).subscribe(
      data => fail('Should have failed with 404 error'),
      (error: any) => {
        expect(error).toEqual(`Error: Request timeout`);
      });
  });


  it('should return a list of POI', () => {
    const testData = [new PointInteret(), new PointInteret()];

    httpClientSpy.get.and.returnValue(asyncSucces(testData));
    // le service appelle le serveur avec une requete httpclient, la reponse du serveur soit 404, 500 ou 200
    // ça retourne une promesse avec 2 fonctions (en cas de succes et en cas d'erreur)
    service.loadPointInteretByCategorieAndPosition("Sports", 48.9504898, 2.1638332).subscribe(
      data => expect(data).toEqual(testData),
      (error: any) => {
        fail("Should have failed with 500 error")
      });
  });
});
