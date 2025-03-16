import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "~/common/components/ui/card";
import type { Route } from "./+types/dashboard-page";
import { Line } from "recharts";
import {
  ChartTooltipContent,
  type ChartConfig,
} from "~/common/components/ui/chart";
import { ChartTooltip } from "~/common/components/ui/chart";
import { XAxis } from "recharts";
import { CartesianGrid } from "recharts";
import { ChartContainer } from "~/common/components/ui/chart";
import { LineChart } from "recharts";
import { getLoggedInUserId } from "../queries";
import { getServerClient } from "~/supa-client";

export function meta({ matches }: Route.MetaArgs) {
  return [{ title: "Dashboard" }];
}

export async function loader({ request }: Route.LoaderArgs) {
  const { client } = getServerClient(request);
  const userId = await getLoggedInUserId(client);

  const { data, error } = await client.rpc("get_dashboard_stats", {
    user_id: userId,
  });

  if (error) {
    throw new Error(error.message);
  }

  return { stats: data };
}

const chartData = [
  { month: "January", views: 186 },
  { month: "February", views: 305 },
  { month: "March", views: 237 },
  { month: "April", views: 73 },
  { month: "May", views: 209 },
  { month: "June", views: 214 },
];
const chartConfig = {
  views: {
    label: "👀",
    color: "hsl(var(--primary))",
  },
} satisfies ChartConfig;

export default function DashboardPage({ loaderData }: Route.ComponentProps) {
  const { stats } = loaderData;

  return (
    <div className="space-y-10">
      <h1 className="text-2xl font-semibold mb-6">Dashboard</h1>
      <Card className="w-1/2">
        <CardHeader>
          <CardTitle>Profile Views</CardTitle>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig}>
            <LineChart
              accessibilityLayer
              data={stats}
              margin={{
                left: 12,
                right: 12,
                top: 12,
              }}
            >
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="month"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                padding={{ left: 16, right: 16 }}
              />
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent hideLabel />}
              />
              <Line
                dataKey="views"
                type="natural"
                stroke="var(--color-views)"
                strokeWidth={2}
                dot={false}
              />
            </LineChart>
          </ChartContainer>
        </CardContent>
      </Card>
    </div>
  );
}
