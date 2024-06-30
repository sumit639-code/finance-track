"use client";
import React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useUser, UserButton } from "@clerk/nextjs";
import Link from "next/link";

const Header = () => {
  const { user, isSignedIn } = useUser();
  return (
    <>
      <div className="bg-gray-900 p-5 flex justify-between items-center border shadow-sm text-white">
        <div className=" flex items-center space-x-3">
          <Image src={"./logo.svg"} alt="logo" width={50} height={50} />
          <span>Finance tracker</span>
        </div>
        <div className=" flex items-center space-x-3">
          {isSignedIn ? (
            <UserButton />
          ) : (
            <Link href="/sign-in">
              <Button>Get Started</Button>
            </Link>
          )}
        </div>
      </div>
    </>
  );
};

export default Header;
