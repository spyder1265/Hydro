import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { UsersController } from './users/users.controller';
import { SessionModule } from './session/session.module';

@Module({
  imports: [AuthModule, UsersModule, SessionModule],
  controllers: [AppController, UsersController],
  providers: [AppService],
})
export class AppModule {}
