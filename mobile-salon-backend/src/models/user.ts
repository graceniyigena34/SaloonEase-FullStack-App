import mongoose, { Schema, Document } from 'mongoose';

export interface IUser extends Document {
  name: string;
  firstName?: string;
  lastName?: string;
  email: string;
  phone?: string;
  password: string;
  role: 'customer' | 'owner';
  isVerified: boolean;
  otp?: string; // Used for Screen 6 (Phone/Email Verification)
  resetToken?: string;
  resetTokenExpires?: Date;
  dateOfBirth?: string;
  address?: string;
  emergencyContact?: string;
  allergies?: string;
  skinType?: string;
  preferredServices?: string;
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema: Schema = new Schema(
  {
    name: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true,
      unique: true
    },
    phone: {
      type: String,
      unique: true,
      sparse: true // Allows null/undefined values to be non-unique
    },
    password: {
      type: String,
      required: true
    },
    role: {
      type: String,
      enum: ['customer', 'owner'],
      default: 'customer'
    },
    firstName: { type: String },
    lastName: { type: String },
    dateOfBirth: { type: String },
    address: { type: String },
    emergencyContact: { type: String },
    allergies: { type: String },
    skinType: { type: String },
    preferredServices: { type: String },
    // NEW FIELDS FOR THE UI FLOW
    isVerified: {
      type: Boolean,
      default: false
    },
    otp: {
      type: String
    }, // Used for Screen 6 (Phone Verification)
    resetToken: {
      type: String
    }, // Used for Screen 9 (Password Reset)
    resetTokenExpires: {
      type: Date
    }, // Security: code expires after 10-15 mins
  },
  { timestamps: true }
);

export default mongoose.model<IUser>('User', UserSchema);