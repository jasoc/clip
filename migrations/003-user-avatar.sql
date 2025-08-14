DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns
        WHERE table_name='users' AND column_name='avatar'
    ) THEN
        ALTER TABLE public.users ADD COLUMN avatar BYTEA NULL;
    END IF;
END$$;
