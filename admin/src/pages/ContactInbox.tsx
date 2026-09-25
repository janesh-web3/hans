import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Inbox, Mail, MapPin, Phone, RefreshCw } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import api from "@/lib/api";

type ContactStatus = "new" | "in_progress" | "resolved";
interface Submission {
  _id: string;
  name: string;
  email: string;
  phone?: string;
  district?: string;
  hotelName?: string;
  reason: string;
  message: string;
  status: ContactStatus;
  createdAt: string;
}
interface SubmissionsResponse { success: boolean; data: Submission[]; pagination: { total: number } }

const statusLabels: Record<ContactStatus, string> = { new: "New", in_progress: "In progress", resolved: "Resolved" };
const formatDate = (value: string, detailed = false) => new Intl.DateTimeFormat(undefined, detailed
  ? { dateStyle: "medium", timeStyle: "short" }
  : { month: "short", day: "numeric", year: "numeric", hour: "2-digit", minute: "2-digit" }).format(new Date(value));

export default function ContactInbox() {
  const queryClient = useQueryClient();
  const [selected, setSelected] = useState<Submission | null>(null);
  const { data, isLoading, isError, refetch, isFetching } = useQuery({
    queryKey: ["contact-submissions"],
    queryFn: async () => (await api.get<SubmissionsResponse>("/contact/submissions", { params: { limit: 100 } })).data,
  });
  const updateStatus = useMutation({
    mutationFn: async ({ id, status }: { id: string; status: ContactStatus }) =>
      (await api.patch<{ success: boolean; data: Submission }>(`/contact/submissions/${id}`, { status })).data.data,
    onSuccess: (updated) => {
      queryClient.setQueryData<SubmissionsResponse>(["contact-submissions"], (current) => current && ({ ...current, data: current.data.map((item) => item._id === updated._id ? updated : item) }));
      setSelected(updated);
      toast.success("Inquiry status updated");
    },
    onError: () => toast.error("Could not update the inquiry status"),
  });
  const submissions = data?.data ?? [];

  return <div className="space-y-6">
    <div className="flex flex-wrap items-end justify-between gap-4"><div><h2 className="text-xl font-bold text-surface-900 dark:text-white">Contact inbox</h2><p className="mt-1 text-sm text-surface-500 dark:text-dark-400">Read and track messages sent through the public contact form.</p></div><Button variant="outline" onClick={() => refetch()} disabled={isFetching}><RefreshCw size={15} className={isFetching ? "animate-spin" : ""} /> Refresh</Button></div>
    {isLoading ? <Card><CardContent className="py-14 text-center text-sm text-surface-500">Loading contact messages…</CardContent></Card> : isError ? <Card><CardContent className="py-12 text-center"><p className="text-sm text-red-600">Could not load contact messages.</p><Button variant="outline" className="mt-4" onClick={() => refetch()}>Retry</Button></CardContent></Card> : submissions.length === 0 ? <Card><CardContent className="flex flex-col items-center py-16 text-center"><Inbox size={34} className="text-surface-300 dark:text-dark-700" /><p className="mt-4 text-sm font-medium text-surface-700 dark:text-dark-200">Your inbox is clear</p><p className="mt-1 text-xs text-surface-500">New public form submissions will appear here.</p></CardContent></Card> : <Card><CardContent className="overflow-x-auto p-0"><table className="w-full min-w-[760px] text-left text-sm"><thead className="border-b border-surface-200 bg-surface-50 text-xs uppercase tracking-wide text-surface-500 dark:border-dark-800 dark:bg-dark-900 dark:text-dark-400"><tr><th className="px-5 py-4">Sender</th><th className="px-5 py-4">Subject</th><th className="px-5 py-4">Received</th><th className="px-5 py-4">Status</th><th className="px-5 py-4">Message</th></tr></thead><tbody className="divide-y divide-surface-100 dark:divide-dark-800">{submissions.map((item) => <tr key={item._id} className="cursor-pointer hover:bg-surface-50 dark:hover:bg-dark-900/60" onClick={() => setSelected(item)}><td className="px-5 py-4"><p className="font-semibold text-surface-900 dark:text-white">{item.name}</p><p className="mt-1 text-xs text-surface-500">{item.email}</p></td><td className="px-5 py-4"><p className="font-medium text-surface-700 dark:text-dark-200">{item.reason}</p><p className="mt-1 text-xs text-surface-500">{[item.hotelName, item.district].filter(Boolean).join(" · ") || "General inquiry"}</p></td><td className="whitespace-nowrap px-5 py-4 text-xs text-surface-500">{formatDate(item.createdAt)}</td><td className="px-5 py-4" onClick={(event) => event.stopPropagation()}><select aria-label={`Status for ${item.name}`} value={item.status} onChange={(event) => updateStatus.mutate({ id: item._id, status: event.target.value as ContactStatus })} disabled={updateStatus.isPending} className="rounded-md border border-surface-200 bg-white px-2 py-1.5 text-xs text-surface-700 dark:border-dark-700 dark:bg-dark-900 dark:text-dark-200">{Object.entries(statusLabels).map(([value, label]) => <option key={value} value={value}>{label}</option>)}</select></td><td className="max-w-[220px] truncate px-5 py-4 text-xs text-surface-500">{item.message}</td></tr>)}</tbody></table><p className="border-t border-surface-100 px-5 py-3 text-xs text-surface-500 dark:border-dark-800">{data?.pagination.total ?? submissions.length} total submissions · latest 100 shown</p></CardContent></Card>}

    <Dialog open={Boolean(selected)} onOpenChange={(open) => !open && setSelected(null)}><DialogContent className="max-h-[85vh] overflow-y-auto sm:max-w-xl"><DialogHeader><DialogTitle>{selected?.reason || "Contact inquiry"}</DialogTitle></DialogHeader>{selected && <div className="space-y-5"><div><p className="font-semibold text-surface-900 dark:text-white">{selected.name}</p><p className="mt-1 text-xs text-surface-500">Received {formatDate(selected.createdAt, true)}</p></div><div className="flex flex-wrap gap-x-5 gap-y-2 text-sm"><a href={`mailto:${selected.email}`} className="inline-flex items-center gap-2 text-primary-700 hover:underline"><Mail size={15} />{selected.email}</a>{selected.phone && <a href={`tel:${selected.phone}`} className="inline-flex items-center gap-2 text-primary-700 hover:underline"><Phone size={15} />{selected.phone}</a>}</div>{(selected.hotelName || selected.district) && <p className="flex items-center gap-2 text-xs text-surface-500"><MapPin size={14} />{[selected.hotelName, selected.district].filter(Boolean).join(" · ")}</p>}<div className="whitespace-pre-wrap rounded-lg bg-surface-50 p-4 text-sm leading-6 text-surface-700 dark:bg-dark-900 dark:text-dark-200">{selected.message}</div><div className="flex items-center justify-between gap-3 border-t border-surface-200 pt-4 dark:border-dark-800"><label htmlFor="detail-status" className="text-xs font-medium text-surface-600 dark:text-dark-300">Status</label><select id="detail-status" value={selected.status} onChange={(event) => updateStatus.mutate({ id: selected._id, status: event.target.value as ContactStatus })} disabled={updateStatus.isPending} className="rounded-md border border-surface-200 bg-white px-3 py-2 text-sm dark:border-dark-700 dark:bg-dark-900">{Object.entries(statusLabels).map(([value, label]) => <option key={value} value={value}>{label}</option>)}</select></div></div>}</DialogContent></Dialog>
  </div>;
}
