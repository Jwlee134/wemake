create or replace view gpt_ideas_view as
select
    gpt_ideas.idea_id,
    gpt_ideas.idea,
    gpt_ideas.views,
    case when gpt_ideas.claimed_at is not null then true else false end as is_claimed,
    count(gpt_ideas_likes.profile_id) as likes,
    gpt_ideas.created_at
from public.gpt_ideas
left join public.gpt_ideas_likes using (idea_id) group by gpt_ideas.idea_id;