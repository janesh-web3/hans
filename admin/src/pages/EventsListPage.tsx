import { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import type { ColumnDef } from "@tanstack/react-table";
import { Plus, Pencil, Trash2, CalendarDays, AlertCircle, Link2 } from "lucide-react";
import { DataTable } from "@/components/DataTable";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useDeleteEvent, useEvents } from "@/hooks/useEvents";
import type { ApiEvent } from "@/types/event";

const PAGE_SIZE = 10;

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

export default function EventsListPage() {
  const [page, setPage] = useState(1);
  const [pendingDelete, setPendingDelete] = useState<ApiEvent | null>(null);

  const { data, isLoading, isError, error, refetch } = useEvents({ page, limit: PAGE_SIZE });
  const deleteEvent = useDeleteEvent();

  const events = data?.data ?? [];
  const pagination = data?.pagination;

  function confirmDelete() {
    if (!pendingDelete) return;
    const event = pendingDelete;
    deleteEvent.mutate(event._id, {
      onSuccess: () => {
        toast.success(`${event.titleEn} was deleted.`);
        setPendingDelete(null);
      },
      onError: (err) => {
        toast.error(err instanceof Error ? err.message : "Failed to delete event.");
      },
    });
  }

  const columns: ColumnDef<ApiEvent>[] = [
    {
      accessorKey: "titleEn",
      header: "Title",
      cell: ({ row }) => (
        <div>
          <p className="font-semibold text-surface-900 dark:text-white text-sm">{row.original.titleEn}</p>
          <p className="text-xs text-surface-400 dark:text-dark-500">{row.original.titleNp}</p>
        </div>
      ),
    },
    {
      id: "dates",
      header: "Dates",
      cell: ({ row }) => (
        <span className="text-sm text-surface-600 dark:text-dark-300">
          {formatDate(row.original.startDate)} – {formatDate(row.original.endDate)}
        </span>
      ),
    },
    {
      accessorKey: "location",
      header: "Location",
      cell: ({ row }) => <span className="text-sm text-surface-600 dark:text-dark-300">{row.original.location}</span>,
    },
    {
      id: "registration",
      header: "Registration",
      cell: ({ row }) =>
        row.original.registrationLink ? (
          <a
            href={row.original.registrationLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-xs font-semibold text-primary-700 dark:text-primary-400 hover:underline"
          >
            <Link2 size={12} /> Link
          </a>
        ) : (
          <Badge variant="outline">None</Badge>
        ),
    },
    {
      id: "actions",
      header: "",
      cell: ({ row }) => (
        <div className="flex items-center justify-end gap-2">
          <Button asChild variant="outline" size="icon" title="Edit">
            <Link to={`/events/${row.original._id}/edit`}>
              <Pencil size={14} />
            </Link>
          </Button>
          <Button
            variant="outline"
            size="icon"
            title="Delete"
            className="hover:bg-destructive hover:text-destructive-foreground hover:border-destructive"
            onClick={() => setPendingDelete(row.original)}
          >
            <Trash2 size={14} />
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-surface-900 dark:text-white">Events</h2>
          <p className="text-sm text-surface-500 dark:text-dark-400 mt-1">
            Manage upcoming association events and registrations.
          </p>
        </div>
        <Button asChild>
          <Link to="/events/new">
            <Plus size={16} /> Add Event
          </Link>
        </Button>
      </div>

      {isError && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Couldn't load events</AlertTitle>
          <AlertDescription className="flex items-center justify-between gap-4">
            <span>{error instanceof Error ? error.message : "Something went wrong."}</span>
            <Button size="sm" variant="outline" onClick={() => refetch()}>
              Retry
            </Button>
          </AlertDescription>
        </Alert>
      )}

      {!isError && events.length === 0 && !isLoading ? (
        <div className="rounded-lg border border-surface-200 dark:border-dark-800 bg-white dark:bg-dark-900 py-16 flex flex-col items-center text-center">
          <CalendarDays className="text-surface-300 dark:text-dark-700 mb-3" size={32} />
          <p className="text-surface-600 dark:text-dark-300 font-medium text-sm">No events yet</p>
          <p className="text-surface-400 dark:text-dark-500 text-xs mt-1">Create the first association event.</p>
        </div>
      ) : (
        !isError && (
          <DataTable
            columns={columns}
            data={events}
            isLoading={isLoading}
            page={page}
            pageCount={pagination?.totalPages ?? 1}
            onPageChange={setPage}
          />
        )
      )}

      <AlertDialog open={Boolean(pendingDelete)} onOpenChange={(open) => !open && setPendingDelete(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete "{pendingDelete?.titleEn}"?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently remove this event. This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={deleteEvent.isPending}>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={confirmDelete}
              disabled={deleteEvent.isPending}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              {deleteEvent.isPending ? "Deleting…" : "Delete"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
