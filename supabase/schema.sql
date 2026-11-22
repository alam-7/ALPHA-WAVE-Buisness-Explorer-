-- ============================================================
-- ALPHA WAVE BUSINESS EXPLORER
-- Core PostgreSQL Database Schema
-- Initial market: India
-- ============================================================

create extension if not exists pgcrypto;

-- ============================================================
-- 1. USER PROFILES
-- ============================================================

create table if not exists public.profiles (
    id uuid primary key references auth.users(id) on delete cascade,
    display_name text,
    created_at timestamptz not null default now(),
    updated_at timestamptz not null default now()
);

-- ============================================================
-- 2. ADMINISTRATORS
-- Admin access is assigned through trusted database operations.
-- Ordinary users cannot promote themselves.
-- ============================================================

create table if not exists public.admin_users (
    user_id uuid primary key references auth.users(id) on delete cascade,
    created_at timestamptz not null default now()
);

create or replace function public.is_admin()
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
    select exists (
        select 1
        from public.admin_users
        where user_id = (select auth.uid())
    );
$$;

revoke all on function public.is_admin() from public;
grant execute on function public.is_admin() to authenticated;

-- ============================================================
-- 3. BUSINESS CATEGORIES
-- ============================================================

create table if not exists public.categories (
    id uuid primary key default gen_random_uuid(),
    name text not null unique,
    slug text not null unique,
    description text,
    icon text,
    display_order integer not null default 0,
    is_active boolean not null default true,
    created_at timestamptz not null default now()
);

insert into public.categories
    (name, slug, description, icon, display_order)
values
(
    'Finance & FinTech',
    'finance-fintech',
    'Financial technology, payments and financial services.',
    'landmark',
    1
),
(
    'B2B SaaS, AI & Software',
    'b2b-saas-ai-software',
    'Business software, artificial intelligence and digital platforms.',
    'cpu',
    2
),
(
    'Real Estate & Construction',
    'real-estate-construction',
    'Property, construction materials and infrastructure services.',
    'building-2',
    3
),
(
    'Healthcare & MedTech',
    'healthcare-medtech',
    'Healthcare services, medical technology and health products.',
    'heart-pulse',
    4
),
(
    'Energy, EV & Infrastructure',
    'energy-ev-infrastructure',
    'Energy systems, electric mobility and infrastructure.',
    'zap',
    5
),
(
    'Manufacturing & Industrial Products',
    'manufacturing-industrial-products',
    'Manufacturing, industrial components and production.',
    'factory',
    6
),
(
    'E-commerce & Retail',
    'ecommerce-retail',
    'Online commerce, retail and consumer products.',
    'shopping-bag',
    7
),
(
    'Agriculture & Food Processing',
    'agriculture-food-processing',
    'Agriculture, food production and processing.',
    'wheat',
    8
),
(
    'Education & Professional Services',
    'education-professional-services',
    'Education, training and professional services.',
    'graduation-cap',
    9
),
(
    'Logistics, Recycling & Environment',
    'logistics-recycling-environment',
    'Logistics, circular economy and environmental services.',
    'truck',
    10
)
on conflict (slug) do nothing;

-- ============================================================
-- 4. BUSINESS PROFILES
-- ============================================================

create table if not exists public.businesses (
    id uuid primary key default gen_random_uuid(),

    category_id uuid not null
        references public.categories(id),

    name text not null,
    slug text not null unique,

    short_description text,
    executive_summary text,

    business_model text,
    target_customers text,
    industry text,

    country text not null default 'India',
    location_notes text,

    investment_min numeric(15,2),
    investment_max numeric(15,2),
    investment_currency text not null default 'INR',

    investment_basis text,
    investment_status text not null default 'not_verified'
        check (
            investment_status in (
                'officially_verified',
                'published_estimate',
                'research_estimate',
                'illustrative_assumption',
                'not_verified'
            )
        ),

    research_status text not null default 'draft'
        check (
            research_status in (
                'draft',
                'in_review',
                'published',
                'needs_update',
                'archived'
            )
        ),

    research_summary text,
    research_reviewed_at timestamptz,
    research_next_review_at timestamptz,

    keywords text[] not null default '{}',

    featured boolean not null default false,
    display_order integer not null default 0,

    created_at timestamptz not null default now(),
    updated_at timestamptz not null default now(),

    constraint valid_investment_range check (
        investment_min is null
        or investment_max is null
        or investment_min <= investment_max
    )
);

