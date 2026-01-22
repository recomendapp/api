import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ValidateTokenResponse } from '@app/shared/auth/auth';

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}

  validateToken = async (token: string): Promise<ValidateTokenResponse> => {
    try {
      const payload = await this.jwtService.verifyAsync(token);
      return {
        id: payload.sub,
        email: payload.email,
        exp: payload.exp,
      };
    } catch (e) {
      return {
        id: '',
        email: '',
        exp: 0,
        error: 'Invalid token',
      };
    }
  }
}
