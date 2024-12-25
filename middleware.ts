import { withMiddlewareAuthRequired } from "@auth0/nextjs-auth0/edge";

export default withMiddlewareAuthRequired();

export const config = {
  matcher: ["/((?!api/auth|guess|$).*)"], // Protect all routes except "api/auth"], // Define protected routes
};
