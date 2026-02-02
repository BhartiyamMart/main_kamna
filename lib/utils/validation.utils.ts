import { z } from 'zod';
import { ValidationError } from '@/lib/errors/api-errors';

/**
 * Validate data against a Zod schema
 * @throws ValidationError if validation fails
 */
export function validateSchema<T extends z.ZodTypeAny>(schema: T, data: unknown): z.infer<T> {
  const result = schema.safeParse(data);

  if (!result.success) {
    const flatErrors = result.error.flatten().fieldErrors;
    const fieldErrors: Record<string, string[]> = {};

    for (const [key, value] of Object.entries(flatErrors)) {
      if (value && Array.isArray(value) && value.length > 0) {
        fieldErrors[key] = value as string[];
      }
    }

    throw new ValidationError('Validation failed', fieldErrors);
  }

  return result.data;
}

/**
 * Validate data against a partial Zod object schema
 * @throws ValidationError if validation fails
 */
export function validatePartialSchema<T extends z.ZodRawShape>(
  schema: z.ZodObject<T>,
  data: unknown
): Partial<z.infer<z.ZodObject<T>>> {
  const partialSchema = schema.partial();
  const result = partialSchema.safeParse(data);

  if (!result.success) {
    const flatErrors = result.error.flatten().fieldErrors;
    const fieldErrors: Record<string, string[]> = {};

    for (const [key, value] of Object.entries(flatErrors)) {
      if (value && Array.isArray(value) && value.length > 0) {
        fieldErrors[key] = value as string[];
      }
    }

    throw new ValidationError('Validation failed', fieldErrors);
  }

  return result.data as Partial<z.infer<z.ZodObject<T>>>;
}

/**
 * Check if a string is a valid UUID
 */
export function isValidUUID(uuid: string): boolean {
  if (!uuid || typeof uuid !== 'string') return false;
  const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
  return uuidRegex.test(uuid);
}

/**
 * Sanitize string input (remove extra spaces, trim)
 */
export function sanitizeString(input: string): string {
  if (!input || typeof input !== 'string') return '';
  return input.trim().replace(/\s+/g, ' ');
}

/**
 * Validate email format
 */
export function isValidEmail(email: string): boolean {
  if (!email || typeof email !== 'string') return false;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Validate phone number (basic validation)
 */
export function isValidPhone(phone: string): boolean {
  if (!phone || typeof phone !== 'string') return false;
  const phoneRegex = /^[+]?[(]?[0-9]{1,4}[)]?[-\s.]?[(]?[0-9]{1,4}[)]?[-\s.]?[0-9]{1,9}$/;
  return phoneRegex.test(phone);
}

/**
 * Parse and validate numeric input
 */
export function parseNumber(value: unknown, fallback: number = 0): number {
  const parsed = typeof value === 'string' ? parseFloat(value) : Number(value);
  return isNaN(parsed) ? fallback : parsed;
}

/**
 * Parse and validate integer input
 */
export function parseInteger(value: unknown, fallback: number = 0): number {
  const parsed = typeof value === 'string' ? Number.parseInt(value, 10) : Number(value);
  return isNaN(parsed) ? fallback : parsed;
}
