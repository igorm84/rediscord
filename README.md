# Rediscord - Next.js and Tailwind CSS
![Rediscord_banner](https://github.com/igorm84/rediscord/assets/16727448/ec5f205f-ec31-4e6b-9126-15df08eab960)

Rediscord is a study of Discord UI built in NextJS and TailwindCSS using some [shadcn](https://ui.shadcn.com/) concepts and components showing how powerful are these libs and how they can replicate a specific design and complex UI.

[Preview](https://rediscord-gamma.vercel.app/)

> This project is being developed and isn't completed yet.
> Currently only frontend and some mock data.
> Feel free to request or contribute.
## Features
> I'll be working in features soon, feel free to sugest something
## Running locally

Requires Node.js 20.9 or later.

1. Clone the repository

```bash
git clone https://github.com/igorm84/rediscord
```

2. Install dependencies

```bash
npm ci
```

3. Start development server

```bash
npm run dev
```

4. Experiment with it :)

## Validation

```bash
npm run lint
npm run typecheck
npm run build
npm test
```

The smoke tests start the production build automatically and check redirects,
public pages, all 36 static channel URLs, 404s, assets, and image optimization.
To check an already running deployment, set `SMOKE_BASE_URL`:

```bash
SMOKE_BASE_URL=https://rediscord-gamma.vercel.app npm test
```

Tailwind stays on version 3 to preserve the existing design. The
`postcss-selector-parser` override uses the patched parser with Tailwind's
existing PostCSS pipeline.
## Youtube
Josh made an amazing video pointing it out: https://www.youtube.com/watch?v=RmucrDgc_Yw&t=27s

[![maxresdefault](https://github.com/igorm84/rediscord/assets/16727448/c350e48b-45e2-4082-b61a-791706df8cc1)](https://www.youtube.com/watch?v=RmucrDgc_Yw&t=27s)

## License
This is a study project based on [Discord](discord.com) UI so they own the design and it needs to be respected. ([see more](discord.com/terms)) - From my part you can freely see and copy the implementation.
