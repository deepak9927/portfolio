import React from "react";
import Link from "next/link";

const Navigation: React.FC = () => (
  <nav className="px-4 py-2 bg-gray-50 dark:bg-gray-900">
    <ul className="flex gap-4">
      <li><Link href="/">Home</Link></li>
      <li><Link href="/site">Site</Link></li>
      <li><Link href="/about">About</Link></li>
    </ul>
  </nav>
);

export default Navigation;