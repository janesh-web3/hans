import { useEffect } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { ArrowLeft, Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useCreateHotel, useHotel, useUpdateHotel } from "@/hooks/useHotels";
import { SUDURPASHCHIM_DISTRICTS } from "@/constants/districts";
import { HOTEL_CATEGORIES } from "@/constants/hotelCategories";
import { AlertCircle } from "lucide-react";

const hotelFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  district: z.enum(SUDURPASHCHIM_DISTRICTS, { message: "Select a district" }),
  category: z.enum(HOTEL_CATEGORIES, { message: "Select a category" }),
  lat: z.coerce.number().min(-90, "Invalid latitude").max(90, "Invalid latitude"),
  lng: z.coerce.number().min(-180, "Invalid longitude").max(180, "Invalid longitude"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  phone: z.string().min(5, "Phone is required"),
  email: z.string().email("Enter a valid email"),
  address: z.string().min(3, "Address is required"),
  websiteUrl: z.union([z.string().url("Enter a valid URL"), z.literal("")]).optional(),
  amenities: z.string().optional(),
  images: z.array(z.object({ url: z.string().url("Enter a valid image URL") })),
  isActive: z.boolean(),
});

type HotelFormValues = z.infer<typeof hotelFormSchema>;

const emptyDefaults: HotelFormValues = {
  name: "",
  district: SUDURPASHCHIM_DISTRICTS[0],
  category: HOTEL_CATEGORIES[0],
  lat: 28.9,
  lng: 80.5,
  description: "",
  phone: "",
  email: "",
  address: "",
  websiteUrl: "",
  amenities: "",
  images: [{ url: "" }],
  isActive: true,
};

