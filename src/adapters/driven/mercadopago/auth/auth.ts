import axios from 'axios';
import { BASE_URL } from '../utils';
import { GenerateTokenResponse } from './auth.types';
import { Injectable } from '@nestjs/common';
import { IMercadoPagoAuth } from '@ports/auth.mercadopago';

@Injectable()
export class MercadoPagoAuth implements IMercadoPagoAuth {
  constructor() {}

  async generateToken(): Promise<string | undefined> {
    try {
      const { data } = await axios.post<GenerateTokenResponse>(
        `${BASE_URL}/oauth/token`,
        {
          grant_type: 'client_credentials',
          client_id: process.env.MP_CLIENT_ID,
          client_secret: process.env.MP_CLIENT_SECRET,
        },
      );

      if (!data || !data.access_token) {
        return undefined;
      }

      return data.access_token;
    } catch (error) {
      console.error('Error on auth mercadopago:', error);
      return undefined;
    }
  }
}
