export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      categories: {
        Row: {
          id: string;
          name: string;
          slug: string;
          description: string | null;
          icon: string | null;
          display_order: number;
          is_active: boolean;
          created_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          slug: string;
          description?: string | null;
          icon?: string | null;
          display_order?: number;
          is_active?: boolean;
          created_at?: string;
        };
        Update: Partial<Database["public"]["Tables"]["categories"]["Insert"]>;
        Relationships: [];
      };

      businesses: {
        Row: {
          id: string;
          category_id: string;
          name: string;
          slug: string;
          short_description: string | null;
          executive_summary: string | null;
          business_model: string | null;
          target_customers: string | null;
          industry: string | null;
          country: string;
          location_notes: string | null;
          investment_min: number | null;
          investment_max: number | null;
          investment_currency: string;
          investment_basis: string | null;
          investment_status: string;
          research_status: string;
          research_summary: string | null;
          research_reviewed_at: string | null;
          research_next_review_at: string | null;
          keywords: string[];
          featured: boolean;
          display_order: number;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          category_id: string;
          name: string;
          slug: string;
          short_description?: string | null;
          executive_summary?: string | null;
          business_model?: string | null;
          target_customers?: string | null;
          industry?: string | null;
          country?: string;
          location_notes?: string | null;
          investment_min?: number | null;
          investment_max?: number | null;
          investment_currency?: string;
          investment_basis?: string | null;
          investment_status?: string;
          research_status?: string;
          research_summary?: string | null;
          research_reviewed_at?: string | null;
          research_next_review_at?: string | null;
          keywords?: string[];
          featured?: boolean;
          display_order?: number;
          created_at?: string;
          updated_at?: string;
        };
        Update: Partial<Database["public"]["Tables"]["businesses"]["Insert"]>;
        Relationships: [];
      };

      business_sections: {
        Row: {
          id: string;
          business_id: string;
          section_key: string;
          title: string;
          content: string | null;
          display_order: number;
          verification_status: string;
          last_reviewed_at: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          business_id: string;
          section_key: string;
          title: string;
          content?: string | null;
          display_order?: number;
          verification_status?: string;
          last_reviewed_at?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: Partial<Database["public"]["Tables"]["business_sections"]["Insert"]>;
        Relationships: [];
      };

      research_sources: {
        Row: {
          id: string;
          business_id: string | null;
          title: string;
          publisher: string | null;
          source_url: string;
          source_type: string;
          published_at: string | null;
          accessed_at: string;
          verification_status: string;
          notes: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          business_id?: string | null;
          title: string;
          publisher?: string | null;
          source_url: string;
          source_type?: string;
          published_at?: string | null;
          accessed_at?: string;
          verification_status?: string;
          notes?: string | null;
          created_at?: string;
        };
        Update: Partial<Database["public"]["Tables"]["research_sources"]["Insert"]>;
        Relationships: [];
      };

      research_claims: {
        Row: {
          id: string;
          business_id: string;
          section_id: string | null;
          source_id: string | null;
          claim_text: string;
          claim_type: string;
          evidence_status: string;
          checked_at: string | null;
          notes: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          business_id: string;
          section_id?: string | null;
          source_id?: string | null;
          claim_text: string;
          claim_type?: string;
          evidence_status?: string;
          checked_at?: string | null;
          notes?: string | null;
          created_at?: string;
        };
        Update: Partial<Database["public"]["Tables"]["research_claims"]["Insert"]>;
        Relationships: [];
      };

      profiles: {
        Row: {
          id: string;
          display_name: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          display_name?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: Partial<Database["public"]["Tables"]["profiles"]["Insert"]>;
        Relationships: [];
      };

      admin_users: {
        Row: {
          user_id: string;
          created_at: string;
        };
        Insert: {
          user_id: string;
          created_at?: string;
        };
        Update: Partial<Database["public"]["Tables"]["admin_users"]["Insert"]>;
        Relationships: [];
      };

      saved_businesses: {
        Row: {
          user_id: string;
          business_id: string;
          created_at: string;
        };
        Insert: {
          user_id: string;
          business_id: string;
          created_at?: string;
        };
        Update: Partial<Database["public"]["Tables"]["saved_businesses"]["Insert"]>;
        Relationships: [];
      };

      comparisons: {
        Row: {
          id: string;
          user_id: string;
          name: string;
          business_ids: string[];
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          name?: string;
          business_ids?: string[];
          created_at?: string;
          updated_at?: string;
        };
        Update: Partial<Database["public"]["Tables"]["comparisons"]["Insert"]>;
        Relationships: [];
      };

      research_feedback: {
        Row: {
          id: string;
          user_id: string | null;
          business_id: string;
          feedback_type: string;
          message: string;
          status: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id?: string | null;
          business_id: string;
          feedback_type: string;
          message: string;
          status?: string;
          created_at?: string;
        };
        Update: Partial<Database["public"]["Tables"]["research_feedback"]["Insert"]>;
        Relationships: [];
      };
    };

    Views: Record<string, never>;
    Functions: {
      is_admin: {
        Args: Record<string, never>;
        Returns: boolean;
      };
    };
    Enums: Record<string, never>;
    CompositeTypes: Record<string, never>;
  };
}