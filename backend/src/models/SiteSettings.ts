import { Schema, model } from "mongoose";

const siteSettingsSchema = new Schema(
  {
    key: { type: String, required: true, unique: true, default: "public" },
    settings: { type: Schema.Types.Mixed, required: true, default: {} },
  },
  { timestamps: true }
);

export default model("SiteSettings", siteSettingsSchema);
