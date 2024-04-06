import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { z } from "zod";
import { prisma } from "../lib/prisma";

export async function getEvent (app: FastifyInstance) {
    app.withTypeProvider<ZodTypeProvider>().get("/events/:eventId", {
        schema: {
            params: z.object({
                eventId: z.string().uuid(),
            }),
            response: {}
        }
    }, async (request, reply) => {
        const { eventId } = request.params;

        const event = await prisma.event.findUnique({
            where: {
                id: eventId,
            }
        });

        if (event === null) {
            throw new Error ("Evento não encontrado.");
        };

        return reply.send({ event }); 
    });
};