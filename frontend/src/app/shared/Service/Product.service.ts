// src/app/shared/Service/Product.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';

import { LoggerService } from './logger.service';     // <-- ici
import { Product } from '../Model/Product';           // <-- et ici

@Injectable({ providedIn: 'root' })
export class ProductService {
  private readonly API_URL = 'http://localhost:8089/SpringMVC/produit';

  constructor(
    private http: HttpClient,
    private logger: LoggerService
  ) {}

  getAllProducts(): Observable<Product[]> {
    this.logger.info('API: retrieveAllProduits');
    return this.http.get<Product[]>(`${this.API_URL}/retrieve-all-produits`).pipe(
      tap(data => this.logger.debug('Produits reçus:', data)),
      catchError(err => {
        this.logger.error('Erreur retrieveAllProduits:', err);
        return throwError(err);
      })
    );
  }

  addProduct(product: Product): Observable<Product> {
    this.logger.info('API: addProduit', product);
    return this.http.post<Product>(`${this.API_URL}/add-produit`, product).pipe(
      tap(p => this.logger.debug('Produit ajouté:', p)),
      catchError(err => {
        this.logger.error('Erreur addProduit:', err);
        return throwError(err);
      })
    );
  }

  editProduct(product: Product): Observable<Product> {
    this.logger.info('API: modifyProduit', product);
    return this.http.put<Product>(`${this.API_URL}/modify-produit`, product).pipe(
      tap(p => this.logger.debug('Produit mis à jour:', p)),
      catchError(err => {
        this.logger.error('Erreur modifyProduit:', err);
        return throwError(err);
      })
    );
  }

  deleteProduct(idProduct: number): Observable<void> {
    this.logger.info('API: removeProduit', idProduct);
    return this.http.delete<void>(`${this.API_URL}/remove-produit/${idProduct}`).pipe(
      tap(() => this.logger.debug('Produit supprimé:', idProduct)),
      catchError(err => {
        this.logger.error('Erreur removeProduit:', err);
        return throwError(err);
      })
    );
  }
}

