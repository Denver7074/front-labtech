import { Injectable } from '@angular/core';

import { jwtDecode } from 'jwt-decode';
import {JwtPayload} from '../data/response.interface';


@Injectable({
  providedIn: 'root',
})
export class JwtUtils {

  static decodeToken(token: string): JwtPayload | null {
    try {
      return jwtDecode<JwtPayload>(token);
    } catch (error) {
      console.error('Error decoding JWT:', error);
      return null;
    }
  }

  static getUserId(token: string): string | null {
    const payload = this.decodeToken(token);
    return payload?.userId || null;
  }
}
