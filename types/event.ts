import { z } from 'zod';

const EventOrganizerSchema = z.object({
  name: z.string(),
  contacts: z.object({
    email: z.string(),
    phone: z.string(),
  }),
});

const EventParticipantSchema = z.object({
  type: z.enum(['guest', 'registered-user']),
  value: z.string(),
});

const EventScheduleSchema = z.object({
  activity: z.string(),
  time: z.string(),
});

const EventSchema = z.object({
  created_at: z.string(),
  description: z.string().nullable(),
  end_date: z.string().nullable(),
  equipment: z.array(z.string()),
  event_type: z.enum(['game', 'tournament', 'training']),
  id: z.number(),
  image_url: z.string().nullable(),
  location: z.string(),
  maximum_participants: z.number().nullable(),
  organization: z.array(EventOrganizerSchema).nullable(),
  participants: z.array(EventParticipantSchema),
  price: z.number().nullable(),
  registration_open: z.boolean(),
  rules: z.array(z.string()),
  schedule: z.array(EventScheduleSchema),
  start_date: z.string(),
  title: z.string(),
});

type Event = z.infer<typeof EventSchema>;

export { EventOrganizerSchema, EventParticipantSchema, EventScheduleSchema, EventSchema };
export default Event;
