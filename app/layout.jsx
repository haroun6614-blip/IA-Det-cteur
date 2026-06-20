import './globals.css'

export const metadata = {
  title: 'SciVerify - Evaluation academique',
  description: 'Application d\'analyse de documents academiques',
}

export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <body>{children}</body>
    </html>
  )
}
