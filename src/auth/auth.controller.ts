import { Body, Controller, Post } from '@nestjs/common';

import { Serialize } from 'src/shared/interceptors';
import { AuthService } from './auth.service';
import {
  loginInputDto,
  loginOutputDto,
  SignupWithCredenetialsInputDto,
} from './dto/index';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/signup')
  // @Serialize(otpExpireDto)
  // @ApiCreatedResponse({ description: 'Signup Result', type: otpExpireDto })
  async signup(@Body() body: SignupWithCredenetialsInputDto) {
    return await this.authService.signup(body);
  }

  @Post('/login')
  @Serialize(loginOutputDto)
  async login(@Body() body: loginInputDto) {
    return await this.authService.login(body);
  }
}
