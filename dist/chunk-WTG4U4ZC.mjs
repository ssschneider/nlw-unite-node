import {
  BadRequest
} from "./chunk-PAYBZHHE.mjs";
import {
  prisma
} from "./chunk-JV6GRE7Y.mjs";

// src/routes/get-event.ts
import { z } from "zod";
async function getEvent(app) {
  app.withTypeProvider().get("/events/:eventId", {
    schema: {
      summary: "Rota para ver um evento",
      tags: ["events"],
      params: z.object({
        eventId: z.string().uuid()
      }),
      response: {
        200: z.object({
          event: z.object({
            id: z.string().uuid(),
            title: z.string(),
            details: z.string().nullable(),
            slug: z.string(),
            maximumAttendees: z.number().int().nullable(),
            registeredAttendees: z.number().int()
          })
        })
      }
    }
  }, async (request, reply) => {
    const { eventId } = request.params;
    const event = await prisma.event.findUnique({
      select: {
        id: true,
        title: true,
        details: true,
        slug: true,
        maximumAttendees: true,
        _count: {
          select: {
            attendees: true
          }
        }
      },
      where: {
        id: eventId
      }
    });
    if (event === null) {
      throw new BadRequest("Evento n\xE3o encontrado.");
    }
    ;
    return reply.send({
      event: {
        id: event.id,
        title: event.title,
        details: event.details,
        slug: event.slug,
        maximumAttendees: event.maximumAttendees,
        registeredAttendees: event._count.attendees
      }
    });
  });
}

export {
  getEvent
};
