type ClsxProps = Array<string | boolean | undefined | null>;
export default function clsx(...classes: ClsxProps) {
  return classes.filter(Boolean).join(" ");
}
