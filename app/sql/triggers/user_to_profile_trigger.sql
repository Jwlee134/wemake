create function public.handle_user_creation()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
    -- create an anonymous profile for the user
    -- when the user is created, the raw_app_meta_data is going to hold jsonb data that contains the provider
    if new.raw_app_meta_data is not null then 
        -- ? is to check if the key exists in the jsonb data, and ->> is to get the value of the key
        if new.raw_app_meta_data ? 'provider' and new.raw_app_meta_data ->> 'provider' = 'email' then
            insert into public.profiles (profile_id, name, username)
            values (new.id, 'Anonymous', '@' || substr(md5(random()::text), 1, 8));
        end if;
    end if;
    return new;
end;
$$;


create trigger user_to_profile_trigger
after insert on auth.users
for each row
execute function public.handle_user_creation();