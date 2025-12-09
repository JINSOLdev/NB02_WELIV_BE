import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import {
  SignupUserRequestDto,
  SignupUserResponseDto,
} from './dto/signup-user.dto';

@Controller('api/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  @HttpCode(HttpStatus.CREATED)
  async signup(
    @Body() dto: SignupUserRequestDto,
  ): Promise<SignupUserResponseDto> {
    return this.authService.signup(dto);
  }
}
