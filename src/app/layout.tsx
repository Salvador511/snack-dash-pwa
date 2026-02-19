'use client'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import ThemeRegistry from '~/app/UI/Theme'
import Navbar from '~/app/UI/Navbar'

const metadata = {
  title: 'Snack Dash',
  description: 'Snack Dash',
}

const queryClient = new QueryClient()

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
        <meta name="application-name" content="Snack Dash" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="theme-color" content="#303030" />
        <link rel="manifest" href="/manifest.json" />
        <link rel="icon" type="image/svg+xml" href="/snack-dash-logo.svg" />
        <link rel="apple-touch-icon" href="/snack-dash-logo.svg" />
      </head>
      <ThemeRegistry>
        <QueryClientProvider client={queryClient}>
          <body>
            <Navbar />
            {children}
          </body>
        </QueryClientProvider>
      </ThemeRegistry>
    </html>
  )
}