create index if not exists businesses_category_idx
    on public.businesses(category_id);

create index if not exists businesses_status_idx
    on public.businesses(research_status);

create index if not exists businesses_featured_idx
    on public.businesses(featured);

create index if not exists businesses_name_search_idx
    on public.businesses using gin (
        to_tsvector(
            'english',
            coalesce(name, '') || ' ' ||
            coalesce(short_description, '') || ' ' ||
            coalesce(executive_summary, '') || ' ' ||
            coalesce(industry, '')
        )
    );

create index if not exists businesses_keywords_idx
    on public.businesses using gin(keywords);

-- ============================================================
-- 5. BUSINESS RESEARCH SECTIONS
-- ============================================================

create table if not exists public.business_sections (
    id uuid primary key default gen_random_uuid(),

    business_id uuid not null
        references public.businesses(id) on delete cascade,

    section_key text not null,
    title text not null,
    content text,

    display_order integer not null default 0,

    verification_status text not null default 'not_verified'
        check (
            verification_status in (
                'officially_verified',
                'published_estimate',
                'research_estimate',
                'illustrative_assumption',
                'not_verified'
            )
        ),

    last_reviewed_at timestamptz,

    created_at timestamptz not null default now(),
    updated_at timestamptz not null default now(),

    unique (business_id, section_key)
);

create index if not exists business_sections_business_idx
    on public.business_sections(business_id, display_order);

-- ============================================================
-- 6. RESEARCH SOURCES
-- ============================================================

create table if not exists public.research_sources (
    id uuid primary key default gen_random_uuid(),

    business_id uuid
        references public.businesses(id) on delete cascade,

    title text not null,
    publisher text,
    source_url text not null,

    source_type text not null default 'other'
        check (
            source_type in (
                'government',
                'official_company',
                'industry_report',
                'academic',
                'news',
                'supplier',
                'other'
            )
        ),

    published_at date,
    accessed_at timestamptz not null default now(),

    verification_status text not null default 'not_verified'
        check (
            verification_status in (
                'verified',
                'needs_review',
                'not_verified'
            )
        ),

    notes text,

    created_at timestamptz not null default now()
);

create index if not exists research_sources_business_idx
    on public.research_sources(business_id);

-- ============================================================
-- 7. RESEARCH CLAIMS
-- Every important factual claim can be linked to its evidence.
-- ============================================================

create table if not exists public.research_claims (
    id uuid primary key default gen_random_uuid(),

    business_id uuid not null
        references public.businesses(id) on delete cascade,

    section_id uuid
        references public.business_sections(id) on delete set null,

    source_id uuid
        references public.research_sources(id) on delete set null,

    claim_text text not null,

    claim_type text not null default 'general'
        check (
            claim_type in (
                'market',
                'financial',
                'regulatory',
                'operational',
                'competitor',
                'general'
            )
        ),

    evidence_status text not null default 'not_verified'
        check (
            evidence_status in (
                'officially_verified',
                'published_estimate',
                'research_estimate',
                'illustrative_assumption',
                'not_verified'
            )
        ),

    checked_at timestamptz,
    notes text,

    created_at timestamptz not null default now()
);

create index if not exists research_claims_business_idx
    on public.research_claims(business_id);

-- ============================================================
-- 8. SAVED BUSINESSES
-- ============================================================

create table if not exists public.saved_businesses (
    user_id uuid not null
        references auth.users(id) on delete cascade,

    business_id uuid not null
        references public.businesses(id) on delete cascade,

    created_at timestamptz not null default now(),

    primary key (user_id, business_id)
);

create index if not exists saved_businesses_user_idx
    on public.saved_businesses(user_id);

-- ============================================================
-- 9. BUSINESS COMPARISONS
-- ============================================================

