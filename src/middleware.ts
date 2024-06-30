import { auth } from "@/auth";

export { auth as middleware } from "@/auth";

export default auth((req) => {
  console.log(`object`);
  if (!req.auth && req.nextUrl.pathname !== "/login") {
    const newUrl = new URL("/login", req.nextUrl.origin)
    return Response.redirect(newUrl)
  }
})

export const config = {
  matcher: ["/"],
}