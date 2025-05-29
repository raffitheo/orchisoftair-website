interface Event {
  description?: string;
  end_date?: string;
  equipment: number[];
  event_type: 'game' | 'tournament' | 'training';
  id: number;
  image_url?: string;
  location: string;
  registration_open: boolean;
  rules: string[];
  schedule: { activity: string; time: string }[];
  start_date: string;
  title: string;
}

export default Event;
