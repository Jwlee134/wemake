import client from "~/supa-client";

export async function getJobs({
  limit,
  type,
  location,
  salary,
}: {
  limit: number;
  type?: string;
  location?: string;
  salary?: string;
}) {
  const baseQuery = client
    .from("jobs")
    .select(
      `
        job_id,
        position,
        overview,
        company_name,
        company_logo,
        company_location,
        job_type,
        location,
        salary_range,
        created_at
        `
    )
    .limit(limit);

  if (type) {
    baseQuery.eq("job_type", type);
  }

  if (location) {
    baseQuery.eq("location", location);
  }

  if (salary) {
    baseQuery.eq("salary_range", salary);
  }

  const { data, error } = await baseQuery;

  if (error) throw new Error(error.message);

  return data;
}
