create or replace function get_dashboard_stats(user_id text)
returns table (
    views bigint,
    month text
) as $$
begin
    return query
    select 
        count(*) as views, 
        to_char(created_at, 'YYYY-MM') as month 
    from public.events 
        where event_data ->> 'profile_id' = user_id and event_type = 'profile_view'
    group by month;
end;
$$ language plpgsql;




