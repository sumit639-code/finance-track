import { clerkMiddleware } from "@clerk/nextjs/server";
import { currentUser } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
export default clerkMiddleware({});
export async function check(){
  const user = await currentUser()
  console.log("user")
  return NextResponse.redirect(new URL('/'))
};
export const config = {
  matcher: [ '/'],
};

// matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)'],