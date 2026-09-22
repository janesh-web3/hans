import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Building2, CalendarDays, Users } from "lucide-react";

const STATS = [
  { label: "Member Hotels", value: "15", icon: Building2 },
  { label: "Upcoming Events", value: "3", icon: CalendarDays },
  { label: "Admin Users", value: "1", icon: Users },
];

export default function Dashboard() {
  return (
    <div className="space-y-6">
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {STATS.map(({ label, value, icon: Icon }) => (
          <Card key={label}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-surface-500 dark:text-dark-400">
                {label}
              </CardTitle>
              <Icon className="text-primary-700 dark:text-primary-400" size={18} />
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold text-surface-900 dark:text-white">{value}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
