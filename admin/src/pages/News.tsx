import { Newspaper, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function News() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-surface-900 dark:text-white">News</h2>
          <p className="text-sm text-surface-500 dark:text-dark-400 mt-1">
            Publish announcements and updates for the public site.
          </p>
        </div>
        <Button>
          <Plus size={16} /> Add News Post
        </Button>
      </div>

      <Card>
        <CardContent className="py-16 flex flex-col items-center text-center">
          <Newspaper className="text-surface-300 dark:text-dark-700 mb-3" size={32} />
          <p className="text-surface-600 dark:text-dark-300 font-medium text-sm">
            News data table coming soon
          </p>
          <p className="text-surface-400 dark:text-dark-500 text-xs mt-1">
            No backend model exists for News yet — create it alongside Hotel/Event when ready.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
