import { withMiddlewareAuthRequired } from "@auth0/nextjs-auth0/edge";

export default withMiddlewareAuthRequired();

export const config = {
  // Protect all routes except "api/auth", "/guess",
  matcher: ["/((?!api/auth|guess$).*)"],
};
