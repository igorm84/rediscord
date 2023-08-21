import ActiveNowList from "./active-now-list";

export default function ActiveNowPanel() {
  return (
    <div className="flex-1 border-l-[1px] border-gray-800 p-4">
      <h1 className="mb-4 text-lg  font-extrabold">Active Now</h1>
      <ActiveNowList />
    </div>
  );
}
