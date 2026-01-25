import fastifyHttpProxy from '@fastify/http-proxy';
import { env } from "../env";
import { NestFastifyApplication } from "@nestjs/platform-fastify";

export const setupProxies = async (app: NestFastifyApplication) => {
  const fastify = app.getHttpAdapter().getInstance();

  const proxies = [
    {
      endpoint: '/auth',
      target: `http://${env.AUTH_HOST}:${env.AUTH_PORT}`, 
    },
  ];

  for (const { endpoint, target } of proxies) {
		await fastify.register(async function (instance) {
		instance.removeContentTypeParser('application/json');

		await instance.register(fastifyHttpProxy, {
			upstream: target,
			http2: false,
		});
    }, { prefix: endpoint });
  }
};