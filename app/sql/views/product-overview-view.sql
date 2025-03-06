create or replace view product_overview_view as
select
   product_id,
   name,
   tagline,
   description,
   how_it_works,
   icon,
   url,
   stats->>'upvotes' as upvotes,
   stats->>'views' as views,
   stats->>'reviews' as reviews,
   avg(pr.rating) as avg_rating
from public.products
left join public.product_reviews as pr using (product_id)
group by product_id;