import type { Metadata } from 'next';
import { Inter, JetBrains_Mono, Space_Grotesk } from 'next/font/google';
import './globals.css';
import { Providers } from './providers';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const jetbrainsMono = JetBrains_Mono({ subsets: ['latin'], variable: '--font-mono' });
const spaceGrotesk = Space_Grotesk({ subsets: ['latin'], variable: '--font-display' });

export const metadata: Metadata = {
  title: 'César Lima | Tech Lead • Dados • Integração de Sistemas • Automação',
  description:
    'Portfólio profissional de César Henrique Sousa Lima — Supervisor de Desenvolvimento de Software e Cientista de Dados. Pipelines, APIs, integrações, automações e machine learning com Python, Node.js/TypeScript e SQL.',
  keywords: [
    'Tech Lead',
    'Integração de Sistemas',
    'Inteligência de Mercado',
    'Power BI',
    'Node.js',
    'TypeScript',
    'SQL',
    'Python',
    'PySpark',
    'Machine Learning',
    'Dashboards',
    'Automação',
    'PostgreSQL',
    'Angular',
    'Data Analytics',
    'César Lima',
  ],
  authors: [{ name: 'César Henrique Sousa Lima' }],
  openGraph: {
    type: 'website',
    locale: 'pt_BR',
    title: 'César Lima | Tech Lead • Dados • Integração de Sistemas • Automação',
    description:
      'Portfólio profissional de César Henrique Sousa Lima — Supervisor de Desenvolvimento de Software e Cientista de Dados. Pipelines, APIs, integrações, automações e machine learning com Python, Node.js/TypeScript e SQL.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'César Lima | Tech Lead • Dados • Integração de Sistemas • Automação',
    description: 'Portfólio profissional de César Henrique Sousa Lima — Supervisor de Desenvolvimento de Software e Cientista de Dados.',
  },
  icons: {
    icon: '/favicon.svg',
  },
};

export const viewport = {
  themeColor: '#0a0b14',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="pt-BR"
      suppressHydrationWarning
      className={`${inter.variable} ${jetbrainsMono.variable} ${spaceGrotesk.variable}`}
    >
      <body className="font-sans">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}

