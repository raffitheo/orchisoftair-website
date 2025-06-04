interface TeamMember {
  achivements?: string[];
  bio: string;
  equipment_id: number;
  field_name: string;
  id: string;
  is_admin: boolean;
  image_url?: string;
  year_joined: number;
  name: string;
  role: 'president' | 'vice_president' | 'advisor' | 'secretary' | 'member';
  soical_id: number;
  team_member_equipment: {
    other?: string[];
    primary?: string;
    secondary?: string;
  };
  team_member_socials: {
    facebook?: string;
    instagram?: string;
    twitter?: string;
    youtube?: string;
  };
}

export default TeamMember;
