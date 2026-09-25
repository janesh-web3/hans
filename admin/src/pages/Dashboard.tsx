import { useQuery } from "@tanstack/react-query";
import { Building2, CalendarDays, Inbox } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import api from "@/lib/api";

interface CountResponse { pagination?: { total: number }; data?: unknown[] }

export default function Dashboard() {
  const hotels = useQuery({ queryKey: ["dashboard-hotels"], queryFn: async () => (await api.get<CountResponse>("/hotels?limit=1")).data.pagination?.total ?? 0 });
  const events = useQuery({ queryKey: ["dashboard-events"], queryFn: async () => (await api.get<CountResponse>("/events?limit=1")).data.pagination?.total ?? 0 });
  const inquiries = useQuery({ queryKey: ["dashboard-inquiries"], queryFn: async () => (await api.get<CountResponse>("/contact/submissions?limit=1")).data.pagination?.total ?? 0 });
  const stats = [
    { label: "Member Hotels", query: hotels, icon: Building2 },
    { label: "Events", query: events, icon: CalendarDays },
    { label: "Contact Inquiries", query: inquiries, icon: Inbox },
  ];
  return <div className="space-y-6">
    <div><h2 className="text-xl font-bold text-surface-900 dark:text-white">Dashboard</h2><p className="mt-1 text-sm text-surface-500 dark:text-dark-400">Live totals from your site content and inquiry inbox.</p></div>
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {stats.map(({ label, query, icon: Icon }) => <Card key={label}><CardHeader className="flex flex-row items-center justify-between pb-2"><CardTitle className="text-sm font-medium text-surface-500 dark:text-dark-400">{label}</CardTitle><Icon className="text-primary-700 dark:text-primary-400" size={18} /></CardHeader><CardContent><p className="text-2xl font-bold text-surface-900 dark:text-white">{query.isLoading ? "—" : query.isError ? "Unavailable" : query.data}</p></CardContent></Card>)}
    </div>
  </div>;
}
