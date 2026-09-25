import { Document, Schema, model } from "mongoose";
import { SUDURPASHCHIM_DISTRICTS } from "../constants/districts";

export type ContactStatus = "new" | "in_progress" | "resolved";

export interface IContactSubmission extends Document {
  name: string;
  email: string;
  phone?: string;
  district?: string;
  hotelName?: string;
  reason: string;
  message: string;
  status: ContactStatus;
  createdAt: Date;
  updatedAt: Date;
}

const contactSubmissionSchema = new Schema<IContactSubmission>(
  {
    name: { type: String, required: true, trim: true, maxlength: 120 },
    email: { type: String, required: true, trim: true, lowercase: true, maxlength: 254 },
    phone: { type: String, trim: true, maxlength: 40 },
    district: { type: String, enum: [...SUDURPASHCHIM_DISTRICTS, ""] },
    hotelName: { type: String, trim: true, maxlength: 160 },
    reason: { type: String, required: true, trim: true, maxlength: 120 },
    message: { type: String, required: true, trim: true, maxlength: 5000 },
    status: { type: String, enum: ["new", "in_progress", "resolved"], default: "new", index: true },
  },
  { timestamps: true }
);

contactSubmissionSchema.index({ createdAt: -1 });

export default model<IContactSubmission>("ContactSubmission", contactSubmissionSchema);
