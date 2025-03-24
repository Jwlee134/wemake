import {
  createBrowserClient,
  createServerClient,
  parseCookieHeader,
  serializeCookieHeader,
} from "@supabase/ssr";
import type { Database as SupabaseDatabase } from "database.types";
import type { MergeDeep, SetFieldType, SetNonNullable } from "type-fest";

export type Database = MergeDeep<
  SupabaseDatabase,
  {
    public: {
      Views: {
        community_post_list_view: {
          Row: SetFieldType<
            SetNonNullable<
              SupabaseDatabase["public"]["Views"]["community_post_list_view"]["Row"]
            >,
            "author_avatar",
            string | null
          >;
        };
        gpt_ideas_view: {
          Row: SetNonNullable<
            SupabaseDatabase["public"]["Views"]["gpt_ideas_view"]["Row"]
          >;
        };
        product_overview_view: {
          Row: SetNonNullable<
            SupabaseDatabase["public"]["Views"]["product_overview_view"]["Row"]
          >;
        };
        community_post_detail_view: {
          Row: SetNonNullable<
            SupabaseDatabase["public"]["Views"]["community_post_detail_view"]["Row"]
          >;
        };
        messages_view: {
          Row: SetNonNullable<
            SupabaseDatabase["public"]["Views"]["messages_view"]["Row"]
          >;
        };
      };
    };
  }
>;

// https://supabase.com/docs/guides/auth/server-side/creating-a-client?queryGroups=package-manager&package-manager=npm&queryGroups=environment&environment=remix-loader&queryGroups=framework&framework=remix#create-a-client
export const browserClient = createBrowserClient<Database>(
  import.meta.env.VITE_SUPABASE_URL!,
  import.meta.env.VITE_SUPABASE_ANON_KEY!
);

export function getServerClient(request: Request) {
  const headers = new Headers();

  const client = createServerClient<Database>(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return parseCookieHeader(request.headers.get("Cookie") ?? "");
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) =>
            headers.append(
              "Set-Cookie",
              serializeCookieHeader(name, value, options)
            )
          );
        },
      },
    }
  );

  return { client, headers };
}

/* 

Authentication Process

Browser

Client Cookies -> Supabase Server -> Who is the user?

Server

Browser sends Cookies -> loader() receives cookies -> Supabase client(cookies) -> Supabase Server -> Who is the user?

*/
