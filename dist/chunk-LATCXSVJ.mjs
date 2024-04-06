import {
  BadRequest
} from "./chunk-PAYBZHHE.mjs";
import {
  prisma
} from "./chunk-JV6GRE7Y.mjs";

// src/routes/register-for-event.ts
import { z } from "zod";
async function registerForEvent(app) {
  app.withTypeProvider().post("/events/:eventId/attendees", {
    schema: {
      summary: "Rota para se registrar em um evento",
      tags: ["attendee"],
      body: z.object({
        name: z.string().min(4),
        email: z.string().email()
      }),
      params: z.object({
        eventId: z.string().uuid()
      }),
      response: {
        201: z.object({
          attendeeId: z.number()
        })
      }
    }
  }, async (request, reply) => {
    const { eventId } = request.params;
    const { name, email } = request.body;
    const attendeeAlreadyRegistered = await prisma.attendee.findUnique({
      where: {
        eventId_email: {
          email,
          eventId
        }
      }
    });
    if (attendeeAlreadyRegistered !== null) {
      throw new BadRequest("Esse participante j\xE1 se registrou nesse evento.");
    }
    ;
    const [event, registeredEventAttendees] = await Promise.all([
      prisma.event.findUnique({
        where: {
          id: eventId
        }
      }),
      prisma.attendee.count({
        where: {
          eventId
        }
      })
    ]);
    if (event?.maximumAttendees && registeredEventAttendees > event?.maximumAttendees) {
      throw new BadRequest("O limite de participantes para esse evento foi atingido.");
    }
    ;
    const attendee = await prisma.attendee.create({
      data: {
        name,
        email,
        eventId
      }
    });
    return reply.status(201).send({ attendeeId: attendee.id });
  });
}

export {
  registerForEvent
};
