import { ChartTooltip, type ChartConfig } from "~/common/components/ui/chart";
import { ChartTooltipContent } from "~/common/components/ui/chart";
import { Area, AreaChart, CartesianGrid, Line, XAxis } from "recharts";
import type { Route } from "./+types/dashboard-product-page";
import { ChartContainer } from "~/common/components/ui/chart";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "~/common/components/ui/card";
import { getLoggedInUserId } from "../queries";
import { getServerClient } from "~/supa-client";

export function meta({ matches }: Route.MetaArgs) {
  return [{ title: "Dashboard Product | wemake" }];
}

export async function loader({ request, params }: Route.LoaderArgs) {
  const { client } = getServerClient(request);
  const userId = await getLoggedInUserId(client);

  const { error: productError } = await client
    .from("products")
    .select("product_id")
    .eq("profile_id", userId)
    .eq("product_id", params.productId)
    .single();

  if (productError) {
    throw new Error(productError.message);
  }
  const { data, error } = await client.rpc("get_product_stats", {
    product_id: params.productId,
  });

  if (error) {
    throw new Error(error.message);
  }

  return { stats: data };
}

const chartConfig = {
  views: {
    label: "Page Views",
    color: "hsl(var(--primary))",
  },
  visitors: {
    label: "Visitors",
    color: "hsl(var(--chart-3))",
  },
} satisfies ChartConfig;

export default function DashboardProductPage({
  loaderData,
}: Route.ComponentProps) {
  const { stats } = loaderData;

  return (
    <div className="space-y-10">
      <h1 className="text-2xl font-semibold mb-6">Analytics</h1>
      <Card className="w-1/2">
        <CardHeader>
          <CardTitle>Performance</CardTitle>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig}>
            <AreaChart
              accessibilityLayer
              data={stats}
              margin={{ left: 12, right: 12, top: 12, bottom: 12 }}
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
                content={<ChartTooltipContent indicator="line" />}
                wrapperStyle={{ minWidth: 150 }}
              />
              <Area
                dataKey="views"
                type="natural"
                stroke="var(--color-views)"
                fill="var(--color-views)"
                strokeWidth={2}
                dot={false}
              />
              <Area
                dataKey="visitors"
                type="natural"
                stroke="var(--color-visitors)"
                fill="var(--color-visitors)"
                strokeWidth={2}
                dot={false}
              />
            </AreaChart>
          </ChartContainer>
        </CardContent>
      </Card>
    </div>
  );
}
