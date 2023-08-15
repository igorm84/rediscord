export default function Container({ children }: { children: React.ReactNode }) {
  return (
    <div className="absolute bottom-0 left-[310px] right-0 top-0 z-10 bg-foreground shadow-lg shadow-background/5">
      {children}
    </div>
  );
}
