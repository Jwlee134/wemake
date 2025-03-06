create or replace function track_event(
  event_type event_type,
  event_data jsonb
) returns void as $$
declare
    profile_id uuid;
begin
    if event_type = 'profile_view' then
        -- Get the profile_id for the username
        select p.profile_id into profile_id 
        from profiles p 
        where p.username = event_data->>'username';

        -- Only insert the event if the profile exists
        if profile_id is not null then
            -- Remove username and add profile_id
            insert into events (event_type, event_data)
            values (event_type, 
                   (event_data - 'username') || jsonb_build_object('profile_id', profile_id));
        end if;
    
    else
        -- For other event types, insert as is
        insert into events (event_type, event_data)
        values (event_type, event_data);
    end if;
end;
$$ language plpgsql;
