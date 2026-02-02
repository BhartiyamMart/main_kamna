import { ApiError, ValidationError } from '@/lib/errors/api-errors';

import { Prisma } from '@prisma/client';
import { ApiResponse } from '../types/api-types';

export function handleError(error: unknown, operation: string): ApiResponse {
  console.error(`[${operation}] Error:`, error);

  // Handle custom API errors
  if (error instanceof ValidationError) {
    return {
      status: error.status,
      message: error.message,
      fieldErrors: error.fieldErrors,
    };
  }

  if (error instanceof ApiError) {
    return {
      status: error.status,
      message: error.message,
      error: error.code,
    };
  }

  // Handle Prisma errors
  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    return handlePrismaError(error);
  }

  if (error instanceof Prisma.PrismaClientValidationError) {
    return {
      status: 400,
      message: 'Invalid data provided',
      error: 'VALIDATION_ERROR',
    };
  }

  // Handle unexpected errors
  return {
    status: 500,
    message:
      process.env.NODE_ENV === 'production'
        ? 'An unexpected error occurred'
        : error instanceof Error
          ? error.message
          : 'Unknown error',
    error: 'INTERNAL_SERVER_ERROR',
  };
}

function handlePrismaError(error: Prisma.PrismaClientKnownRequestError): ApiResponse {
  switch (error.code) {
    case 'P2002':
      return {
        status: 409,
        message: 'A record with this information already exists',
        error: 'DUPLICATE_ENTRY',
      };
    case 'P2025':
      return {
        status: 404,
        message: 'Record not found',
        error: 'NOT_FOUND',
      };
    case 'P2003':
      return {
        status: 400,
        message: 'Foreign key constraint failed',
        error: 'CONSTRAINT_VIOLATION',
      };
    case 'P2014':
      return {
        status: 400,
        message: 'Invalid relation',
        error: 'INVALID_RELATION',
      };
    case 'P2015':
      return {
        status: 404,
        message: 'Related record not found',
        error: 'RELATED_RECORD_NOT_FOUND',
      };
    case 'P2021':
      return {
        status: 500,
        message: 'Database table does not exist',
        error: 'TABLE_NOT_FOUND',
      };
    case 'P2022':
      return {
        status: 500,
        message: 'Database column does not exist',
        error: 'COLUMN_NOT_FOUND',
      };
    default:
      return {
        status: 500,
        message: 'Database operation failed',
        error: 'DATABASE_ERROR',
      };
  }
}
