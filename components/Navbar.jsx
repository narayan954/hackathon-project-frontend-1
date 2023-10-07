import Link from "next/link";
import useLocalStorage from "../hooks/useLocalStorage";
// import { useState } from "react";

const Navbar = () => {
  // const [search, setSearch] = useState("");
  const [user] = useLocalStorage("user");
  return (
    <div className="bg-zinc-800 text-white">
      <div className="flex items-center justify-between bg-opacity-95 px-4 sm:px-12 py-3 border-b border-zinc-500 min-h-[69px]">
        <Link href={"/"}>
          <a>
            <img src="/logo.svg" className="hidden h-10 sm:block" />
            <img src="/logo-small.svg" className="block h-10 sm:hidden" />
          </a>
        </Link>
        <nav>
          {!user ? (
            <div className="flex items-center gap-3">
              <Link href={"/login"}>
                <a className="block text-lg px-5 py-1 ">Login</a>
              </Link>
              <Link href={"/register"}>
                <a className="block bg-[#2c97df] text-lg px-5 py-1 hover:bg-opacity-90 ">
                  Register
                </a>
              </Link>
            </div>
          ) : (
            <div>
              <Link href={"/search"}>Search Doctors</Link>
              <div></div>
            </div>
          )}
        </nav>
      </div>
    </div>
  );
};

export default Navbar;
