import z from 'zod';

const NavigationItemSchema = z.object({
  id: z.number(),
  name: z.string(),
  path: z.string(),
  separator: z.boolean().optional(),
});

type NavigationItem = z.infer<typeof NavigationItemSchema>;

export { NavigationItemSchema };
export default NavigationItem;
