import { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import type { ColumnDef } from "@tanstack/react-table";
import { Plus, Pencil, Trash2, Building2, AlertCircle } from "lucide-react";
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
import { useDeleteHotel, useHotels } from "@/hooks/useHotels";
import type { ApiHotel } from "@/types/hotel";

const PAGE_SIZE = 10;

export default function HotelsListPage() {
  const [page, setPage] = useState(1);
  const [pendingDelete, setPendingDelete] = useState<ApiHotel | null>(null);

  const { data, isLoading, isError, error, refetch } = useHotels({ page, limit: PAGE_SIZE });
  const deleteHotel = useDeleteHotel();

  const hotels = data?.data ?? [];
  const pagination = data?.pagination;

  function confirmDelete() {
    if (!pendingDelete) return;
    const hotel = pendingDelete;
    deleteHotel.mutate(hotel._id, {
      onSuccess: () => {
        toast.success(`${hotel.name} was deleted.`);
        setPendingDelete(null);
      },
      onError: (err) => {
        toast.error(err instanceof Error ? err.message : "Failed to delete hotel.");
      },
    });
  }

  const columns: ColumnDef<ApiHotel>[] = [
    {
      id: "image",
      header: "",
      cell: ({ row }) => {
        const cover = row.original.images?.[0];
        return (
          <div className="w-12 h-12 rounded-md overflow-hidden bg-surface-100 dark:bg-dark-800 flex-shrink-0">
            {cover ? (
              <img src={cover} alt={row.original.name} className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <Building2 size={16} className="text-surface-300 dark:text-dark-600" />
              </div>
            )}
          </div>
        );
      },
    },
    {
      accessorKey: "name",
      header: "Name",
      cell: ({ row }) => (
        <div>
          <p className="font-semibold text-surface-900 dark:text-white text-sm">{row.original.name}</p>
          <p className="text-xs text-surface-400 dark:text-dark-500 truncate max-w-[220px]">
            {row.original.contactInfo.address}
          </p>
        </div>
      ),
    },
    {
      accessorKey: "district",
      header: "District",
      cell: ({ row }) => <span className="text-sm text-surface-600 dark:text-dark-300">{row.original.district}</span>,
    },
    {
      accessorKey: "category",
      header: "Category",
      cell: ({ row }) => <Badge variant="secondary">{row.original.category}</Badge>,
    },
    {
      accessorKey: "isActive",
      header: "Status",
      cell: ({ row }) =>
        row.original.isActive ? (
          <Badge className="bg-primary-700 hover:bg-primary-700">Active</Badge>
        ) : (
          <Badge variant="outline">Inactive</Badge>
        ),
    },
    {
      id: "actions",
      header: "",
      cell: ({ row }) => (
        <div className="flex items-center justify-end gap-2">
          <Button asChild variant="outline" size="icon" title="Edit">
            <Link to={`/hotels/${row.original._id}/edit`}>
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
          <h2 className="text-xl font-bold text-surface-900 dark:text-white">Hotels</h2>
          <p className="text-sm text-surface-500 dark:text-dark-400 mt-1">
            Manage member hotel listings across all 8 districts.
          </p>
        </div>
        <Button asChild>
          <Link to="/hotels/new">
            <Plus size={16} /> Add Hotel
          </Link>
        </Button>
      </div>

      {isError && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Couldn't load hotels</AlertTitle>
          <AlertDescription className="flex items-center justify-between gap-4">
            <span>{error instanceof Error ? error.message : "Something went wrong."}</span>
            <Button size="sm" variant="outline" onClick={() => refetch()}>
              Retry
            </Button>
          </AlertDescription>
        </Alert>
      )}

      {!isError && (
        <DataTable
          columns={columns}
          data={hotels}
          isLoading={isLoading}
          page={page}
          pageCount={pagination?.totalPages ?? 1}
          onPageChange={setPage}
        />
      )}

      <AlertDialog open={Boolean(pendingDelete)} onOpenChange={(open) => !open && setPendingDelete(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete "{pendingDelete?.name}"?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently remove this hotel from the directory. This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={deleteHotel.isPending}>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={confirmDelete}
              disabled={deleteHotel.isPending}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              {deleteHotel.isPending ? "Deleting…" : "Delete"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
