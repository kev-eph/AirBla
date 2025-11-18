import { auth, ConfigParams, requiresAuth } from 'express-openid-connect';
import type { Express, Request } from 'express';
import { ENV } from './env';
import * as db from '../db';

export function setupAuth0(app: Express) {
  // Verificar se as credenciais do Auth0 estão configuradas
  if (!ENV.auth0ClientId || !ENV.auth0ClientSecret || !ENV.auth0IssuerBaseUrl) {
    console.warn('[Auth0] Credentials not configured. Skipping Auth0 setup.');
    console.warn('[Auth0] Please set AUTH0_CLIENT_ID, AUTH0_CLIENT_SECRET, and AUTH0_ISSUER_BASE_URL environment variables.');
    
    // Criar endpoint /api/auth/me que retorna null quando Auth0 não está configurado
    app.get('/api/auth/me', (req, res) => {
      res.json({ user: null });
    });
    
    return;
  }

  const config: ConfigParams = {
    authRequired: false,
    auth0Logout: true,
    secret: ENV.cookieSecret,
    baseURL: ENV.baseUrl || 'http://localhost:3000',
    clientID: ENV.auth0ClientId,
    issuerBaseURL: ENV.auth0IssuerBaseUrl,
    clientSecret: ENV.auth0ClientSecret,
    authorizationParams: {
      response_type: 'code',
      scope: 'openid profile email',
      audience: undefined,
    },
    idpLogout: true,
    routes: {
      login: '/api/auth/login',
      logout: '/api/auth/logout',
      callback: '/api/auth/callback',
      postLogoutRedirect: '/',
    },
  };

  // Middleware de autenticação Auth0
  app.use(auth(config));

  // Endpoint para verificar status de autenticação
  app.get('/api/auth/me', async (req: Request, res) => {
    try {
      if (!req.oidc?.isAuthenticated()) {
        return res.json({ user: null });
      }

      const auth0User = req.oidc.user;
      if (!auth0User || !auth0User.sub) {
        return res.json({ user: null });
      }

      // Sincronizar usuário com banco de dados
      const openId = auth0User.sub;
      let user = await db.getUserByOpenId(openId);

      if (!user) {
        await db.upsertUser({
          openId,
          name: auth0User.name || null,
          email: auth0User.email || null,
          loginMethod: 'auth0',
          lastSignedIn: new Date(),
        });
        user = await db.getUserByOpenId(openId);
      } else {
        await db.upsertUser({
          openId: user.openId,
          lastSignedIn: new Date(),
        });
      }

      return res.json({ user });
    } catch (error) {
      console.error('[Auth0] Error in /api/auth/me:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  });

  console.log('[Auth0] Authentication configured');
}

// Helper para extrair usuário autenticado do request
export async function getUserFromRequest(req: Request) {
  if (!req.oidc?.isAuthenticated()) {
    return null;
  }

  const auth0User = req.oidc.user;
  if (!auth0User || !auth0User.sub) {
    return null;
  }

  const openId = auth0User.sub;
  let user = await db.getUserByOpenId(openId);

  if (!user) {
    await db.upsertUser({
      openId,
      name: auth0User.name || null,
      email: auth0User.email || null,
      loginMethod: 'auth0',
      lastSignedIn: new Date(),
    });
    user = await db.getUserByOpenId(openId);
  }

  return user || null;
}
