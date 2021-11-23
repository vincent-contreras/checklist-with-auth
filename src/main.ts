import { ValidationPipe, VersioningType } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app/app.module";
import * as passport from "passport";
import { SwaggerConfig } from "./config/swagger.config";
import { SessionConfig } from "./config/session.config";
import * as helmet from "helmet";

const { BASE_URL } = process.env;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix(BASE_URL);

  app.useGlobalPipes(new ValidationPipe());
  app.use(new SessionConfig().setRedis());
  app.use(passport.initialize());
  app.use(passport.session());
  app.use(helmet());

  app.enableCors({
    credentials: true,
    origin: function (origin, callback) {
      return callback(null, true);
    }
  });

  app.enableVersioning({
    type: VersioningType.URI
  });

  new SwaggerConfig(app).setup();

  await app.listen(8080);
}

bootstrap();
