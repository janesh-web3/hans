import { useEffect } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { ArrowLeft, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useCreateEvent, useEvent, useUpdateEvent } from "@/hooks/useEvents";

const eventFormSchema = z
  .object({
    titleEn: z.string().min(2, "English title is required"),
    titleNp: z.string().min(2, "Nepali title is required"),
    descriptionEn: z.string().min(10, "English description must be at least 10 characters"),
    descriptionNp: z.string().min(10, "Nepali description must be at least 10 characters"),
    startDate: z.string().min(1, "Start date is required"),
    endDate: z.string().min(1, "End date is required"),
    location: z.string().min(2, "Location is required"),
    registrationLink: z.union([z.string().url("Enter a valid URL"), z.literal("")]).optional(),
  })
  .refine((data) => new Date(data.endDate) >= new Date(data.startDate), {
    message: "End date must be on or after the start date",
    path: ["endDate"],
  });

type EventFormValues = z.infer<typeof eventFormSchema>;

const emptyDefaults: EventFormValues = {
  titleEn: "",
  titleNp: "",
  descriptionEn: "",
  descriptionNp: "",
  startDate: "",
  endDate: "",
  location: "",
  registrationLink: "",
};

function toDateInputValue(iso: string): string {
  return iso.slice(0, 10);
}

export default function EventFormPage() {
  const { id } = useParams<{ id: string }>();
  const isEdit = Boolean(id);
  const navigate = useNavigate();

  const { data: existingEvent, isLoading: isLoadingEvent, isError: loadError } = useEvent(id);
  const createEvent = useCreateEvent();
  const updateEvent = useUpdateEvent(id ?? "");
  const isSaving = createEvent.isPending || updateEvent.isPending;

  const form = useForm<EventFormValues>({
    resolver: zodResolver(eventFormSchema),
    defaultValues: emptyDefaults,
  });

  useEffect(() => {
    if (!existingEvent) return;
    form.reset({
      titleEn: existingEvent.titleEn,
      titleNp: existingEvent.titleNp,
      descriptionEn: existingEvent.descriptionEn,
      descriptionNp: existingEvent.descriptionNp,
      startDate: toDateInputValue(existingEvent.startDate),
      endDate: toDateInputValue(existingEvent.endDate),
      location: existingEvent.location,
      registrationLink: existingEvent.registrationLink ?? "",
    });
  }, [existingEvent, form]);

  function onSubmit(values: EventFormValues) {
    const payload = {
      titleEn: values.titleEn,
      titleNp: values.titleNp,
      descriptionEn: values.descriptionEn,
      descriptionNp: values.descriptionNp,
      startDate: values.startDate,
      endDate: values.endDate,
      location: values.location,
      registrationLink: values.registrationLink || undefined,
    };

    const mutation = isEdit ? updateEvent : createEvent;
    mutation.mutate(payload, {
      onSuccess: () => {
        toast.success(isEdit ? "Event updated." : "Event created.");
        navigate("/events");
      },
      onError: (err) => {
        toast.error(err instanceof Error ? err.message : "Failed to save event.");
      },
    });
  }

  return (
    <div className="max-w-2xl space-y-6">
      <Link to="/events" className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary-700 dark:text-primary-400 hover:underline">
        <ArrowLeft size={14} /> Back to Events
      </Link>

      <div>
        <h2 className="text-xl font-bold text-surface-900 dark:text-white">
          {isEdit ? "Edit Event" : "Add Event"}
        </h2>
        <p className="text-sm text-surface-500 dark:text-dark-400 mt-1">
          {isEdit ? "Update this event's details." : "Create a new association event."}
        </p>
      </div>

      {isEdit && isLoadingEvent && (
        <Card>
          <CardContent className="p-8 space-y-4">
            <Skeleton className="h-4 w-1/3" />
            <Skeleton className="h-9 w-full" />
            <Skeleton className="h-4 w-1/3" />
            <Skeleton className="h-9 w-full" />
          </CardContent>
        </Card>
      )}

      {isEdit && loadError && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Couldn't load this event</AlertTitle>
          <AlertDescription>It may have been deleted, or something went wrong.</AlertDescription>
        </Alert>
      )}

      {(!isEdit || existingEvent) && (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <Card>
              <CardContent className="p-6 space-y-5">
                <h3 className="text-sm font-bold text-surface-900 dark:text-white uppercase tracking-widest">
                  Title
                </h3>
                <div className="grid sm:grid-cols-2 gap-5">
                  <FormField
                    control={form.control}
                    name="titleEn"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Title (English)</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g. Annual General Meeting" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="titleNp"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Title (Nepali)</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g. वार्षिक साधारण सभा" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <h3 className="text-sm font-bold text-surface-900 dark:text-white uppercase tracking-widest pt-2">
                  Description
                </h3>
                <FormField
                  control={form.control}
                  name="descriptionEn"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description (English)</FormLabel>
                      <FormControl>
                        <Textarea rows={4} placeholder="Describe the event…" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="descriptionNp"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description (Nepali)</FormLabel>
                      <FormControl>
                        <Textarea rows={4} placeholder="कार्यक्रमको विवरण…" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6 space-y-5">
                <h3 className="text-sm font-bold text-surface-900 dark:text-white uppercase tracking-widest">
                  Schedule & Location
                </h3>
                <div className="grid sm:grid-cols-2 gap-5">
                  <FormField
                    control={form.control}
                    name="startDate"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Start Date</FormLabel>
                        <FormControl>
                          <Input type="date" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="endDate"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>End Date</FormLabel>
                        <FormControl>
                          <Input type="date" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <FormField
                  control={form.control}
                  name="location"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Location</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g. Dhangadhi, Kailali" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="registrationLink"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Registration Link (optional)</FormLabel>
                      <FormControl>
                        <Input placeholder="https://…" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>

            <div className="flex items-center gap-3">
              <Button type="submit" disabled={isSaving}>
                {isSaving ? "Saving…" : isEdit ? "Save Changes" : "Create Event"}
              </Button>
              <Button type="button" variant="outline" onClick={() => navigate("/events")} disabled={isSaving}>
                Cancel
              </Button>
            </div>
          </form>
        </Form>
      )}
    </div>
  );
}
