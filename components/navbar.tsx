import { Icon } from "@iconify/react";

export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 bg-white shadow-md z-50 p-4">
      <div className="flex items-center gap-2" style={{ color: "#007BFF" }}>
        <Icon icon="mdi:circle" width="32" height="32" />
        <span className="text-2xl font-bold">Brand</span>
      </div>
    </nav>
  );
}
