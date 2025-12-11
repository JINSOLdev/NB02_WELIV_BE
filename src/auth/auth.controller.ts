import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import {
  SignupUserRequestDto,
  SignupUserResponseDto,
} from './dto/signup-user.dto';
import {
  SignupAdminRequestDto,
  SignupAdminResponseDto,
} from './dto/signup-admin.dto';

@Controller('api/auth/signup')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('user')
  @HttpCode(HttpStatus.CREATED)
  async signup(
    @Body() dto: SignupUserRequestDto,
  ): Promise<SignupUserResponseDto> {
    return this.authService.signupUser(dto);
  }

  @Post('admin')
  @HttpCode(HttpStatus.CREATED)
  async signupAdmin(
    @Body() dto: SignupAdminRequestDto,
  ): Promise<SignupAdminResponseDto> {
    return this.authService.signupAdmin(dto);
  }
}
