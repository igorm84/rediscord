# Rediscord - Next.js and Tailwind CSS
![Rediscord_banner](https://github.com/igorm84/rediscord/assets/16727448/ec5f205f-ec31-4e6b-9126-15df08eab960)

Rediscord is a study of Discord UI built in NextJS and TailwindCSS using some [shadcn](https://ui.shadcn.com/) concepts and components showing how powerful are these libs and how they can replicate a specific design and complex UI.

[Preview](https://rediscord-gamma.vercel.app/)

> This project is being developed and isn't completed yet.
> Currently only frontend and some mock data.
> Feel free to request or contribute.
## Features
All data is client-side mock data, so changes reset on reload.

- Friends page with Online, All, Pending and Blocked tabs, plus name search
- Accept or decline incoming friend requests, and send new ones from the Add
  Friend tab
- Direct message list: open a conversation from a friend, the "Choose friends"
  popover or the Active Now panel, and remove conversations from the list
- Conversation view with the recipient's profile, add or remove friend, and
  local message sending
- Active Now panel with friends' current activities
- Server sidebar with tooltips
- Quick switcher modal (Ctrl+K / Cmd+K)
- User panel: change online status, set a custom status, mute and deafen
- Skeleton loading states while the demo "loads"

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

`npm test` runs the unit tests (state, navigation and custom status helpers) with [Bun](https://bun.sh/), so Bun
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
