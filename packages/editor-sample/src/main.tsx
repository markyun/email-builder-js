import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
// import * as Sentry from '@sentry/react';
import { CssBaseline, ThemeProvider } from '@mui/material';

import App from './App';
import Preview from './Preview';
import theme from './theme';

console.log('process.env.NODE_ENV :', process.env.NODE_ENV);

// 非生产模式，触发 sentry 上报，production 模式不上报
// if (process.env.NODE_ENV === 'development') {
//   console.log('非生产模式，触发 sentry 上报');
//   Sentry.init({
//     dsn: 'http://c459e0c6cb6c06d855b33a63fe40b1c5@10.45.18.130:9000/2',
//     integrations: [Sentry.browserTracingIntegration(), Sentry.replayIntegration()],
//     // Tracing
//     tracesSampleRate: 1.0, //  Capture 100% of the transactions
//     // Set 'tracePropagationTargets' to control for which URLs distributed tracing should be enabled
//     // tracePropagationTargets: ["localhost", /^https:\/\/yourserver\.io\/api/],
//     // Session Replay
//     replaysSessionSampleRate: 0.1, // This sets the sample rate at 10%. You may want to change it to 100% while in development and then sample at a lower rate in production.
//     replaysOnErrorSampleRate: 1.0, // If you're not already sampling the entire session, change the sample rate to 100% when sampling sessions where errors occur.
//   });
// }

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <Routes>
          <Route path="/email-builder/" element={<App />} />
          <Route path="/email-builder/preview" element={<Preview />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  </React.StrictMode>
);
