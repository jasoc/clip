DO $$
BEGIN
    IF NOT EXISTS (
        SELECT FROM pg_tables
        WHERE schemaname = 'public' AND tablename = 'users'
    ) THEN
        CREATE TABLE public.users (
            id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
            name VARCHAR NOT NULL,
            surname VARCHAR NOT NULL,
            email VARCHAR NULL,
            username VARCHAR NOT NULL,
            hashed_password VARCHAR NOT NULL
        );
    END IF;
END
$$;