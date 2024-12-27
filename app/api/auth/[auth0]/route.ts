import { handleAuth, handleLogin, handleLogout } from "@auth0/nextjs-auth0";

export const GET = handleAuth({
  login: handleLogin({
    authorizationParams: {
      client_id: process.env.AUTH0_CLIENT_ID,
      response_type: "code",
      audience: "https://dev-llzbopidy6i26kov.us.auth0.com/api/v2/",
      scope: "openid profile email",
    },
  }),
  logout: handleLogout({ returnTo: "http://localhost:3000/guess" }),
});
