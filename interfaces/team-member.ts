interface TeamMember {
  achievements?: string[];
  bio: string;
  equipment?: number;
  field_name: string;
  id: number;
  image_url?: string;
  year_joined: number;
  name: string;
  role: string;
  soical?: number;
  team_member_equipment?: {
    other?: string[];
    primary?: string;
    secondary?: string;
  };
  team_member_socials?: {
    facebook?: string;
    instagram?: string;
    twitter?: string;
    youtube?: string;
  };
}

export default TeamMember;
