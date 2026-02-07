# Portfólio (Next.js App Router) — versão estruturada

Este projeto é uma adaptação para uma estrutura **Next.js (App Router)** mais leve, modular e fácil de manter.

## Estrutura

- `app/`
  - `layout.tsx` (providers globais, metadados, fontes)
  - `page.tsx` (home)
  - `globals.css` (tailwind + design system)
  - `providers.tsx` (React Query, Tooltip, Toasters, ThemeProvider)
- `components/`
  - `pages/` (composição de páginas)
  - `layout/` (Header/Footer)
  - `sections/` (Hero, Skills, Projects, About, Contact)
  - `common/` (LoadingScreen, ScrollToTop, etc.)
  - `ui/` (shadcn/radix)
- `hooks/`, `lib/`, `public/`

## Como rodar

### 1) Instalar dependências
```bash
npm install
```

### 2) Ambiente de desenvolvimento
```bash
npm run dev
```

Acesse: `http://localhost:3000`

### 3) Build / produção
```bash
npm run build
npm run start
```

## Observações

- O tema (dark/light) é controlado por `next-themes` e integrado no `Header`.
- O projeto foi mantido o mais fiel possível ao original, mas agora com **App Router** e **componentização** mais organizada.
