import { Database } from "@/lib/supabase";
import {
  EmployeesMember,
  TodayEmployeesCommute,
} from "@/app/admin/adminDetail";
import { timeZoneCalculate } from "@/utils/cal/timeCode";

import type { SupabaseClient } from "@supabase/supabase-js";

type Props = {
  supabase: SupabaseClient<Database>;
};

export default async function AdminMain({ supabase, ...props }: Props) {
  const todayDate = timeZoneCalculate(new Date().toJSON());
  return (
    <div className={"w-full px-4"}>
      <EmployeesMember supabase={supabase} />
      <TodayEmployeesCommute supabase={supabase} todayDate={todayDate} />
    </div>
  );
}
