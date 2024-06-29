import mongoose, { Document, Model, Schema } from "mongoose";

export interface IMedia extends Document {
  filename: string;
  url: string;
  createdAt: Date;
  updatedAt: Date;
}

const MediaSchema: Schema = new Schema({
  filename: {
    type: String,
    required: true,
    trim: true,
  },
  url: {
    type: String,
    required: true,
    trim: true,
  },
}, { timestamps: true });

const Media: Model<IMedia> =
  mongoose.models?.Media || mongoose.model<IMedia>("Media", MediaSchema);

export default Media;
