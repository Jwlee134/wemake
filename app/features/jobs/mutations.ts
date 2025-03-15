import type { SupabaseClient } from "@supabase/supabase-js";
import type { Database } from "~/supa-client";
import type { JobSubmitFormData } from "./pages/job-submit-page";

export async function createJob(
  client: SupabaseClient<Database>,
  formData: JobSubmitFormData
) {
  const { data, error } = await client
    .from("jobs")
    .insert({
      position: formData.position,
      overview: formData.overview,
      responsibilities: formData.responsibilities,
      qualifications: formData.qualifications,
      benefits: formData.benefits,
      skills: formData.skills,
      company_name: formData.companyName,
      company_location: formData.companyLocation,
      company_logo: formData.companyLogoUrl,
      apply_url: formData.applyUrl,
      job_type: formData.jobType as
        | "full-time"
        | "part-time"
        | "internship"
        | "freelance",
      location: formData.jobLocation as "on-site" | "remote" | "hybrid",
      salary_range: formData.salaryRange,
    })
    .select()
    .single();

  if (error) throw error;

  return data;
}
