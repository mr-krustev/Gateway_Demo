import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Gateway } from '../models/gateway';
import { Peripheral } from '../models/peripheral';

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
    return this.httpClient.get<Gateway[]>(`${this.GATEWAY_BASE_URL}/gateways`, { headers: this.headers });
  }

  getGatewayById(id: string): Observable<Gateway> {
    return this.httpClient.get<Gateway>(`${this.GATEWAY_BASE_URL}/gateways/${id}`, { headers: this.headers });
  }

  addGateway(gateway: Gateway): Observable<Gateway> {
    return this.httpClient.post<Gateway>(`${this.GATEWAY_BASE_URL}/gateways/`, gateway, { headers: this.headers });
  }

  addPeripheralDevice(gatewayID: string, peripheral: Peripheral): Observable<Peripheral> {
    return this.httpClient.post<Peripheral>(`${this.GATEWAY_BASE_URL}/gateways/${gatewayID}/peripherals`, peripheral, { headers: this.headers });
  }

  removePeripheralDeviceByID(gatewayID: string, peripheralDeviceID: string): Observable<any> {
    return this.httpClient.delete(`${this.GATEWAY_BASE_URL}/gateways/${gatewayID}/peripherals/${peripheralDeviceID}`, { headers: this.headers });
  }
}
