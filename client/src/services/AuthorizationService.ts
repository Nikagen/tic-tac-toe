import $api from './../http';

import { AxiosResponse } from 'axios';
import { Tokens } from './../models/response/Tokens';

export default class AuthService {
  static async signin(login: string, password: string): Promise<AxiosResponse<Tokens>> {
    return $api.post<Tokens>('/auth', { login, password });
  }

  static async signup(login: string, password: string): Promise<AxiosResponse<Tokens>> {
    return $api.post<Tokens>('/users', { login, password });
  }
}