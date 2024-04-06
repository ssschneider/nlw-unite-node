import {
  BadRequest
} from "./chunk-PAYBZHHE.mjs";

// src/error-handler.ts
import { ZodError } from "zod";
var errorHandler = (error, request, reply) => {
  if (error instanceof ZodError) {
    reply.status(400).send({
      message: "Erro de valida\xE7\xE3o",
      errors: error.flatten().fieldErrors
    });
  }
  if (error instanceof BadRequest) {
    return reply.status(400).send({ message: error.message });
  }
  return reply.status(500).send({ message: "Um erro aconteceu! Por favor, tente novamente mais tarde." });
};

export {
  errorHandler
};