export default function HotelFormPage() {
  const { id } = useParams<{ id: string }>();
  const isEdit = Boolean(id);
  const navigate = useNavigate();

  const { data: existingHotel, isLoading: isLoadingHotel, isError: loadError } = useHotel(id);
  const createHotel = useCreateHotel();
  const updateHotel = useUpdateHotel(id ?? "");
  const isSaving = createHotel.isPending || updateHotel.isPending;

  const form = useForm<HotelFormValues>({
    resolver: zodResolver(hotelFormSchema),
    defaultValues: emptyDefaults,
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "images",
  });

  useEffect(() => {
    if (!existingHotel) return;
    form.reset({
      name: existingHotel.name,
      district: existingHotel.district,
      category: existingHotel.category,
      lat: existingHotel.coordinates.lat,
      lng: existingHotel.coordinates.lng,
      description: existingHotel.description,
      phone: existingHotel.contactInfo.phone,
      email: existingHotel.contactInfo.email,
      address: existingHotel.contactInfo.address,
      websiteUrl: existingHotel.websiteUrl ?? "",
      amenities: existingHotel.amenities.join(", "),
      images: existingHotel.images.length > 0 ? existingHotel.images.map((url) => ({ url })) : [{ url: "" }],
      isActive: existingHotel.isActive,
    });
  }, [existingHotel, form]);

  function onSubmit(values: HotelFormValues) {
    const payload = {
      name: values.name,
      district: values.district,
      category: values.category,
      coordinates: { lat: values.lat, lng: values.lng },
      description: values.description,
      contactInfo: { phone: values.phone, email: values.email, address: values.address },
      websiteUrl: values.websiteUrl || undefined,
      amenities: values.amenities
        ? values.amenities.split(",").map((a) => a.trim()).filter(Boolean)
        : [],
      images: values.images.map((i) => i.url).filter(Boolean),
      isActive: values.isActive,
    };

    const mutation = isEdit ? updateHotel : createHotel;
    mutation.mutate(payload, {
      onSuccess: () => {
        toast.success(isEdit ? "Hotel updated." : "Hotel created.");
        navigate("/hotels");
      },
      onError: (err) => {
        toast.error(err instanceof Error ? err.message : "Failed to save hotel.");
      },
    });
  }

  return (
    <div className="max-w-3xl space-y-6">
      <Link to="/hotels" className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary-700 dark:text-primary-400 hover:underline">
        <ArrowLeft size={14} /> Back to Hotels
      </Link>

      <div>
        <h2 className="text-xl font-bold text-surface-900 dark:text-white">
          {isEdit ? "Edit Hotel" : "Add Hotel"}
        </h2>
        <p className="text-sm text-surface-500 dark:text-dark-400 mt-1">
          {isEdit ? "Update this hotel's listing details." : "Register a new member hotel in the directory."}
        </p>
      </div>

      {isEdit && isLoadingHotel && (
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
          <AlertTitle>Couldn't load this hotel</AlertTitle>
          <AlertDescription>It may have been deleted, or something went wrong.</AlertDescription>
        </Alert>
      )}

      {(!isEdit || existingHotel) && (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <Card>
              <CardContent className="p-6 space-y-5">
                <h3 className="text-sm font-bold text-surface-900 dark:text-white uppercase tracking-widest">
                  Basic Information
                </h3>

                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Hotel Name</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g. Hotel Siddhartha" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid sm:grid-cols-2 gap-5">
                  <FormField
                    control={form.control}
                    name="district"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>District</FormLabel>
                        <Select onValueChange={field.onChange} value={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select district" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {SUDURPASHCHIM_DISTRICTS.map((d) => (
                              <SelectItem key={d} value={d}>
                                {d}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="category"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Category</FormLabel>
                        <Select onValueChange={field.onChange} value={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select category" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {HOTEL_CATEGORIES.map((c) => (
                              <SelectItem key={c} value={c}>
                                {c}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Textarea rows={4} placeholder="Describe the hotel…" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="amenities"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Amenities</FormLabel>
                      <FormControl>
                        <Input placeholder="WiFi, Restaurant, Parking (comma-separated)" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="isActive"
                  render={({ field }) => (
                    <FormItem className="flex items-center justify-between rounded-lg border border-surface-200 dark:border-dark-700 px-4 py-3">
                      <div>
                        <FormLabel>Active Listing</FormLabel>
                        <p className="text-xs text-surface-500 dark:text-dark-400 mt-0.5">
                          Visible on the public hotel directory.
                        </p>
                      </div>
                      <FormControl>
                        <Switch checked={field.value} onCheckedChange={field.onChange} />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6 space-y-5">
                <h3 className="text-sm font-bold text-surface-900 dark:text-white uppercase tracking-widest">
                  Location
                </h3>
                <div className="grid sm:grid-cols-2 gap-5">
                  <FormField
                    control={form.control}
                    name="lat"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Latitude</FormLabel>
                        <FormControl>
                          <Input type="number" step="any" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="lng"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Longitude</FormLabel>
                        <FormControl>
                          <Input type="number" step="any" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6 space-y-5">
                <h3 className="text-sm font-bold text-surface-900 dark:text-white uppercase tracking-widest">
                  Contact Information
                </h3>
                <div className="grid sm:grid-cols-2 gap-5">
                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Phone</FormLabel>
                        <FormControl>
                          <Input placeholder="+977-091-000000" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input type="email" placeholder="hotel@example.com" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <FormField
                  control={form.control}
                  name="address"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Address</FormLabel>
                      <FormControl>
                        <Input placeholder="Dhangadhi-4, Kailali" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="websiteUrl"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Website (optional)</FormLabel>
                      <FormControl>
                        <Input placeholder="https://…" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-bold text-surface-900 dark:text-white uppercase tracking-widest">
                    Image URLs
                  </h3>
                  <Button type="button" variant="outline" size="sm" onClick={() => append({ url: "" })}>
                    <Plus size={14} /> Add Image
                  </Button>
                </div>

                {fields.map((field, index) => (
                  <div key={field.id} className="flex items-start gap-2">
                    <FormField
                      control={form.control}
                      name={`images.${index}.url`}
                      render={({ field }) => (
                        <FormItem className="flex-1">
                          <FormControl>
                            <Input placeholder="https://images.example.com/photo.jpg" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <Button
                      type="button"
                      variant="outline"
                      size="icon"
                      className="flex-shrink-0 mt-0.5"
                      onClick={() => remove(index)}
                      disabled={fields.length === 1}
                    >
                      <Trash2 size={14} />
                    </Button>
                  </div>
                ))}
              </CardContent>
            </Card>

            <div className="flex items-center gap-3">
              <Button type="submit" disabled={isSaving}>
                {isSaving ? "Saving…" : isEdit ? "Save Changes" : "Create Hotel"}
              </Button>
              <Button type="button" variant="outline" onClick={() => navigate("/hotels")} disabled={isSaving}>
                Cancel
              </Button>
            </div>
          </form>
        </Form>
      )}
    </div>
  );
}
