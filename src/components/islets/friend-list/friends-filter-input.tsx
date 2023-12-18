import { Input } from "@/components/ui/input";
import InputField from "@/components/ui/input/input-field";
import clsx from "@/lib/clsx";
import { BsSearch, BsXLg } from "react-icons/bs";

interface FriendsFilterInputProps {
  filterValue: string;
  setFilterValue: (v: string) => void;
  tabTitle: string;
  filteredUserCount: number;
}

export default function FriendsFilterInput({
  filterValue,
  setFilterValue,
  tabTitle,
  filteredUserCount,
}: FriendsFilterInputProps) {
  return (
    <div className="px-2 pb-5">
      <InputField
        endIcon={
          <>
            <BsSearch
              className={clsx(
                "absolute right-0 transition-all",
                filterValue ? "-rotate-90 opacity-0" : "rotate-0 opacity-100",
              )}
            />
            <button
              className={clsx(
                "absolute right-0 outline-none transition-all",
                filterValue ? "rotate-0 opacity-100" : "rotate-90 opacity-0",
              )}
              onClick={() => setFilterValue("")}
            >
              <BsXLg />
            </button>
          </>
        }
      >
        <Input
          placeholder="Search"
          value={filterValue}
          onChange={(e) => setFilterValue(e.currentTarget.value)}
        />
      </InputField>
      <div className="mt-6 text-xs font-semibold uppercase text-gray-400">
        {tabTitle} — {filteredUserCount}
      </div>
    </div>
  );
}
