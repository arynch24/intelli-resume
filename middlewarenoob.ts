// import { NextResponse } from "next/server";
// import type { NextRequest } from "next/server";

// export async function middleware(req: NextRequest) {
//   const BACKEND_API = "https://04b0-113-30-168-48.ngrok-free.app";

//   try {
//     const response = await fetch(`${BACKEND_API}/api/auth/check-auth`, {
//       headers: {
//         cookie: req.headers.get("cookie") || "",
//       },
//     });

//     const token = await response.json();

//     console.log("Token received:", token);

//     if (!token.success) {
//       return NextResponse.redirect(new URL("/", req.url));
//     }

//     return NextResponse.next();
//   } catch (error) {
//     console.error("Auth check failed:", error);
//     return NextResponse.redirect(new URL("/", req.url));
//   }
// }

// export const config = {
//   matcher: ["/dashboard/:path*"],
// };
