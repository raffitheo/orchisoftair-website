interface TeamMember {
  achivements?: string[];
  bio: string;
  equipment: {
    other: { value: string }[];
    primary: string;
    secondary: string;
  };
  field_name: string;
  id: string;
  is_admin: boolean;
  image_url?: string;
  location: string;
  name: string;
  role: 'president' | 'vice_president' | 'advisor' | 'secretary' | 'member';
  socials: {
    facebook: string;
    instagram: string;
    twitter: string;
    youtube: string;
  };
  year_joined: number;
}

export default TeamMember;
