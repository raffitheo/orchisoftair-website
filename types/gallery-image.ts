interface GalleryImage {
  category: 'any' | 'event' | 'equipment' | 'team' | 'training';
  description?: string;
  id: number;
  title: string;
  url: string;
}

export default GalleryImage;
