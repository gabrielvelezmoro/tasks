import { Module, forwardRef } from '@nestjs/common';
import { TokenController } from './token.controller';
import { TokenService } from './token.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import { Token } from './models/token.entity';
import { AuthModule } from 'src/auth/auth.module';
import { UserService } from 'src/user/user.service';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Token]),
    forwardRef(() => AuthModule),
    forwardRef(() => UserModule),
  ],
  providers: [TokenService, JwtService, UserService],
  controllers: [TokenController],
  exports: [TokenService, TypeOrmModule],
})
export class TokenModule {}
