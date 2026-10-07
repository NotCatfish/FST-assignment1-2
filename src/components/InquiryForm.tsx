"use client";

import * as React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  inquirySchema,
  type InquiryFormData,
  type ServerActionResponse,
} from "@/lib/validations/inquiry";
import { submitInquiryAction } from "@/app/actions/submitInquiry";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { CheckCircle2, AlertCircle, Loader2, Send } from "lucide-react";

export function InquiryForm() {
  const [submissionState, setSubmissionState] =
    React.useState<ServerActionResponse | null>(null);
  const [isPending, startTransition] = React.useTransition();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<InquiryFormData>({
    resolver: zodResolver(inquirySchema),
    defaultValues: {
      name: "",
      email: "",
      projectType: "fullstack",
      budget: "$1k - $5k",
      message: "",
    },
  });

  const onSubmit = (data: InquiryFormData) => {
    setSubmissionState(null);
    startTransition(async () => {
      const result = await submitInquiryAction(null, data);
      setSubmissionState(result);
      if (result.success) {
        reset();
      }
    });
  };

  return (
    <Card className="max-w-2xl mx-auto shadow-lg border-zinc-200 dark:border-zinc-800">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Send className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
          <span>Project Inquiry &amp; Server Action Form Mutation</span>
        </CardTitle>
        <CardDescription>
          FST Assignment 1 Part C: End-to-end type-safe form validated with
          shared Zod schemas on both client and native Next.js Server Action.
        </CardDescription>
      </CardHeader>

      <CardContent>
        {submissionState && (
          <div
            role="alert"
            className={`p-4 mb-6 rounded-lg text-sm flex items-start gap-3 ${
              submissionState.success
                ? "bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800"
                : "bg-red-50 dark:bg-red-950/40 text-red-800 dark:text-red-300 border border-red-200 dark:border-red-800"
            }`}
          >
            {submissionState.success ? (
              <CheckCircle2 className="w-5 h-5 shrink-0 text-emerald-600 dark:text-emerald-400 mt-0.5" />
            ) : (
              <AlertCircle className="w-5 h-5 shrink-0 text-red-600 dark:text-red-400 mt-0.5" />
            )}
            <div>
              <p className="font-semibold">{submissionState.message}</p>
              {submissionState.recordId && (
                <p className="text-xs font-mono mt-1 opacity-80">
                  Transaction Reference: {submissionState.recordId}
                </p>
              )}
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Name Field */}
            <div className="space-y-1.5">
              <label
                htmlFor="name"
                className="text-xs font-semibold text-zinc-700 dark:text-zinc-300"
              >
                Full Name *
              </label>
              <Input
                id="name"
                placeholder="Indraneel Samanta"
                {...register("name")}
                error={!!errors.name}
                disabled={isPending}
              />
              {errors.name && (
                <p className="text-xs text-red-500 font-medium">
                  {errors.name.message}
                </p>
              )}
            </div>

            {/* Email Field */}
            <div className="space-y-1.5">
              <label
                htmlFor="email"
                className="text-xs font-semibold text-zinc-700 dark:text-zinc-300"
              >
                Email Address *
              </label>
              <Input
                id="email"
                type="email"
                placeholder="name@example.com"
                {...register("email")}
                error={!!errors.email}
                disabled={isPending}
              />
              {errors.email && (
                <p className="text-xs text-red-500 font-medium">
                  {errors.email.message}
                </p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Project Category */}
            <div className="space-y-1.5">
              <label
                htmlFor="projectType"
                className="text-xs font-semibold text-zinc-700 dark:text-zinc-300"
              >
                Project Domain *
              </label>
              <select
                id="projectType"
                {...register("projectType")}
                disabled={isPending}
                className="flex h-10 w-full rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white/80 dark:bg-zinc-900/80 px-3 py-2 text-sm text-zinc-900 dark:text-zinc-100 shadow-xs focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-indigo-500/50"
              >
                <option value="fullstack">Next.js Full-Stack Application</option>
                <option value="ml_pipeline">Machine Learning Data Pipeline</option>
                <option value="consulting">Architecture Audit &amp; Performance</option>
                <option value="other">Other Engineering Work</option>
              </select>
              {errors.projectType && (
                <p className="text-xs text-red-500 font-medium">
                  {errors.projectType.message}
                </p>
              )}
            </div>

            {/* Budget Range */}
            <div className="space-y-1.5">
              <label
                htmlFor="budget"
                className="text-xs font-semibold text-zinc-700 dark:text-zinc-300"
              >
                Estimated Budget *
              </label>
              <select
                id="budget"
                {...register("budget")}
                disabled={isPending}
                className="flex h-10 w-full rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white/80 dark:bg-zinc-900/80 px-3 py-2 text-sm text-zinc-900 dark:text-zinc-100 shadow-xs focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-indigo-500/50"
              >
                <option value="< $1k">&lt; $1,000</option>
                <option value="$1k - $5k">$1,000 - $5,000</option>
                <option value="$5k - $10k">$5,000 - $10,000</option>
                <option value="> $10k">&gt; $10,000</option>
              </select>
              {errors.budget && (
                <p className="text-xs text-red-500 font-medium">
                  {errors.budget.message}
                </p>
              )}
            </div>
          </div>

          {/* Project Details */}
          <div className="space-y-1.5">
            <label
              htmlFor="message"
              className="text-xs font-semibold text-zinc-700 dark:text-zinc-300"
            >
              Project Specifications / Message *
            </label>
            <Textarea
              id="message"
              placeholder="Outline your application requirements, timeline, or architecture challenges..."
              rows={4}
              {...register("message")}
              error={!!errors.message}
              disabled={isPending}
            />
            {errors.message && (
              <p className="text-xs text-red-500 font-medium">
                {errors.message.message}
              </p>
            )}
          </div>

          <Button
            type="submit"
            disabled={isPending}
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2.5 rounded-lg shadow-md transition-all cursor-pointer flex items-center justify-center gap-2"
          >
            {isPending ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Executing Server Action Mutation...</span>
              </>
            ) : (
              <>
                <Send className="w-4 h-4" />
                <span>Dispatch Mutation to Server Action</span>
              </>
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