create table if not exists public.comparisons (
    id uuid primary key default gen_random_uuid(),

    user_id uuid not null
        references auth.users(id) on delete cascade,

    name text not null default 'My comparison',

    business_ids uuid[] not null default '{}',

    created_at timestamptz not null default now(),
    updated_at timestamptz not null default now(),

    constraint comparison_limit check (
        cardinality(business_ids) <= 5
    )
);

create index if not exists comparisons_user_idx
    on public.comparisons(user_id);

-- ============================================================
-- 10. RESEARCH FEEDBACK
-- ============================================================

create table if not exists public.research_feedback (
    id uuid primary key default gen_random_uuid(),

    user_id uuid
        references auth.users(id) on delete set null,

    business_id uuid not null
        references public.businesses(id) on delete cascade,

    feedback_type text not null
        check (
            feedback_type in (
                'incorrect_information',
                'outdated_information',
                'missing_information',
                'broken_source',
                'other'
            )
        ),

    message text not null,

    status text not null default 'open'
        check (
            status in (
                'open',
                'under_review',
                'resolved',
                'rejected'
            )
        ),

    created_at timestamptz not null default now()
);

-- ============================================================
-- 11. UPDATED_AT TRIGGER
-- ============================================================

create or replace function public.set_updated_at()
returns trigger
language plpgsql
set search_path = ''
as $$
begin
    new.updated_at = now();
    return new;
end;
$$;

drop trigger if exists businesses_updated_at
    on public.businesses;

create trigger businesses_updated_at
before update on public.businesses
for each row execute function public.set_updated_at();

drop trigger if exists profiles_updated_at
    on public.profiles;

create trigger profiles_updated_at
before update on public.profiles
for each row execute function public.set_updated_at();

drop trigger if exists business_sections_updated_at
    on public.business_sections;

create trigger business_sections_updated_at
before update on public.business_sections
for each row execute function public.set_updated_at();

drop trigger if exists comparisons_updated_at
    on public.comparisons;

create trigger comparisons_updated_at
before update on public.comparisons
for each row execute function public.set_updated_at();

-- ============================================================
-- 12. AUTOMATIC PROFILE CREATION
-- ============================================================

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
    insert into public.profiles (id, display_name)
    values (
        new.id,
        nullif(new.raw_user_meta_data ->> 'display_name', '')
    )
    on conflict (id) do nothing;

    return new;
end;
$$;

drop trigger if exists on_auth_user_created
    on auth.users;

create trigger on_auth_user_created
after insert on auth.users
for each row execute function public.handle_new_user();

-- ============================================================
-- 13. ENABLE ROW LEVEL SECURITY
-- ============================================================

alter table public.profiles enable row level security;
alter table public.admin_users enable row level security;
alter table public.categories enable row level security;
alter table public.businesses enable row level security;
alter table public.business_sections enable row level security;
alter table public.research_sources enable row level security;
alter table public.research_claims enable row level security;
alter table public.saved_businesses enable row level security;
alter table public.comparisons enable row level security;
alter table public.research_feedback enable row level security;

-- ============================================================
-- 14. PROFILE POLICIES
-- ============================================================

create policy "Users can view their own profile"
on public.profiles
for select
to authenticated
using (id = (select auth.uid()));

create policy "Users can update their own profile"
on public.profiles
for update
to authenticated
using (id = (select auth.uid()))
with check (id = (select auth.uid()));

-- ============================================================
-- 15. ADMIN POLICIES
-- ============================================================

create policy "Admins can view admin records"
on public.admin_users
for select
to authenticated
using (public.is_admin());

-- No user-facing insert, update or delete policy is provided.
-- Assign administrators through trusted database operations.

-- ============================================================
-- 16. CATEGORY POLICIES
-- ============================================================

create policy "Anyone can view active categories"
on public.categories
for select
to anon, authenticated
using (is_active = true or public.is_admin());

create policy "Admins can manage categories"
on public.categories
for all
to authenticated
using (public.is_admin())
with check (public.is_admin());

-- ============================================================
-- 17. BUSINESS POLICIES
-- ============================================================

