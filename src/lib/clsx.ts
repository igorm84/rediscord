import {twMerge} from "tailwind-merge"
type ClsxProps = Array<string | boolean | undefined | null>;
export default function clsx(...classes: ClsxProps) {
  return twMerge(...classes.filter(Boolean) as string[]);
}
