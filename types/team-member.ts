import { z } from 'zod';

const TeamMemberEquipmentSchema = z.object({
  other: z.array(z.object({ value: z.string() })),
  primary: z.string(),
  secondary: z.string(),
});

const TeamMemberSocialsSchema = z.object({
  facebook: z.string(),
  instagram: z.string(),
  twitter: z.string(),
  youtube: z.string(),
});

const TeamMemberSchema = z.object({
  achivements: z.array(z.string()).nullable(),
  bio: z.string(),
  equipment: TeamMemberEquipmentSchema,
  field_name: z.string(),
  id: z.string(),
  is_admin: z.boolean(),
  image_url: z.string().nullable(),
  location: z.string(),
  name: z.string(),
  role: z.enum(['president', 'vice_president', 'advisor', 'secretary', 'member']),
  socials: TeamMemberSocialsSchema,
  year_joined: z.number(),
});

type TeamMember = z.infer<typeof TeamMemberSchema>;

export { TeamMemberEquipmentSchema, TeamMemberSocialsSchema, TeamMemberSchema };
export default TeamMember;
