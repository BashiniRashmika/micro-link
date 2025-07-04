// app/layout.tsx
import type React from "react"
import type { Metadata } from "next"
import { Inter } from 'next/font/google'
import Script from "next/script"
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
      <head>
        {/* Datadog RUM CDN Async - Using the exact code from Datadog */}
        <Script id="datadog-rum" strategy="beforeInteractive">
          {`
            (function(h,o,u,n,d) {
              h=h[d]=h[d]||{q:[],onReady:function(c){h.q.push(c)}};
              d=o.createElement(u);d.async=1;d.src=n;
              n=o.getElementsByTagName(u)[0];n.parentNode.insertBefore(d,n);
            })(window,document,'script','https://www.datadoghq-browser-agent.com/us5/v6/datadog-rum.js','DD_RUM');
            
            window.DD_RUM.onReady(function() {
              window.DD_RUM.init({
                clientToken: 'pub03071b05f8a072412f3f0f3ac8ab552c',
                applicationId: '67f4dace-2c15-485d-8524-ccc19cabed49',
                site: 'us5.datadoghq.com',
                service: 'micro-link',
                env: 'production',
                version: '1.0.0',
                sessionSampleRate: 100,
                sessionReplaySampleRate: 20,
                trackUserInteractions: true,
                trackResources: true,
                trackLongTasks: true,
                defaultPrivacyLevel: 'mask-user-input'
              });
              
              console.log('✅ Datadog RUM initialized successfully');
            });
          `}
        </Script>
      </head>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  )
}