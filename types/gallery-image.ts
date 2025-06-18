import { z } from 'zod';

const GalleryImageSchema = z.object({
  category: z.enum(['any', 'event', 'equipment', 'team', 'training']),
  description: z.string().nullable(),
  id: z.number(),
  in_storage_bucket: z.boolean(),
  title: z.string(),
  url: z.string(),
});

type GalleryImage = z.infer<typeof GalleryImageSchema>;

export { GalleryImageSchema };
export default GalleryImage;
