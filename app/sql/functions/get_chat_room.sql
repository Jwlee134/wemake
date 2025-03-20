create function public.get_chat_room(sender_id uuid, receiver_id uuid)
returns table(message_room_id bigint) 
as $$
begin
    return query
    select m1.message_room_id 
    from message_room_members m1 
    join message_room_members m2
      on m1.message_room_id = m2.message_room_id
    where m1.profile_id = sender_id and m2.profile_id = receiver_id;
end;
$$ language plpgsql;