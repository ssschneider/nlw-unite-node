import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { z } from "zod";
import { prisma } from "../lib/prisma";

export async function getAttendeeBadge (app: FastifyInstance) {
    app
        .withTypeProvider<ZodTypeProvider>()
        .get("/attendees/:attendeeId/badge", {
            schema: {
                summary: "Rota para receber o crachá de participação",
				tags: ["attendee"],
                params: z.object({
                    attendeeId: z.coerce.number().int(),
                }),
                response: {
                    200: z.object({
                        badge: z.object({
                            name: z.string(),
                            email: z.string().email(),
                            eventTitle: z.string(),
                            checkInURL: z.string().url(),
                        })
                    })
                }
            }
        }, async (request, reply) => {
            const { attendeeId } = request.params;

            const attendee = await prisma.attendee.findUnique({
                select: {
                    name: true,
                    email: true,
                    event: {
                        select: {
                            title: true,
                        }
                    }
                },
                where: {
                    id: attendeeId,
                }
            });

            if (attendee === null) {
                throw new Error ("Participante não encontrado");
            };

            const baseURL = `${request.protocol}://${request.hostname}`;

            const checkInURL = new URL(`/attendees/${attendeeId}/check-in`, baseURL);

            reply.send({ 
                badge: {
                    name: attendee.name,
                    email: attendee.email,
                    eventTitle: attendee.event.title,
                    checkInURL: checkInURL.toString(),
                }
            });
        });
};