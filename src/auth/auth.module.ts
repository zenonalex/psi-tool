import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './shared/auth/auth.service';

@Module({
  controllers: [AuthController],
  providers: [AuthService]
})
export class AuthModule {}
