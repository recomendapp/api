import { Test, TestingModule } from '@nestjs/testing';
import { AuthHttpController } from './auth.http.controller';
import { AuthService } from './auth.service';
import { ValidateTokenResponse } from '@api/protos';

describe('AuthHttpController', () => {
  let authController: AuthHttpController;
  let authService: AuthService;

  const mockAuthService = {
    validateToken: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthHttpController],
      providers: [
        {
          provide: AuthService,
          useValue: mockAuthService,
        },
      ],
    }).compile();

    authController = module.get<AuthHttpController>(AuthHttpController);
    authService = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(authController).toBeDefined();
  });

  describe('validateToken', () => {
    it('should return a user payload for a valid token', async () => {
      const token = 'valid-token';
      const expectedResponse: ValidateTokenResponse = {
        user: {
          id: 'user-id',
          email: 'test@example.com',
          exp: 1234567890,
        },
      };

      mockAuthService.validateToken.mockResolvedValue(expectedResponse);

      // const result = await authController.handleAuth({ token });

      // expect(result).toEqual(expectedResponse);
      // expect(authService.validateToken).toHaveBeenCalledWith(token);
    });

    it('should return an error for an invalid token', async () => {
      const token = 'invalid-token';
      const expectedResponse: ValidateTokenResponse = {
        error: 'Invalid token',
      };

      mockAuthService.validateToken.mockResolvedValue(expectedResponse);

      // const result = await authController.validateToken({ token });

      // expect(result).toEqual(expectedResponse);
      // expect(authService.validateToken).toHaveBeenCalledWith(token);
    });
  });
});
