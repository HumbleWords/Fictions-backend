import {
  ArgumentsHost,
  Catch,
  ConflictException,
  ExceptionFilter,
  HttpStatus,
  UnauthorizedException,
} from '@nestjs/common';
import { Response } from 'express';

@Catch(UnauthorizedException)
export class UnauthorizedExceptionFilter implements ExceptionFilter {
  catch(exception: UnauthorizedException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status = HttpStatus.UNAUTHORIZED;

    return response.status(status).json({
      success: false,
      statusCode: status,
      message: 'Unauthorized',
      error: 'Unauthorized',
    });
  }
}

@Catch(ConflictException)
export class ConflictExceptionfilter implements ExceptionFilter {
  catch(exception: ConflictException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status = HttpStatus.CONFLICT;

    return response.status(status).json({
      success: false,
      statusCode: status,
      message: exception.message || 'Конфликт введенных данных',
      error: 'Conflict',
    });
  }
}
