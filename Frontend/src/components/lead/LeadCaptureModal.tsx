import React, { useState, useCallback } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion, AnimatePresence } from "framer-motion";
import {
  Home,
  DollarSign,
  TrendingUp,
  Key,
  ArrowLeft,
  ArrowRight,
  Check,
} from "lucide-react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { Select, type SelectOption } from "@/components/ui/select";

/* ─── Types ─────────────────────────────────────────── */

type Intent = "buy" | "sell" | "invest" | "rent";

interface IntentOption {
  value: Intent;
  label: string;
  icon: React.ReactNode;
  description: string;
}

interface FormState {
  intent: Intent | null;
  propertyType: string;
  location: string;
  budgetRange: [number, number];
  name: string;
  email: string;
  phone: string;
}

interface LeadCaptureModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  propertyId?: string;
}

/* ─── Constants ─────────────────────────────────────── */

const INTENTS: IntentOption[] = [
  {
    value: "buy",
    label: "Buy",
    icon: <Home className="h-7 w-7" />,
    description: "Find my dream property",
  },
  {
    value: "sell",
    label: "Sell",
    icon: <DollarSign className="h-7 w-7" />,
    description: "List my property for sale",
  },
  {
    value: "invest",
    label: "Invest",
    icon: <TrendingUp className="h-7 w-7" />,
    description: "Explore investment options",
  },
  {
    value: "rent",
    label: "Rent",
    icon: <Key className="h-7 w-7" />,
    description: "Rent a property",
  },
];

const PROPERTY_TYPES: SelectOption[] = [
  { value: "apartment", label: "Apartment" },
  { value: "villa", label: "Villa" },
  { value: "bungalow", label: "Bungalow" },
  { value: "plot", label: "Plot" },
  { value: "commercial", label: "Commercial" },
  { value: "penthouse", label: "Penthouse" },
];

const LOCATIONS: SelectOption[] = [
  { value: "Hyderabad", label: "Hyderabad" },
  { value: "Hyderabad", label: "Hyderabad" },
  { value: "Hyderabad", label: "Hyderabad" },
  { value: "bangalore", label: "Bangalore" },
  { value: "mumbai", label: "Mumbai" },
];

const contactSchema = z.object({
  name: z
    .string()
    .min(1, "Name is required")
    .min(2, "Name must be at least 2 characters"),
  email: z
    .string()
    .min(1, "Email is required")
    .email("Enter a valid email address"),
  phone: z
    .string()
    .min(1, "Phone number is required")
    .regex(/^\d{10}$/, "Phone must be exactly 10 digits"),
});

type ContactFormValues = z.infer<typeof contactSchema>;

/* ─── Slide Variants ────────────────────────────────── */

const slideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 260 : -260,
    opacity: 0,
  }),
  center: { x: 0, opacity: 1 },
  exit: (direction: number) => ({
    x: direction < 0 ? 260 : -260,
    opacity: 0,
  }),
};

/* ─── Component ─────────────────────────────────────── */

