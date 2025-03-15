import { Module, forwardRef } from '@nestjs/common';
import { AuthService } from './auth.service';
import { TokenService } from 'src/token/token.service';
import { AuthController } from './auth.controller';
import { TokenModule } from 'src/token/token.module';
import { UserService } from 'src/user/user.service';
import { JwtModule } from '@nestjs/jwt';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [
    JwtModule.register({}),
    forwardRef(() => TokenModule),
    forwardRef(() => UserModule),
  ],
  controllers: [AuthController],
  providers: [AuthService, TokenService, UserService],
})
export class AuthModule {}
