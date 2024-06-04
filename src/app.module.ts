import { Module, ValidationPipe } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_FILTER, APP_GUARD, APP_INTERCEPTOR, APP_PIPE } from '@nestjs/core';
import { AuthModule } from './auth/auth.module';
import { CommentsModule } from './comments/comments.module';
import { JwtAuthGuard } from './common/jwt-auth.guard';
import { RolesGuard } from './common/roles.guard';
import { FandomsModule } from './fandoms/fandoms.module';
import { TagsModule } from './tags/tags.module';
import { UsersModule } from './users/users.module';
import { WorkPartsModule } from './workparts/workparts.module';
import { WorksModule } from './works/works.module';
import { TransformInterceptor } from './common/transform.interceptor';
import { ErrorsInterceptor } from './common/errors.interceptor';
import {
  ConflictExceptionfilter,
  UnauthorizedExceptionFilter,
} from './common/exception.filter';

@Module({
  imports: [
    AuthModule,
    CommentsModule,
    FandomsModule,
    TagsModule,
    UsersModule,
    WorkPartsModule,
    WorksModule,
    ConfigModule.forRoot({ isGlobal: true }),
  ],
  providers: [
    { provide: APP_INTERCEPTOR, useClass: ErrorsInterceptor },
    { provide: APP_INTERCEPTOR, useClass: TransformInterceptor },
    { provide: APP_GUARD, useClass: JwtAuthGuard },
    { provide: APP_GUARD, useClass: RolesGuard },
    { provide: APP_PIPE, useValue: new ValidationPipe({ transform: true }) },
    { provide: APP_FILTER, useClass: UnauthorizedExceptionFilter },
    { provide: APP_FILTER, useClass: ConflictExceptionfilter },
  ],
})
export class AppModule {}
