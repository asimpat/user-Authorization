import { Body, Controller, Post } from '@nestjs/common';
import { User } from 'src/user/entities/user.entity';
import { AuthService } from './auth.service';
import { LoginDto } from './dtos/loginDto';
import { RegisterDto } from './dtos/register.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
 
  @Post('register')
  async register(@Body() requestPayload: RegisterDto): Promise<User> {
    return await this.authService.register(requestPayload);
  }

  
  @Post('login')
 async login(@Body() loginPayload: LoginDto):Promise<User|Object>{
    return await this.authService.login(loginPayload);
  }
}
