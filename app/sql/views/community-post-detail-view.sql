create or replace view community_post_detail_view as
select
    posts.post_id,
    posts.title,
    posts.content,
    posts.upvotes,
    posts.created_at,
    topics.topic_id as topic_id,
    topics.name as topic_name,
    topics.slug as topic_slug,
    profiles.profile_id as author_id,
    profiles.name as author_name,
    profiles.avatar as author_avatar,
    profiles.role as author_role,
    profiles.created_at as author_created_at,
    count(replies.post_id) as replies_count,
    (select count(*) from products where products.profile_id = profiles.profile_id) as products_count,
    (select exists 
        (select 1 from public.post_upvotes where post_upvotes.post_id = posts.post_id and post_upvotes.profile_id = auth.uid())
    ) as is_upvoted
from public.posts
inner join public.post_topics as topics using (topic_id)
inner join public.profiles as profiles using (profile_id)
left join public.post_replies as replies using (post_id)
group by posts.post_id, topics.topic_id, profiles.profile_id;