const LeadCaptureModal: React.FC<LeadCaptureModalProps> = ({
  open,
  onOpenChange,
  propertyId,
}) => {
  const [step, setStep] = useState(1);
  const [direction, setDirection] = useState(1);
  const [formState, setFormState] = useState<FormState>({
    intent: null,
    propertyType: "",
    location: "",
    budgetRange: [2000000, 15000000],
    name: "",
    email: "",
    phone: "",
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset: resetForm,
    setValue,
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: formState.name,
      email: formState.email,
      phone: formState.phone,
    },
  });

  const goNext = useCallback(() => {
    setDirection(1);
    setStep((s) => Math.min(s + 1, 4));
  }, []);

  const goBack = useCallback(() => {
    setDirection(-1);
    setStep((s) => Math.max(s - 1, 1));
  }, []);

  const handleIntentSelect = (intent: Intent) => {
    setFormState((prev) => ({ ...prev, intent }));
    goNext();
  };

  const handleFinalSubmit = (data: ContactFormValues) => {
    const completeData = {
      ...formState,
      ...data,
      propertyId: propertyId ?? null,
      submittedAt: new Date().toISOString(),
    };
    // eslint-disable-next-line no-console
    console.log("Lead captured:", completeData);
    goNext(); // go to success step
  };

  const handleClose = () => {
    onOpenChange(false);
    setTimeout(() => {
      setStep(1);
      setDirection(1);
      setFormState({
        intent: null,
        propertyType: "",
        location: "",
        budgetRange: [2000000, 15000000],
        name: "",
        email: "",
        phone: "",
      });
      resetForm();
    }, 300);
  };

  const canProceedStep2 =
    formState.propertyType !== "" && formState.location !== "";

  const formatCurrency = (v: number) =>
    v >= 10000000
      ? `₹${(v / 10000000).toFixed(1)} Cr`
      : `₹${(v / 100000).toFixed(0)} L`;

  /* ─── Step renderers ─────────────────────────────── */

  const renderStep1 = () => (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-[#fafafa] text-center">
        I want to…
      </h3>
      <div className="grid grid-cols-2 gap-3">
        {INTENTS.map((item) => (
          <button
            key={item.value}
            onClick={() => handleIntentSelect(item.value)}
            className={`group flex flex-col items-center gap-2 rounded-xl border p-5 transition-all duration-200 cursor-pointer ${
              formState.intent === item.value
                ? "border-[#C9A227] bg-[#C9A227]/10"
                : "border-[#1a3a5c] bg-[#122d4d] hover:border-[#C9A227]/50 hover:bg-[#C9A227]/5"
            }`}
          >
            <span
              className={`transition-colors ${
                formState.intent === item.value
                  ? "text-[#C9A227]"
                  : "text-[#e4e4e7] group-hover:text-[#C9A227]"
              }`}
            >
              {item.icon}
            </span>
            <span className="text-sm font-medium text-[#fafafa]">
              {item.label}
            </span>
            <span className="text-xs text-[#e4e4e7]">{item.description}</span>
          </button>
        ))}
      </div>
    </div>
  );

  const renderStep2 = () => (
    <div className="space-y-5">
      <h3 className="text-lg font-semibold text-[#fafafa] text-center">
        Property Preferences
      </h3>

      <div className="space-y-2">
        <label className="text-sm font-medium text-[#e4e4e7]">
          Property Type
        </label>
        <Select
          options={PROPERTY_TYPES}
          placeholder="Select property type"
          value={formState.propertyType}
          onValueChange={(v) =>
            setFormState((prev) => ({ ...prev, propertyType: v }))
          }
        />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium text-[#e4e4e7]">Location</label>
        <Select
          options={LOCATIONS}
          placeholder="Select location"
          value={formState.location}
          onValueChange={(v) =>
            setFormState((prev) => ({ ...prev, location: v }))
          }
        />
      </div>

      <div className="space-y-3">
        <label className="text-sm font-medium text-[#e4e4e7]">
          Budget Range
        </label>
        <Slider
          min={500000}
          max={50000000}
          step={500000}
          value={[formState.budgetRange[0]]}
          onValueChange={(v) =>
            setFormState((prev) => ({
              ...prev,
              budgetRange: [v[0], prev.budgetRange[1]],
            }))
          }
          aria-label="Minimum budget"
        />
        <Slider
          min={500000}
          max={50000000}
          step={500000}
          value={[formState.budgetRange[1]]}
          onValueChange={(v) =>
            setFormState((prev) => ({
              ...prev,
              budgetRange: [prev.budgetRange[0], v[0]],
            }))
          }
          aria-label="Maximum budget"
        />
        <div className="flex justify-between text-xs text-[#C9A227]">
          <span>{formatCurrency(formState.budgetRange[0])}</span>
          <span>{formatCurrency(formState.budgetRange[1])}</span>
        </div>
      </div>
    </div>
  );

  const renderStep3 = () => (
    <form
      id="lead-contact-form"
      onSubmit={handleSubmit(handleFinalSubmit)}
      className="space-y-5"
    >
      <h3 className="text-lg font-semibold text-[#fafafa] text-center">
        Your Contact Details
      </h3>

      <div className="space-y-1.5">
        <label className="text-sm font-medium text-[#e4e4e7]">Full Name</label>
        <Input
          placeholder="John Doe"
          {...register("name")}
          onChange={(e) => {
            register("name").onChange(e);
            setFormState((prev) => ({ ...prev, name: e.target.value }));
          }}
        />
        {errors.name && (
          <p className="text-xs text-red-400">{errors.name.message}</p>
        )}
      </div>

      <div className="space-y-1.5">
        <label className="text-sm font-medium text-[#e4e4e7]">Email</label>
        <Input
          type="email"
          placeholder="john@example.com"
          {...register("email")}
          onChange={(e) => {
            register("email").onChange(e);
            setFormState((prev) => ({ ...prev, email: e.target.value }));
          }}
        />
        {errors.email && (
          <p className="text-xs text-red-400">{errors.email.message}</p>
        )}
      </div>

      <div className="space-y-1.5">
        <label className="text-sm font-medium text-[#e4e4e7]">
          Phone Number
        </label>
        <Input
          type="tel"
          placeholder="7787645123"
          maxLength={10}
          {...register("phone")}
          onChange={(e) => {
            register("phone").onChange(e);
            setFormState((prev) => ({ ...prev, phone: e.target.value }));
          }}
        />
        {errors.phone && (
          <p className="text-xs text-red-400">{errors.phone.message}</p>
        )}
      </div>
    </form>
  );

  const renderStep4 = () => (
    <div className="flex flex-col items-center justify-center space-y-4 py-6">
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 260, damping: 20, delay: 0.1 }}
        className="flex h-20 w-20 items-center justify-center rounded-full bg-[#C9A227]/20"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{
            type: "spring",
            stiffness: 260,
            damping: 20,
            delay: 0.3,
          }}
        >
          <Check className="h-10 w-10 text-[#C9A227]" />
        </motion.div>
      </motion.div>
      <h3 className="text-xl font-bold text-[#fafafa]">Thank You!</h3>
      <p className="text-center text-sm text-[#e4e4e7] max-w-xs">
        Our property consultant will reach out to you within 24 hours. We're
        excited to help you find the perfect property.
      </p>
      <Button onClick={handleClose} className="mt-2">
        Close
      </Button>
    </div>
  );

  const stepComponents = [renderStep1, renderStep2, renderStep3, renderStep4];

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent onClose={handleClose} className="max-w-md overflow-hidden">
        {/* Progress bar */}
        {step < 4 && (
          <div className="space-y-1.5 mb-2">
            <div className="flex items-center justify-between text-xs text-[#e4e4e7]">
              <span>Step {step} of 4</span>
              <span>{Math.round((step / 4) * 100)}%</span>
            </div>
            <div className="h-1.5 w-full rounded-full bg-[#1a3a5c]">
              <motion.div
                className="h-full rounded-full bg-gradient-to-r from-[#C9A227] to-[#d4b94e]"
                initial={{ width: 0 }}
                animate={{ width: `${(step / 4) * 100}%` }}
                transition={{ duration: 0.4, ease: "easeInOut" }}
              />
            </div>
          </div>
        )}

        {/* Step content */}
        <div className="relative min-h-[320px]">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={step}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="w-full"
            >
              {stepComponents[step - 1]()}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Navigation */}
        {step > 1 && step < 4 && (
          <div className="flex items-center justify-between pt-2">
            <Button variant="ghost" size="sm" onClick={goBack}>
              <ArrowLeft className="mr-1 h-4 w-4" />
              Back
            </Button>

            {step === 2 && (
              <Button size="sm" onClick={goNext} disabled={!canProceedStep2}>
                Next
                <ArrowRight className="ml-1 h-4 w-4" />
              </Button>
            )}

            {step === 3 && (
              <Button size="sm" type="submit" form="lead-contact-form">
                Submit
                <ArrowRight className="ml-1 h-4 w-4" />
              </Button>
            )}
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default LeadCaptureModal;
