import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/user/entities/user.entity';


@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService, private jwtService:JwtService) {}

  async hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, 12);
  }

  async register(requestPayload) {
    try {
      const { password } = requestPayload;
      const hash = await this.hashPassword(password);
      const createdUser = await this.userService.create({
        ...requestPayload,
        password: hash,
      });
      return createdUser;
    } catch (error) {
      return error;
    }
  }

  async validateUser(loginPayload): Promise<User> {
    const user = await this.userService.findOne(loginPayload.email);
    if (!user) {
      throw new UnauthorizedException() 
    } 
    if (!(await bcrypt.compare(loginPayload.password,user.password))) {
      throw new UnauthorizedException();
    }
return user    
  }

  async login(user: any) {
    const newuser = await this.validateUser(user)
  
    
    return {
      access_token: this.jwtService.sign({
        sub: newuser.id,
        email: newuser.email,
        
      }),
    };
  }
}
