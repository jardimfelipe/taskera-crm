import Image from "next/image";
import Link from "next/link";
import React from "react";

const Logo = () => {
  return (
    <Link href="/">
      <div className="hover:opacity-75 transition items-center gap-x-2 hidden md:flex">
        <Image src="/logo.png" alt="Taskera" height={30} width={30} />
        <p className="text-lg text-neutral-700 font-semibold">Taskera</p>
      </div>
    </Link>
  );
};

export default Logo;
