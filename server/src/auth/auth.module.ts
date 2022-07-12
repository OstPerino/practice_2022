import {forwardRef, Module} from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import {UserModule} from "../user/user.module";
import {JwtModule} from "@nestjs/jwt";
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  controllers: [AuthController],
  providers: [AuthService],
  imports: [
      UserModule,//forwardRef(() => UserModule), // forwardRef() need to use when !!!import and export!!! _rings_ appear
      JwtModule.registerAsync({
        imports: [ConfigModule],
        inject: [ConfigService],
        useFactory: async (configService: ConfigService) => ({
          secret: configService.get('PRIVATE_KEY') || "project2022",
          signOptions: {
            expiresIn: configService.get('JWT_EXPIRATION_TIME') || '1h'
          },
        }),
      })
  ],
    exports: [ AuthService, JwtModule ]
})
export class AuthModule {}
