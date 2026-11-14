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

`npm test` runs the state regression tests with [Bun](https://bun.sh/), so Bun
must be installed. They need no additional test dependencies.

Tailwind stays on version 3 to preserve the existing design. The
`postcss-selector-parser` override uses the patched parser with Tailwind's
existing PostCSS pipeline.
## Youtube
Josh made an amazing video pointing it out: https://www.youtube.com/watch?v=RmucrDgc_Yw&t=27s

[![maxresdefault](https://github.com/igorm84/rediscord/assets/16727448/c350e48b-45e2-4082-b61a-791706df8cc1)](https://www.youtube.com/watch?v=RmucrDgc_Yw&t=27s)

## License
The code in this repository is available under the [MIT License](LICENSE).

This is a study project based on the [Discord](https://discord.com) UI, so Discord owns the design and it needs to be respected ([see more](https://discord.com/terms)). The MIT License covers this implementation only, not Discord's design, name or brand assets.
