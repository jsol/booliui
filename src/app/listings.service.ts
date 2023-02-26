import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';


import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

export interface Listing {
  url: string;
  id: string;
  address: string;
  area: string;
  rent: number;
  price: number;
  floor: number;
  rating: number;
}

interface Observer {
  (): void;
}

@Injectable({
  providedIn: 'root'
})

export class ListingsService {

  constructor(private http: HttpClient) {
    this.auth = window.location.hash.substring(1)
    this.path = "/api/listing"

    this.data = []
    this.observers = []
    if (this.auth) {
      localStorage.setItem('authtoken', this.auth)
    }

    this.auth = localStorage.getItem('authtoken') || ''
    console.log('calling, auth', this.auth)
  }


  auth: string
  path: string

  data: Listing[]
  observers: Observer[]

  public addObserver(cb: Observer) {
    this.observers.push(cb)
  }

  public getListings(): any {

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'x-auth': this.auth
      })
    };

    return this.http.get(this.path + "/rated", httpOptions).subscribe((listings: any) => {
      this.data.length = 0
      listings.forEach((l: any) => {
        this.data.push({
          url: l.url,
          id: l.booliId,
          address: l.location.address.streetAddress,
          area: l.location.namedAreas.join("/"),
          rent: l.rent,
          price: l.listPrice,
          floor: l.floor,
          rating: l.score > 0 ? l.score : l.rating
        })
      });
      console.log(this.data)
      this.observers.forEach((cb: Observer) => {
        cb()
      })
    });
  }

  public getListing(id: string): any {

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'x-auth': this.auth
      })
    };

    return this.http.get(this.path + "/" + id, httpOptions);
  }

  public rateListing(id: string, newRating: number) {

    console.log("Rate listing")
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'x-auth': this.auth
      })
    };

    return this.http.get(`${this.path}/${id}?vote=${newRating}`, httpOptions);
  }


  public scoreListing(id: string, newRating: number) {

    console.log("Score listing")
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'x-auth': this.auth
      })
    };

    let query: string = `score=${newRating}`

    if (newRating < 0) {
      query = `vote=${newRating}`
    }

    return this.http.get(`${this.path}/${id}?${query}`, httpOptions).subscribe((l: any) => {
      const index = this.data.findIndex((e: any) => e.id == id)
      if (newRating < 0) {
        if (index > 0) {
          this.data.splice(index, 1);
        }
      } else if (index < 0) {
        this.data.push({
          url: l.url,
          id: l.booliId,
          address: l.location.address.streetAddress,
          area: l.location.namedAreas.join("/"),
          rent: l.rent,
          price: l.listPrice,
          floor: l.floor,
          rating: l.score > 0 ? l.score : l.rating
        })
      } else {
        this.data[index] = {
          url: l.url,
          id: l.booliId,
          address: l.location.address.streetAddress,
          area: l.location.namedAreas.join("/"),
          rent: l.rent,
          price: l.listPrice,
          floor: l.floor,
          rating: l.score > 0 ? l.score : l.rating
        }
      }
      this.observers.forEach((cb: Observer) => {
        cb()
      })
    });
  }


}
