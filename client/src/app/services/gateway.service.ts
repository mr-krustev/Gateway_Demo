import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Gateway } from '../models/gateway';

@Injectable({
  providedIn: 'root'
})
export class GatewayService {
  private GATEWAY_BASE_URL = '//localhost:3000/api';
  private headers: HttpHeaders;

  constructor(private httpClient: HttpClient) {
    this.headers = new HttpHeaders();
    this.headers.append('Content-Type', 'application/json')
  }

  getAllGateways(): Observable<Gateway[]> {
    return this.httpClient.get<Gateway[]>(this.GATEWAY_BASE_URL + '/gateways', { headers: this.headers });
  }

  getGatewayById(id: string): Observable<Gateway> {
    return this.httpClient.get<Gateway>(this.GATEWAY_BASE_URL + '/gateways/' + id, { headers: this.headers });
  }
}
