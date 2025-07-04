// app/layout.tsx
import type React from "react"
import type { Metadata } from "next"
import { Inter } from 'next/font/google'
import Script from "next/script" // Correctly imported
import "./globals.css"

import { Toaster } from "@/components/ui/toaster"
import { ThemeProvider } from "@/components/theme-provider"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Micro Link - URL Shortener",
  description: "Shorten, share, and track your links in one place",
  generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          {children}
          <Toaster />
        </ThemeProvider>

        {/* Datadog RUM Script - Corrected */}
        <Script id="datadog-rum" strategy="beforeInteractive"> {/* Changed strategy to 'beforeInteractive' to load earlier */}
          {`
            (function(h,o,u,n,d) {
              h=h[d]=h[d]||{q:[],onReady:function(c){h.q.push(c)}};
              d=o.createElement(u);d.async=1;d.src=n;
              n=o.getElementsByTagName(u)[0];n.parentNode.insertBefore(d,n);
            })(window,document,'script','https://www.datadoghq-browser-agent.com/datadog-rum-latest.js','DD_RUM'); // <-- CORRECTED URL: -latest.js

            // IMPORTANT: Use DD_RUM.init and DD_RUM.setUser as per the CDN snippet
            DD_RUM.onReady(function() {
              DD_RUM.init({ // <-- CORRECTED: Use DD_RUM.init, not datadogRum.init
                applicationId: '${process.env.NEXT_PUBLIC_DATADOG_APPLICATION_ID}',
                clientToken: '${process.env.NEXT_PUBLIC_DATADOG_CLIENT_TOKEN}',
                site: 'us5.datadoghq.com', // <-- CORRECTED: Based on your Datadog setup screenshot
                service: 'micro-link',
                env: '${process.env.NEXT_PUBLIC_DATADOG_ENV || 'production'}', // <-- Using env var for consistency
                version: '1.0.0', // Consider using process.env.NEXT_PUBLIC_APP_VERSION
                sampleRate: 100,
                sessionReplaySampleRate: 20, // <-- ADDED: Based on your Datadog setup
                trackInteractions: true,
                defaultPrivacyLevel: 'mask-user-input'
              });

              // Example of setting user info - make sure to get real user data
              DD_RUM.setUser({
                id: 'your-user-id', // Replace with actual user ID
                name: 'your-user-name', // Replace with actual user name
                email: 'your-user-email@example.com' // Replace with actual user email
              });
            });
          `}
        </Script>
      </body>
    </html>
  )
}