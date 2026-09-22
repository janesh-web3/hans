import { Document, Model, Schema, model } from "mongoose";

export interface IEvent extends Document {
  titleEn: string;
  titleNp: string;
  descriptionEn: string;
  descriptionNp: string;
  startDate: Date;
  endDate: Date;
  location: string;
  registrationLink?: string;
  createdAt: Date;
  updatedAt: Date;
}

const eventSchema = new Schema<IEvent>(
  {
    titleEn: {
      type: String,
      required: true,
      trim: true,
    },
    titleNp: {
      type: String,
      required: true,
      trim: true,
    },
    descriptionEn: {
      type: String,
      required: true,
    },
    descriptionNp: {
      type: String,
      required: true,
    },
    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    registrationLink: {
      type: String,
    },
  },
  { timestamps: true }
);

const Event: Model<IEvent> = model<IEvent>("Event", eventSchema);

export default Event;
