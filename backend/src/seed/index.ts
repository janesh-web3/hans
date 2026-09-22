import dotenv from "dotenv";

dotenv.config();

import mongoose from "mongoose";
import Event from "../models/Event";
import Hotel from "../models/Hotel";
import { SEED_EVENTS } from "./events";
import { SEED_HOTELS } from "./hotels";

/**
 * Seeds the database with sample hotels and events for development and demos.
 *
 *   npm run seed            upsert the sample records, leaving anything else alone
 *   npm run seed -- --fresh DELETE every hotel and event first, then insert
 *
 * The default path is deliberately non-destructive: each record is matched on a
 * natural key (hotel name, event English title) and updated in place, so the
 * script is safe to re-run after editing the data files and will never create
 * duplicates. Records you added by hand through the admin panel survive.
 *
 * `--fresh` is the opt-in escape hatch for a clean slate. It drops all hotel
 * and event documents, including any you created yourself, so it prompts for
 * confirmation unless `--yes` is also passed.
 */

const args = process.argv.slice(2);
const fresh = args.includes("--fresh");
const assumeYes = args.includes("--yes") || args.includes("-y");

interface Tally {
  created: number;
  updated: number;
}

const confirmFresh = async (hotels: number, events: number): Promise<boolean> => {
  if (assumeYes) return true;
  if (!process.stdin.isTTY) {
    console.error(
      "\n--fresh would delete existing data but stdin is not a terminal, so it cannot ask.\n" +
        "Re-run with --yes to confirm: npm run seed -- --fresh --yes\n"
    );
    return false;
  }

  process.stdout.write(
    `\n--fresh will DELETE ${hotels} hotel(s) and ${events} event(s) from the "${mongoose.connection.name}" database.\n` +
      "This cannot be undone. Type 'yes' to continue: "
  );

  return new Promise<boolean>((resolve) => {
    process.stdin.setEncoding("utf8");
    process.stdin.once("data", (chunk: string) => {
      process.stdin.pause();
      resolve(chunk.trim().toLowerCase() === "yes");
    });
  });
};

const seed = async (): Promise<void> => {
  const uri = process.env.MONGODB_URI;
  if (!uri) throw new Error("MONGODB_URI is not defined in environment variables");

  await mongoose.connect(uri);
  console.log(`Connected to "${mongoose.connection.name}" at ${mongoose.connection.host}`);

  const [hotelsBefore, eventsBefore] = await Promise.all([
    Hotel.countDocuments(),
    Event.countDocuments(),
  ]);
  console.log(`Before: ${hotelsBefore} hotel(s), ${eventsBefore} event(s)`);

  if (fresh) {
    if (!(await confirmFresh(hotelsBefore, eventsBefore))) {
      console.log("Aborted — nothing was deleted.");
      await mongoose.disconnect();
      return;
    }
    const [h, e] = await Promise.all([Hotel.deleteMany({}), Event.deleteMany({})]);
    console.log(`Deleted ${h.deletedCount} hotel(s) and ${e.deletedCount} event(s)`);
  }

  const hotelTally: Tally = { created: 0, updated: 0 };
  for (const hotel of SEED_HOTELS) {
    const result = await Hotel.updateOne(
      { name: hotel.name },
      { $set: hotel },
      { upsert: true, setDefaultsOnInsert: true, runValidators: true }
    );
    if (result.upsertedCount) hotelTally.created += 1;
    else hotelTally.updated += 1;
  }

  const eventTally: Tally = { created: 0, updated: 0 };
  for (const event of SEED_EVENTS) {
    const result = await Event.updateOne(
      { titleEn: event.titleEn },
      { $set: event },
      { upsert: true, setDefaultsOnInsert: true, runValidators: true }
    );
    if (result.upsertedCount) eventTally.created += 1;
    else eventTally.updated += 1;
  }

  const [hotelsAfter, eventsAfter] = await Promise.all([
    Hotel.countDocuments(),
    Event.countDocuments(),
  ]);

  // Per-district and per-category counts are the quickest way to confirm the
  // directory filters have something to return for every option.
  const byDistrict = await Hotel.aggregate<{ _id: string; count: number }>([
    { $group: { _id: "$district", count: { $sum: 1 } } },
    { $sort: { _id: 1 } },
  ]);
  const byCategory = await Hotel.aggregate<{ _id: string; count: number }>([
    { $group: { _id: "$category", count: { $sum: 1 } } },
    { $sort: { _id: 1 } },
  ]);

  console.log(
    `\nHotels: ${hotelTally.created} created, ${hotelTally.updated} updated -> ${hotelsAfter} total`
  );
  console.log(
    `Events: ${eventTally.created} created, ${eventTally.updated} updated -> ${eventsAfter} total`
  );
  console.log(`\nBy district:  ${byDistrict.map((d) => `${d._id} ${d.count}`).join(" | ")}`);
  console.log(`By category:  ${byCategory.map((c) => `${c._id} ${c.count}`).join(" | ")}`);
  console.log("\nSeed complete.");

  await mongoose.disconnect();
};

seed().catch(async (error: unknown) => {
  console.error("Seed failed:", error instanceof Error ? error.message : error);
  await mongoose.disconnect().catch(() => undefined);
  process.exit(1);
});
