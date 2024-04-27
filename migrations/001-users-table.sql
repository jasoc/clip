DO $$
BEGIN
    IF NOT EXISTS (
        SELECT FROM pg_tables
        WHERE schemaname = 'public' AND tablename = 'users'
    ) THEN
        CREATE TABLE public.users (
            id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
            name VARCHAR NOT NULL,
            surname VARCHAR NOT NULL,
            email VARCHAR NOT NULL,
            username VARCHAR NOT NULL,
            hashed_password VARCHAR NOT NULL
        );
    END IF;
END
$$;