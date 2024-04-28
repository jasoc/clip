DO $$
BEGIN
    IF NOT EXISTS (
        SELECT FROM pg_tables
        WHERE schemaname = 'public' AND tablename = 'cards'
    ) THEN
        CREATE TABLE public.cards (
            id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
            title VARCHAR NOT NULL,
            subtitle VARCHAR NOT NULL,
            url VARCHAR NOT NULL,
            icon VARCHAR,
            owner_id UUID NOT NULL,
            FOREIGN KEY (owner_id) REFERENCES public.users(id)
        );
    END IF;
END
$$;