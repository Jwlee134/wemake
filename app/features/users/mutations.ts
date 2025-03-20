import type { SupabaseClient } from "@supabase/supabase-js";
import type { Database } from "~/supa-client";

export async function updateUser(
  client: SupabaseClient<Database>,
  userId: string,
  data: {
    name: string;
    role: string;
    bio: string;
    headline: string;
  }
) {
  const { error } = await client
    .from("profiles")
    .update({
      name: data.name,
      role: data.role as
        | "developer"
        | "designer"
        | "marketer"
        | "founder"
        | "product-manager",
      bio: data.bio,
      headline: data.headline,
    })
    .eq("profile_id", userId);

  if (error) throw new Error(error.message);
}

export async function updateUserAvatar(
  client: SupabaseClient<Database>,
  userId: string,
  avatar: string
) {
  const { error } = await client
    .from("profiles")
    .update({
      avatar: avatar,
    })
    .eq("profile_id", userId);

  if (error) throw new Error(error.message);
}

export async function markNotificationAsRead(
  client: SupabaseClient<Database>,
  { notificationId, userId }: { notificationId: string; userId: string }
) {
  const { error } = await client
    .from("notifications")
    .update({ seen: true })
    .eq("notification_id", notificationId)
    .eq("receiver_id", userId);

  if (error) throw new Error(error.message);
}

export async function sendMessage(
  client: SupabaseClient<Database>,
  {
    senderId,
    receiverId,
    message,
  }: { senderId: string; receiverId: string; message: string }
) {
  const { data, error } = await client
    .rpc("get_chat_room", {
      sender_id: senderId,
      receiver_id: receiverId,
    })
    .maybeSingle();

  if (error) throw new Error(error.message);

  if (data?.message_room_id) {
    await client.from("messages").insert({
      message_room_id: data.message_room_id,
      sender_id: senderId,
      content: message,
    });
    return data.message_room_id;
  } else {
    const { data: newMessageRoom, error: newMessageRoomError } = await client
      .from("message_rooms")
      .insert({})
      .select("message_room_id")
      .single();

    if (newMessageRoomError) throw new Error(newMessageRoomError.message);

    await client.from("message_room_members").insert([
      {
        message_room_id: newMessageRoom.message_room_id,
        profile_id: senderId,
      },
      {
        message_room_id: newMessageRoom.message_room_id,
        profile_id: receiverId,
      },
    ]);

    await client.from("messages").insert({
      message_room_id: newMessageRoom.message_room_id,
      sender_id: senderId,
      content: message,
    });

    return newMessageRoom.message_room_id;
  }
}
