/* eslint-disable prettier/prettier */
import { Body, Controller, Post } from '@nestjs/common';
import { User } from '@prisma/client';
import { AuthService } from './auth.service';
import { AuthDto } from './dto/userCredentials.dto';

@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService){}

  @Post("signup")
  signUp(@Body() authCredentials: AuthDto): Promise<User> {
    return this.authService.signUp(authCredentials)
  }

  @Post("login")
  login(@Body() authCredentials: AuthDto) {
    return this.authService.login(authCredentials)
  }
}