create policy "Public can view published businesses"
on public.businesses
for select
to anon, authenticated
using (
    research_status = 'published'
    or public.is_admin()
);

create policy "Admins can manage businesses"
on public.businesses
for all
to authenticated
using (public.is_admin())
with check (public.is_admin());

-- ============================================================
-- 18. RESEARCH SECTION POLICIES
-- ============================================================

create policy "Public can view sections of published businesses"
on public.business_sections
for select
to anon, authenticated
using (
    exists (
        select 1
        from public.businesses b
        where b.id = business_id
          and b.research_status = 'published'
    )
    or public.is_admin()
);

create policy "Admins can manage business sections"
on public.business_sections
for all
to authenticated
using (public.is_admin())
with check (public.is_admin());

-- ============================================================
-- 19. RESEARCH SOURCE POLICIES
-- ============================================================

create policy "Public can view sources for published businesses"
on public.research_sources
for select
to anon, authenticated
using (
    (
        business_id is not null
        and exists (
            select 1
            from public.businesses b
            where b.id = business_id
              and b.research_status = 'published'
        )
    )
    or public.is_admin()
);

create policy "Admins can manage research sources"
on public.research_sources
for all
to authenticated
using (public.is_admin())
with check (public.is_admin());

-- ============================================================
-- 20. RESEARCH CLAIM POLICIES
-- ============================================================

create policy "Public can view claims for published businesses"
on public.research_claims
for select
to anon, authenticated
using (
    exists (
        select 1
        from public.businesses b
        where b.id = business_id
          and b.research_status = 'published'
    )
    or public.is_admin()
);

create policy "Admins can manage research claims"
on public.research_claims
for all
to authenticated
using (public.is_admin())
with check (public.is_admin());

-- ============================================================
-- 21. SAVED BUSINESS POLICIES
-- ============================================================

create policy "Users can view their saved businesses"
on public.saved_businesses
for select
to authenticated
using (user_id = (select auth.uid()));

create policy "Users can save published businesses"
on public.saved_businesses
for insert
to authenticated
with check (
    user_id = (select auth.uid())
    and exists (
        select 1
        from public.businesses b
        where b.id = business_id
          and b.research_status = 'published'
    )
);

create policy "Users can remove their saved businesses"
on public.saved_businesses
for delete
to authenticated
using (user_id = (select auth.uid()));

-- ============================================================
-- 22. COMPARISON POLICIES
-- ============================================================

create policy "Users can view their comparisons"
on public.comparisons
for select
to authenticated
using (user_id = (select auth.uid()));

create policy "Users can create their comparisons"
on public.comparisons
for insert
to authenticated
with check (user_id = (select auth.uid()));

create policy "Users can update their comparisons"
on public.comparisons
for update
to authenticated
using (user_id = (select auth.uid()))
with check (user_id = (select auth.uid()));

create policy "Users can delete their comparisons"
on public.comparisons
for delete
to authenticated
using (user_id = (select auth.uid()));

-- ============================================================
-- 23. FEEDBACK POLICIES
-- ============================================================

create policy "Users can submit research feedback"
on public.research_feedback
for insert
to authenticated
with check (
    user_id = (select auth.uid())
);

create policy "Users can view their own feedback"
on public.research_feedback
for select
to authenticated
using (
    user_id = (select auth.uid())
    or public.is_admin()
);

create policy "Admins can manage feedback"
on public.research_feedback
for all
to authenticated
using (public.is_admin())
with check (public.is_admin());

-- ============================================================
-- 24. TABLE PERMISSIONS
-- ============================================================

grant select on public.categories to anon, authenticated;
grant select on public.businesses to anon, authenticated;
grant select on public.business_sections to anon, authenticated;
grant select on public.research_sources to anon, authenticated;
grant select on public.research_claims to anon, authenticated;

grant select, update on public.profiles to authenticated;
grant select on public.admin_users to authenticated;

grant select, insert, delete
on public.saved_businesses to authenticated;

grant select, insert, update, delete
on public.comparisons to authenticated;

grant select, insert
on public.research_feedback to authenticated;

-- ============================================================
-- END OF CORE DATABASE SCHEMA
-- ============================================================