export default function DemoBanner() {
  return (
    <div
      role="note"
      className="fixed inset-x-0 top-0 z-[60] flex h-demo-banner items-center justify-center gap-1 truncate bg-primary px-4 text-xs font-semibold text-white"
    >
      <span className="hidden sm:inline">
        Rediscord is an unofficial Discord UI demo with fictional data. Not
        affiliated with or endorsed by Discord Inc.
      </span>
      <span className="sm:hidden">
        Unofficial UI demo. Not affiliated with Discord.
      </span>
      <a
        href="https://github.com/igorm84/rediscord"
        target="_blank"
        rel="noreferrer"
        className="underline hover:text-gray-200"
      >
        Source code
      </a>
    </div>
  );
}
