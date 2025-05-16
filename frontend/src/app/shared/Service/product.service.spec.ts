// frontend/src/app/shared/Service/product.service.spec.ts

import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ProductService } from './product.service';
import { LoggerService }  from './logger.service';
import { Product }        from '../Model/Product';

describe('ProductService', () => {
  let service: ProductService;
  let httpMock: HttpTestingController;
  let loggerSpy: jasmine.SpyObj<LoggerService>;

  beforeEach(() => {
    const spy = jasmine.createSpyObj('LoggerService', ['info', 'debug', 'error']);

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        ProductService,
        { provide: LoggerService, useValue: spy }
      ]
    });

    service   = TestBed.inject(ProductService);
    httpMock  = TestBed.inject(HttpTestingController);
    loggerSpy = TestBed.inject(LoggerService) as jasmine.SpyObj<LoggerService>;
  });

  afterEach(() => {
    // Vérifie qu’aucune requête HTTP n’est restée ouverte
    httpMock.verify();
  });

  it('should retrieve all products and log appropriately', () => {
    const mockProducts: Product[] = [
      {
        idProduit: 1,
        codeProduit: 'C1',
        libelleProduit: 'Produit A',
        prix: 100,
        dateCreation: new Date().toISOString(),
        dateDerniereModification: new Date().toISOString()
      },
      {
        idProduit: 2,
        codeProduit: 'C2',
        libelleProduit: 'Produit B',
        prix: 200,
        dateCreation: new Date().toISOString(),
        dateDerniereModification: new Date().toISOString()
      }
    ];

    service.getAllProducts().subscribe(products => {
      expect(products.length).toBe(2);
      expect(products).toEqual(mockProducts);

      // Correspond à ce que le service appelle réellement
      expect(loggerSpy.info).toHaveBeenCalledWith('API: retrieveAllProduits');
      expect(loggerSpy.debug).toHaveBeenCalledWith('Produits reçus:', mockProducts);
    });

    const req = httpMock.expectOne(
      `${service['API_URL']}/retrieve-all-produits`
    );
    expect(req.request.method).toBe('GET');
    req.flush(mockProducts);
  });
});
