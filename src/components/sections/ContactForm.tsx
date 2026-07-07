import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, CheckCircle2, Loader2 } from "lucide-react";
import {
  FloatingInput,
  FloatingSelect,
  FloatingTextarea,
} from "@/components/ui/FloatingField";
import { cn } from "@/lib/utils";
import { submitContact } from "@/services/contact";

const schema = z.object({
  name: z.string().min(2, "Please enter your name."),
  email: z
    .string()
    .min(1, "Email is required.")
    .email("Please enter a valid email."),
  company: z.string().min(1, "Company is required."),
  budget: z.string().optional(),
  service: z.string().min(1, "Pick the closest capability."),
  message: z
    .string()
    .min(20, "Tell us a little more (20+ characters).")
    .max(2000, "That's a bit long — please keep it under 2000 characters."),
});

type FormValues = z.infer<typeof schema>;

const BUDGETS = [
  { value: "<$25k", label: "< $25k" },
  { value: "$25k-$75k", label: "$25k – $75k" },
  { value: "$75k-$250k", label: "$75k – $250k" },
  { value: "$250k-$1M", label: "$250k – $1M" },
  { value: ">$1M", label: "> $1M" },
];

const SERVICE_CHIPS = [
  "AI & Automation",
  "Cloud Solutions",
  "DevOps",
  "Cyber Security",
  "Data Engineering",
  "Application Development",
  "Cloud Migration",
  "Managed IT Services",
  "Digital Transformation",
  "Consulting",
  "Not sure yet",
];

export function ContactForm() {
  const [status, setStatus] = useState<"idle" | "submitting" | "success">(
    "idle"
  );
  const [reference, setReference] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
    reset,
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: "",
      email: "",
      company: "",
      budget: "",
      service: "",
      message: "",
    },
    mode: "onTouched",
  });

  const service = watch("service");

  const onSubmit = handleSubmit(async (values) => {
    setStatus("submitting");
    const res = await submitContact(values);
    if (res.ok) {
      setReference(res.reference ?? null);
      setStatus("success");
      reset();
    } else {
      setStatus("idle");
    }
  });

  return (
    <form
      onSubmit={onSubmit}
      noValidate
      className="relative overflow-hidden rounded-3xl glass-strong border-gradient p-6 md:p-10"
    >
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-24 -right-16 h-72 w-72 rounded-full bg-neon-500/15 blur-3xl" />
        <div className="absolute -bottom-24 -left-16 h-72 w-72 rounded-full bg-electric-500/15 blur-3xl" />
      </div>

      <AnimatePresence mode="wait">
        {status === "success" ? (
          <motion.div
            key="success"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="relative flex flex-col items-center text-center py-12"
          >
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-neon-500 via-cyan-glow to-electric-500 shadow-neon">
              <CheckCircle2 className="h-8 w-8 text-white" />
            </div>
            <h3 className="mt-6 font-display text-2xl font-semibold text-white">
              Thanks — we'll be in touch.
            </h3>
            <p className="mt-2 max-w-md text-white/60">
              A senior engineer will reach out within one business day.
            </p>
            {reference && (
              <p className="mt-4 rounded-full glass px-4 py-1.5 text-xs uppercase tracking-widest text-neon-200">
                Reference: {reference}
              </p>
            )}
          </motion.div>
        ) : (
          <motion.div
            key="form"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="relative grid gap-5 md:grid-cols-2"
          >
            <FloatingInput
              label="Full name"
              type="text"
              autoComplete="name"
              error={errors.name?.message}
              {...register("name")}
            />

            <FloatingInput
              label="Work email"
              type="email"
              autoComplete="email"
              error={errors.email?.message}
              {...register("email")}
            />

            <FloatingInput
              label="Company"
              type="text"
              autoComplete="organization"
              error={errors.company?.message}
              {...register("company")}
            />

            <FloatingSelect
              label="Estimated budget"
              optional
              options={BUDGETS}
              error={errors.budget?.message}
              {...register("budget")}
            />

            <div className="md:col-span-2">
              <p className="mb-3 text-xs uppercase tracking-widest text-white/60">
                Which capability best fits?
              </p>
              <div className="flex flex-wrap gap-2">
                {SERVICE_CHIPS.map((s) => {
                  const active = service === s;
                  return (
                    <button
                      type="button"
                      key={s}
                      onClick={() =>
                        setValue("service", s, {
                          shouldValidate: true,
                          shouldDirty: true,
                        })
                      }
                      className={cn(
                        "rounded-full px-4 py-2 text-sm font-medium transition-all",
                        active
                          ? "bg-gradient-to-r from-neon-500 via-cyan-glow to-electric-500 text-white shadow-neon"
                          : "glass text-white/70 hover:text-white"
                      )}
                    >
                      {s}
                    </button>
                  );
                })}
              </div>
              <input type="hidden" {...register("service")} />
              {errors.service?.message && (
                <p
                  className="mt-2 inline-flex items-center gap-1.5 text-xs text-accent-pink"
                  role="alert"
                >
                  {errors.service.message}
                </p>
              )}
            </div>

            <FloatingTextarea
              label="Tell us about your project"
              wrapperClassName="md:col-span-2"
              error={errors.message?.message}
              {...register("message")}
            />

            <div className="md:col-span-2 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-2">
              <p className="text-xs text-white/50">
                By submitting, you agree to our privacy policy. We'll only use
                your details to respond.
              </p>
              <button
                type="submit"
                disabled={status === "submitting"}
                className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-neon-500 via-cyan-glow to-electric-500 px-7 py-3 text-sm font-medium text-white shadow-neon transition-all hover:-translate-y-0.5 hover:shadow-neon-strong disabled:opacity-60 disabled:hover:translate-y-0"
              >
                {status === "submitting" ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" /> Sending…
                  </>
                ) : (
                  <>
                    Send message
                    <ArrowRight className="h-4 w-4" />
                  </>
                )}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </form>
  );
}
