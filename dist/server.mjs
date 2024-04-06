import {
  errorHandler
} from "./chunk-37UVXK5X.mjs";
import {
  checkIn
} from "./chunk-FQKAF33Z.mjs";
import {
  createEvent
} from "./chunk-Z3XYCVJM.mjs";
import "./chunk-677O5SV4.mjs";
import {
  getAttendeeBadge
} from "./chunk-IDK2GIHS.mjs";
import {
  getAttendees
} from "./chunk-JXWCQIN2.mjs";
import {
  getEvent
} from "./chunk-WTG4U4ZC.mjs";
import {
  registerForEvent
} from "./chunk-LATCXSVJ.mjs";
import "./chunk-PAYBZHHE.mjs";
import "./chunk-JV6GRE7Y.mjs";

// src/server.ts
import fastify from "fastify";
import fastifySwagger from "@fastify/swagger";
import fastifySwaggerUI from "@fastify/swagger-ui";
import { jsonSchemaTransform, serializerCompiler, validatorCompiler } from "fastify-type-provider-zod";
import fastifyCors from "@fastify/cors";
var app = fastify();
app.register(fastifyCors, {
  origin: "*"
});
app.register(fastifySwagger, {
  swagger: {
    consumes: ["application/json"],
    produces: ["application/json"],
    info: {
      title: "Pass.in",
      description: "Especifica\xE7\xF5es para o back-end da aplica\xE7\xE3o Pass.in",
      version: "1.0.0."
    }
  },
  transform: jsonSchemaTransform
});
app.register(fastifySwaggerUI, {
  routePrefix: "/docs"
});
app.setValidatorCompiler(validatorCompiler);
app.setSerializerCompiler(serializerCompiler);
app.register(createEvent);
app.register(registerForEvent);
app.register(getEvent);
app.register(getAttendeeBadge);
app.register(checkIn);
app.register(getAttendees);
app.setErrorHandler(errorHandler);
app.listen({
  port: 3333
}).then(() => console.log("HTTP server running!"));
