import { registerOTel } from '@vercel/otel';

export function register() {
  // Only run in production on Vercel
  if (process.env.NODE_ENV === 'production' && process.env.NEXT_PUBLIC_OTEL_ENABLED === 'true') {
    try {
      registerOTel('portfolio');
      console.log('OpenTelemetry initialized in the browser');
    } catch (error) {
      console.error('Failed to initialize OpenTelemetry in the browser:', error);
    }
  }
}
