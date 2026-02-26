"use client";

export default function Header({
  onSearch,
}: {
  onSearch?: (q: string) => void;
}) {
  return (
    <div className="flex items-center justify-between px-6 py-4 border-b bg-white">
      <h1 className="text-xl font-semibold text-gray-800">Dashboard</h1>

      <input
        type="text"
        placeholder="Search..."
        onChange={(e) => onSearch?.(e.target.value)}
        className="border border-gray-300 px-3 py-1.5 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
  );
}