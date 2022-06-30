import {forwardRef, Module} from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import {UserModule} from "../user/user.module";
import {JwtModule} from "@nestjs/jwt";

@Module({
  controllers: [AuthController],
  providers: [AuthService],
  imports: [
      UserModule,//forwardRef(() => UserModule), // forwardRef() need to use when !!!import and export!!! _rings_ appear
      JwtModule.register({
        secret: process.env.PRIVATE_KEY || "project2022",
        signOptions: {
          expiresIn: process.env.JWT_EXPIRATION_TIME || '1h'
        }
      })
  ],
    exports: [
        AuthService,
        JwtModule
    ]
})
export class AuthModule {}
