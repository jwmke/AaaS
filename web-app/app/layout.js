import './globals.css'

export const metadata = {
  title: 'Acronyms',
  description: 'Acronyms as a Service.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
