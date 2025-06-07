import { NodeSDK } from '@opentelemetry/sdk-node';
import { getNodeAutoInstrumentations } from '@opentelemetry/auto-instrumentations-node';
import { OTLPTraceExporter } from '@opentelemetry/exporter-trace-otlp-http';

export function register() {
  // Only run in production on Vercel
  if (process.env.NODE_ENV === 'production' && process.env.NEXT_PUBLIC_OTEL_ENABLED === 'true') {
    try {
      console.log('Initializing OpenTelemetry...');
      
      const sdk = new NodeSDK({
        traceExporter: new OTLPTraceExporter({
          // Default endpoint is fine for Vercel
        }),
        instrumentations: [
          getNodeAutoInstrumentations({
            // Only enable specific instrumentations that are needed
            '@opentelemetry/instrumentation-http': {
              enabled: true,
            },
            '@opentelemetry/instrumentation-express': {
              enabled: true,
            },
            // Disable other instrumentations to reduce noise
            '@opentelemetry/instrumentation-fs': {
              enabled: false,
            },
          }),
        ],
      });

      // Start the SDK and handle the promise properly
      Promise.resolve()
        .then(() => sdk.start())
        .then(() => console.log('OpenTelemetry SDK started'))
        .catch((error: Error) => console.error('Error starting OpenTelemetry SDK', error));

      // Gracefully shut down the SDK on process exit
      const shutdown = () => {
        console.log('Shutting down OpenTelemetry...');
        sdk
          .shutdown()
          .then(() => console.log('OpenTelemetry terminated'))
          .catch((error) => console.error('Error terminating OpenTelemetry', error))
          .finally(() => process.exit(0));
      };

      process.on('SIGTERM', shutdown);
      process.on('SIGINT', shutdown);
      
    } catch (error) {
      console.error('Failed to initialize OpenTelemetry:', error);
    }
  } else {
    console.log('OpenTelemetry is disabled (NODE_ENV is not production or NEXT_PUBLIC_OTEL_ENABLED is not true)');
  }
}
