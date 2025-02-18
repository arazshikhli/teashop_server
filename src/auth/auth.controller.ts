import { Body, Controller, HttpCode, Post, Res, UsePipes, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dto/auth.dto';
import { Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @HttpCode(200)
  @UsePipes(new ValidationPipe())
  @Post('login')
  async login(@Body()dto:AuthDto,@Res({passthrough:true}) res:Response){
    const {refreshToken,...response} =await this.authService.login(dto)
    this.authService.addRefreshTokenToResponse(res,refreshToken)
  }

  @HttpCode(200)
  @UsePipes(new ValidationPipe())
  @Post('register')
  async register(@Body()dto:AuthDto){
    return this.authService.register(dto)
  }

}
