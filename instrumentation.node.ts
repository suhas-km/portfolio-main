// This file is for server-side OpenTelemetry instrumentation only
// It will be ignored in the browser

// Only run this code on the server
if (typeof window === 'undefined') {
  // Use dynamic imports for better compatibility
  Promise.all([
    import('@opentelemetry/sdk-node'),
    import('@opentelemetry/auto-instrumentations-node'),
    import('@opentelemetry/exporter-trace-otlp-http')
  ]).then(([
    { NodeSDK },
    { getNodeAutoInstrumentations },
    { OTLPTraceExporter }
  ]) => {
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
        const startSdk = async () => {
          try {
            await sdk.start();
            console.log('OpenTelemetry SDK started');
          } catch (error) {
            console.error('Error starting OpenTelemetry SDK', error);
          }
        };
        startSdk();

        // Gracefully shut down the SDK on process exit
        const shutdown = () => {
          console.log('Shutting down OpenTelemetry...');
          sdk
            .shutdown()
            .then(() => console.log('OpenTelemetry terminated'))
            .catch((error: Error) => console.error('Error terminating OpenTelemetry', error))
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
  }).catch(error => {
    console.error('Failed to load OpenTelemetry dependencies:', error);
  });
}
