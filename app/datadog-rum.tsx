// app/datadog-rum.tsx
'use client'

import { useEffect } from 'react';

export function DatadogRUM() {
  useEffect(() => {
    if (typeof window !== 'undefined' && process.env.NEXT_PUBLIC_DATADOG_RUM_ENABLED === 'true') {
      // Initialize Datadog RUM
      import('@datadog/browser-rum').then(({ datadogRum }) => {
        datadogRum.init({
          applicationId: process.env.NEXT_PUBLIC_DATADOG_APPLICATION_ID || '',
          clientToken: process.env.NEXT_PUBLIC_DATADOG_CLIENT_TOKEN || '',
          site: 'datadoghq.com', // or 'datadoghq.eu' if you're using EU
          service: 'micro-link',
          env: process.env.NEXT_PUBLIC_VERCEL_ENV || 'development',
          version: '1.0.0',
          sessionSampleRate: 100,
          sessionReplaySampleRate: 20,
          trackUserInteractions: true,
          trackResources: true,
          trackLongTasks: true,
          defaultPrivacyLevel: 'mask-user-input'
        });
        
        console.log('Datadog RUM initialized successfully');
      }).catch(error => {
        console.error('Failed to initialize Datadog RUM:', error);
      });
    }
  }, []);
  
  return null;
}
