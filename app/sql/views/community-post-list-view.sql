create or replace view community_post_list_view as
select
    posts.post_id,
    posts.title,
    posts.created_at,
    post_topics.name as topic,
    profiles.name as author_name,
    profiles.avatar as author_avatar,
    profiles.username as author_username,
    posts.upvotes
from posts
inner join post_topics using (topic_id)
inner join profiles using (profile_id);

select * from community_post_list_view;