import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(1, "Password is required"),
});

export const registerSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  confirmPassword: z.string(),
  companyName: z.string().min(1, "Company name is required"),
  phone: z.string().optional(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});

export const companyProfileSchema = z.object({
  nameAr: z.string().min(1, "Company name in Arabic is required"),
  nameEn: z.string().optional(),
  legalName: z.string().optional(),
  commercialRegister: z.string().optional(),
  taxNumber: z.string().optional(),
  activityType: z.string().optional(),
  companySize: z.string().optional(),
  country: z.string().optional(),
  city: z.string().optional(),
  currency: z.string().optional(),
  timezone: z.string().optional(),
  dateFormat: z.string().optional(),
  weekStartDay: z.string().optional(),
  fiscalYearStart: z.string().optional(),
  phone: z.string().optional(),
  website: z.string().url().optional().or(z.literal("")),
  address: z.string().optional(),
  aboutAr: z.string().optional(),
});

export const projectSchema = z.object({
  nameAr: z.string().min(1, "Project name is required"),
  nameEn: z.string().optional(),
  descriptionAr: z.string().optional(),
  clientName: z.string().optional(),
  clientContact: z.string().optional(),
  city: z.string().optional(),
  projectType: z.string().optional(),
  contractValue: z.number().optional(),
  budget: z.number().optional(),
  startDate: z.string().optional(),
  endDate: z.string().optional(),
  status: z.string().optional(),
});

export const inviteUserSchema = z.object({
  email: z.string().email("Invalid email address"),
  nameAr: z.string().min(1, "Name is required"),
  roleId: z.string().min(1, "Role is required"),
});

export const onboardingCompanySchema = z.object({
  companyNameAr: z.string().min(1, "Company name is required"),
  companyNameEn: z.string().optional(),
  activityType: z.string().optional(),
  companySize: z.string().optional(),
  country: z.string().optional(),
  city: z.string().optional(),
  currency: z.string().optional(),
  timezone: z.string().optional(),
});

export const onboardingProjectSchema = z.object({
  nameAr: z.string().min(1, "Project name is required"),
  clientName: z.string().optional(),
  city: z.string().optional(),
  projectType: z.string().optional(),
  contractValue: z.string().optional(),
  startDate: z.string().optional(),
  endDate: z.string().optional(),
});

export type LoginFormData = z.infer<typeof loginSchema>;
export type RegisterFormData = z.infer<typeof registerSchema>;
export type CompanyProfileFormData = z.infer<typeof companyProfileSchema>;
export type ProjectFormData = z.infer<typeof projectSchema>;
export type InviteUserFormData = z.infer<typeof inviteUserSchema>;
export type OnboardingCompanyFormData = z.infer<typeof onboardingCompanySchema>;
export type OnboardingProjectFormData = z.infer<typeof onboardingProjectSchema>;
