-- Follow user
create function public.notify_user_follow()
returns trigger
language plpgsql
as $$
begin
    insert into public.notifications (type, sender_id, receiver_id)
    values ('follow', new.follower_id, new.following_id);
    return new;
end;
$$;

create trigger notify_user_follow_trigger
after insert on public.follows
for each row
execute function public.notify_user_follow();

--Review product
create function public.notify_product_review()
returns trigger
language plpgsql
as $$
declare
    product_owner_id uuid;
begin
    select profile_id into product_owner_id
    from public.products
    where product_id = new.product_id;
    
    insert into public.notifications (type, sender_id, receiver_id, product_id)
    values ('review', new.profile_id, product_owner_id, new.product_id);
    return new;
end;
$$;

create trigger notify_product_review_trigger
after insert on public.product_reviews
for each row
execute function public.notify_product_review();

-- Reply to post
create function public.notify_post_reply()
returns trigger
language plpgsql
as $$
declare
    post_owner_id uuid;
begin
    select profile_id into post_owner_id
    from public.posts
    where post_id = new.post_id;
    
    insert into public.notifications (type, sender_id, receiver_id, post_id)
    values ('reply', new.profile_id, post_owner_id, new.post_id);
    return new;
end;
$$;

create trigger notify_post_reply_trigger
after insert on public.post_replies
for each row
execute function public.notify_post_reply();


drop function public.notify_product_review() cascade;
drop function public.notify_post_reply() cascade;