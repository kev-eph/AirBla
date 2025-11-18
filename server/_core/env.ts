export const ENV = {
  appId: process.env.VITE_APP_ID ?? "",
  cookieSecret: process.env.JWT_SECRET ?? "",
  databaseUrl: process.env.DATABASE_URL ?? "",
  oAuthServerUrl: process.env.OAUTH_SERVER_URL ?? "",
  ownerOpenId: process.env.OWNER_OPEN_ID ?? "",
  isProduction: process.env.NODE_ENV === "production",
  forgeApiUrl: process.env.BUILT_IN_FORGE_API_URL ?? "",
  forgeApiKey: process.env.BUILT_IN_FORGE_API_KEY ?? "",
  // Auth0 configuration
  auth0ClientId: process.env.AUTH0_CLIENT_ID ?? "",
  auth0ClientSecret: process.env.AUTH0_CLIENT_SECRET ?? "",
  auth0IssuerBaseUrl: process.env.AUTH0_ISSUER_BASE_URL ?? "",
  baseUrl: process.env.BASE_URL ?? "http://localhost:3000",
};
