export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

export type Database = {
  graphql_public: {
    Tables: {
      [_ in never]: never;
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      graphql: {
        Args: {
          operationName?: string;
          query?: string;
          variables?: Json;
          extensions?: Json;
        };
        Returns: Json;
      };
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
  public: {
    Tables: {
      events: {
        Row: {
          created_at: string | null;
          description: string | null;
          end_date: string | null;
          equipment: string[];
          event_type: Database['public']['Enums']['event_types'];
          id: number;
          image_url: string | null;
          location: string;
          maximum_participants: number | null;
          organization: Json[] | null;
          participants: Json[];
          price: number | null;
          registration_open: boolean;
          rules: string[];
          schedule: Json[];
          start_date: string;
          title: string;
        };
        Insert: {
          created_at?: string | null;
          description?: string | null;
          end_date?: string | null;
          equipment: string[];
          event_type?: Database['public']['Enums']['event_types'];
          id?: never;
          image_url?: string | null;
          location: string;
          maximum_participants?: number | null;
          organization?: Json[] | null;
          participants?: Json[];
          price?: number | null;
          registration_open?: boolean;
          rules: string[];
          schedule: Json[];
          start_date: string;
          title: string;
        };
        Update: {
          created_at?: string | null;
          description?: string | null;
          end_date?: string | null;
          equipment?: string[];
          event_type?: Database['public']['Enums']['event_types'];
          id?: never;
          image_url?: string | null;
          location?: string;
          maximum_participants?: number | null;
          organization?: Json[] | null;
          participants?: Json[];
          price?: number | null;
          registration_open?: boolean;
          rules?: string[];
          schedule?: Json[];
          start_date?: string;
          title?: string;
        };
        Relationships: [];
      };
      gallery_images: {
        Row: {
          category: Database['public']['Enums']['gallery_categories'];
          created_at: string;
          description: string | null;
          id: number;
          in_storage_bucket: boolean;
          title: string;
          url: string;
        };
        Insert: {
          category?: Database['public']['Enums']['gallery_categories'];
          created_at?: string;
          description?: string | null;
          id?: number;
          in_storage_bucket?: boolean;
          title: string;
          url: string;
        };
        Update: {
          category?: Database['public']['Enums']['gallery_categories'];
          created_at?: string;
          description?: string | null;
          id?: number;
          in_storage_bucket?: boolean;
          title?: string;
          url?: string;
        };
        Relationships: [];
      };
      team_members: {
        Row: {
          achivements: string[] | null;
          bio: string | null;
          created_at: string;
          equipment: Json;
          field_name: string | null;
          id: string;
          image_url: string | null;
          is_admin: boolean;
          location: string;
          name: string;
          role: Database['public']['Enums']['team_member_roles'];
          socials: Json;
          year_joined: number;
        };
        Insert: {
          achivements?: string[] | null;
          bio?: string | null;
          created_at?: string;
          equipment?: Json;
          field_name?: string | null;
          id: string;
          image_url?: string | null;
          is_admin?: boolean;
          location: string;
          name: string;
          role: Database['public']['Enums']['team_member_roles'];
          socials?: Json;
          year_joined: number;
        };
        Update: {
          achivements?: string[] | null;
          bio?: string | null;
          created_at?: string;
          equipment?: Json;
          field_name?: string | null;
          id?: string;
          image_url?: string | null;
          is_admin?: boolean;
          location?: string;
          name?: string;
          role?: Database['public']['Enums']['team_member_roles'];
          socials?: Json;
          year_joined?: number;
        };
        Relationships: [];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      get_events_containing_user: {
        Args: { user_id: string };
        Returns: {
          created_at: string | null;
          description: string | null;
          end_date: string | null;
          equipment: string[];
          event_type: Database['public']['Enums']['event_types'];
          id: number;
          image_url: string | null;
          location: string;
          maximum_participants: number | null;
          organization: Json[] | null;
          participants: Json[];
          price: number | null;
          registration_open: boolean;
          rules: string[];
          schedule: Json[];
          start_date: string;
          title: string;
        }[];
      };
      get_random_team_members: {
        Args: { limit_count: number; user_id?: string };
        Returns: {
          achivements: string[] | null;
          bio: string | null;
          created_at: string;
          equipment: Json;
          field_name: string | null;
          id: string;
          image_url: string | null;
          is_admin: boolean;
          location: string;
          name: string;
          role: Database['public']['Enums']['team_member_roles'];
          socials: Json;
          year_joined: number;
        }[];
      };
    };
    Enums: {
      event_types: 'game' | 'tournament' | 'training';
      gallery_categories: 'any' | 'equipment' | 'event' | 'team' | 'training';
      team_member_roles: 'president' | 'vice_president' | 'advisor' | 'secretary' | 'member';
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
};

type DefaultSchema = Database[Extract<keyof Database, 'public'>];

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema['Tables'] & DefaultSchema['Views'])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database;
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions['schema']]['Tables'] &
        Database[DefaultSchemaTableNameOrOptions['schema']]['Views'])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions['schema']]['Tables'] &
      Database[DefaultSchemaTableNameOrOptions['schema']]['Views'])[TableName] extends {
      Row: infer R;
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema['Tables'] & DefaultSchema['Views'])
    ? (DefaultSchema['Tables'] & DefaultSchema['Views'])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R;
      }
      ? R
      : never
    : never;

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends keyof DefaultSchema['Tables'] | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database;
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions['schema']]['Tables']
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions['schema']]['Tables'][TableName] extends {
      Insert: infer I;
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema['Tables']
    ? DefaultSchema['Tables'][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I;
      }
      ? I
      : never
    : never;

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends keyof DefaultSchema['Tables'] | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database;
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions['schema']]['Tables']
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions['schema']]['Tables'][TableName] extends {
      Update: infer U;
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema['Tables']
    ? DefaultSchema['Tables'][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U;
      }
      ? U
      : never
    : never;

export type Enums<
  DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema['Enums'] | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database;
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions['schema']]['Enums']
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions['schema']]['Enums'][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema['Enums']
    ? DefaultSchema['Enums'][DefaultSchemaEnumNameOrOptions]
    : never;

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends keyof DefaultSchema['CompositeTypes'] | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database;
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions['schema']]['CompositeTypes']
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions['schema']]['CompositeTypes'][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema['CompositeTypes']
    ? DefaultSchema['CompositeTypes'][PublicCompositeTypeNameOrOptions]
    : never;

export const Constants = {
  graphql_public: {
    Enums: {},
  },
  public: {
    Enums: {
      event_types: ['game', 'tournament', 'training'],
      gallery_categories: ['any', 'equipment', 'event', 'team', 'training'],
      team_member_roles: ['president', 'vice_president', 'advisor', 'secretary', 'member'],
    },
  },
} as const;
