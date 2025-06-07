import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        {/* OpenTelemetry script will be injected here in production */}
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
