create or replace function get_product_stats(product_id text)
returns table (
    month text,
    views bigint,
    visitors bigint
) as $$
begin
    return query
    select 
        to_char(created_at, 'YYYY-MM') as month,
        count(case when event_type = 'product_view' then 1 end) as views,
        count(case when event_type = 'product_visit' then 1 end) as visitors
    from public.events
        where event_data ->> 'product_id' = product_id 
    group by month;
end;
$$ language plpgsql;