DO $$
BEGIN
    IF NOT EXISTS (
        SELECT FROM pg_tables
        WHERE schemaname = 'public' AND tablename = 'dashboards'
    ) THEN
        CREATE TABLE public.dashboards (
            id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
            name VARCHAR NOT NULL,
            json_grid VARCHAR NOT NULL,
            user_id UUID NOT NULL,
            FOREIGN KEY (user_id) REFERENCES public.users(id)
        );
    END IF;
END
$$;