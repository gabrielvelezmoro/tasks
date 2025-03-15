import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HealthModule } from './health/health.module';
import { UserModule } from './user/user.module';
// import { AuthController } from './auth/auth.controller';
// import { AuthService } from './auth/auth.service';
// import { TokenService } from './token/token.service';
// import { UserService } from './user/user.service';
// import { UserController } from './user/user.controller';
import { AuthModule } from './auth/auth.module';
import { TokenModule } from './token/token.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Token } from './token/models/token.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres', // ou 'postgres', dependendo do banco de dados
      host: 'localhost',
      port: 5432, // ou outra porta do seu banco
      username: 'gabriel',
      password: '123456',
      database: 'tasks',
      entities: [Token], // Certifique-se de incluir sua entidade aqui
      synchronize: true, // Somente em ambiente de desenvolvimento
    }),
    HealthModule,
    UserModule,
    AuthModule,
    TokenModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
