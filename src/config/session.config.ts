import * as session from 'express-session';
import * as connectRedis from 'connect-redis';
import * as redis from 'redis';

const { SESSION_SECRET, SESSION_TIMEOUT_MINUTE, REDIS_HOST, COOKIE_DOMAIN } =
  process.env;

interface CookieOption {
  maxAge: number;
  httpOnly: boolean;
  domain?: string;
}

export class SessionConfig {
  cookieOption: CookieOption = {
    maxAge: +SESSION_TIMEOUT_MINUTE * 60 * 1000,
    httpOnly: true
  };

  constructor() {
    this.cookieOption = {
      ...this.cookieOption,
      ...(COOKIE_DOMAIN && { domain: COOKIE_DOMAIN })
    };
  }

  setInMemory() {
    return session({
      secret: SESSION_SECRET,
      resave: false,
      saveUninitialized: false,
      cookie: this.cookieOption
    });
  }

  setRedis() {
    const RedisStore = connectRedis(session);

    return session({
      store: new RedisStore({
        client: redis.createClient(6379, REDIS_HOST)
      }),
      secret: SESSION_SECRET,
      resave: false,
      saveUninitialized: false,
      rolling: true,
      cookie: this.cookieOption
    });
  }
}
