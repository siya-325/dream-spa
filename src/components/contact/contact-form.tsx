"use client"

import { useState } from "react"
import { CheckCircle2, Send } from "lucide-react"

import { buttonVariants } from "@/components/ui/button"
import { Reveal } from "@/components/ui/reveal"
import { cn } from "@/lib/utils"

const serviceOptions = [
  "Signature Body Massage (60–90 min)",
  "Deep Tissue Massage (60–90 min)",
  "Aromatherapy Massage (60 min)",
  "Hot Oil Therapy (60–90 min)",
  "Swedish Massage (60 min)",
  "Ayurvedic Abhyanga (75–90 min)",
  "Jacuzzi Therapy (20–30 min)",
  "Couple Experience (60–90 min)",
  "Customised Facial (45–60 min)",
  "General Inquiry / Other",
]

type FormFields = {
  name: string
  email: string
  phone: string
  service: string
  date: string
  notes: string
}

type FormErrors = Partial<Record<keyof FormFields, string>>

function validateName(name: string): string | null {
  const trimmed = name.trim()
  if (!trimmed) {
    return "Please enter your full name."
  }
  if (trimmed.length < 2 || trimmed.length > 80) {
    return "Please enter a valid name."
  }
  // Allow letters, spaces, hyphens (-), apostrophes (')
  const nameRegex = /^[a-zA-Z\s'-]+$/
  if (!nameRegex.test(trimmed)) {
    return "Please enter a valid name."
  }
  return null
}

function validateEmail(email: string): string | null {
  const trimmed = email.trim()
  if (!trimmed) {
    return "Please enter your email address."
  }
  if (trimmed.length > 254) {
    return "Please enter a valid email address."
  }
  // Reject consecutive dots
  if (trimmed.includes("..")) {
    return "Please enter a valid email address."
  }
  // Standard robust email regex requiring username@domain.tld
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
  if (!emailRegex.test(trimmed)) {
    return "Please enter a valid email address."
  }
  return null
}

function validatePhone(phone: string): string | null {
  const trimmed = phone.trim()
  if (!trimmed) {
    return "Please enter your phone number."
  }

  // Normalize: remove spaces, hyphens, parentheses
  let cleaned = trimmed.replace(/[\s\-\(\)]/g, "")

  // Handle +91 or 91 country code prefix
  if (cleaned.startsWith("+91")) {
    cleaned = cleaned.slice(3)
  } else if (cleaned.startsWith("91") && cleaned.length === 12) {
    cleaned = cleaned.slice(2)
  } else if (cleaned.startsWith("0") && cleaned.length === 11) {
    cleaned = cleaned.slice(1)
  }

  // Must be exactly 10 digits
  if (!/^\d{10}$/.test(cleaned)) {
    return "Please enter a valid 10-digit Indian mobile number."
  }

  // Indian mobile numbers must start with 6, 7, 8, or 9
  if (!/^[6-9]/.test(cleaned)) {
    return "Please enter a valid 10-digit Indian mobile number."
  }

  // Reject dummy numbers where all 10 digits are identical (e.g. 0000000000, 1111111111)
  if (/^(\d)\1{9}$/.test(cleaned)) {
    return "Please enter a valid 10-digit Indian mobile number."
  }

  return null
}

function validateService(service: string): string | null {
  if (!service || !serviceOptions.includes(service)) {
    return "Please select a treatment."
  }
  return null
}

function validateDate(date: string): string | null {
  if (!date) return null // Optional field

  const parts = date.split("-")
  if (parts.length !== 3) {
    return "Please select today or a future date."
  }

  const year = parseInt(parts[0], 10)
  const month = parseInt(parts[1], 10) - 1
  const day = parseInt(parts[2], 10)

  const selectedDate = new Date(year, month, day)
  if (isNaN(selectedDate.getTime())) {
    return "Please select today or a future date."
  }

  const today = new Date()
  today.setHours(0, 0, 0, 0)

  if (selectedDate < today) {
    return "Please select today or a future date."
  }

  return null
}

function validateNotes(notes: string): string | null {
  if (!notes) return null // Optional field
  if (notes.trim().length > 500) {
    return "Please keep your notes under 500 characters."
  }
  return null
}

function validateForm(data: FormFields): FormErrors {
  const errors: FormErrors = {}

  const nameErr = validateName(data.name)
  if (nameErr) errors.name = nameErr

  const emailErr = validateEmail(data.email)
  if (emailErr) errors.email = emailErr

  const phoneErr = validatePhone(data.phone)
  if (phoneErr) errors.phone = phoneErr

  const serviceErr = validateService(data.service)
  if (serviceErr) errors.service = serviceErr

  const dateErr = validateDate(data.date)
  if (dateErr) errors.date = dateErr

  const notesErr = validateNotes(data.notes)
  if (notesErr) errors.notes = notesErr

  return errors
}

export function ContactForm() {
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [attemptedSubmit, setAttemptedSubmit] = useState(false)
  const [touched, setTouched] = useState<Record<string, boolean>>({})

  const [formData, setFormData] = useState<FormFields>({
    name: "",
    phone: "",
    email: "",
    service: serviceOptions[0],
    date: "",
    notes: "",
  })

  const currentErrors = validateForm(formData)

  const handleBlur = (field: keyof FormFields) => {
    setTouched((prev) => ({ ...prev, [field]: true }))
  }

  const handleChange = (field: keyof FormFields, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setAttemptedSubmit(true)

    const errors = validateForm(formData)
    const errorKeys = Object.keys(errors) as (keyof FormFields)[]

    if (errorKeys.length > 0) {
      // Focus first invalid field in form display order
      const fieldOrder: (keyof FormFields)[] = [
        "name",
        "email",
        "phone",
        "service",
        "date",
        "notes",
      ]
      const firstInvalid = fieldOrder.find((key) => errors[key])
      if (firstInvalid) {
        const el = document.getElementById(`form-${firstInvalid}`)
        if (el) {
          el.focus()
        }
      }
      return
    }

    setLoading(true)

    // Trim whitespace on submit
    const trimmedData = {
      ...formData,
      name: formData.name.trim(),
      email: formData.email.trim(),
      notes: formData.notes.trim(),
    }
    setFormData(trimmedData)

    // Simulate submission flow
    setTimeout(() => {
      setLoading(false)
      setSubmitted(true)
    }, 800)
  }

  const getFieldError = (field: keyof FormFields): string | undefined => {
    if (touched[field] || attemptedSubmit) {
      return currentErrors[field]
    }
    return undefined
  }

  const todayString = new Date().toISOString().split("T")[0]

  return (
    <section className="border-t border-border bg-background py-20 lg:py-28">
      <div className="shell">
        <div className="flex flex-col gap-12 lg:flex-row lg:items-center lg:gap-16">
          {/* Left Column: Heading & Description (Vertically Centered) */}
          <div className="my-auto flex flex-col justify-center lg:w-[38%]">
            <Reveal>
              <span className="eyebrow flex items-center gap-3 text-muted-foreground">
                <span aria-hidden="true" className="h-px w-8 bg-accent" />
                Send an Inquiry
              </span>
              <h2 className="display mt-6 text-3xl text-balance sm:text-4xl lg:text-[2.65rem] lg:leading-[1.18]">
                Request a session or ask a question.
              </h2>
              <p className="mt-6 text-base leading-relaxed text-pretty text-muted-foreground">
                Fill out your details below and our front desk in Gurukul will
                contact you promptly to confirm availability.
              </p>
              <p className="mt-4 text-sm leading-relaxed text-pretty text-muted-foreground">
                Whether you are looking to reserve a specific therapy, discuss
                pressure preferences, or ask about our private suites, we are here
                to ensure your visit is completely tailored to your body.
              </p>
            </Reveal>
          </div>

          {/* Right Column: Form Container */}
          <div className="lg:w-[62%]">
            <Reveal index={1}>
              <div className="rounded-2xl border border-clay/40 bg-sand/50 p-8 shadow-sm sm:p-10">
                {submitted ? (
                  <div className="flex flex-col items-center justify-center py-12 text-center">
                    <div className="flex size-14 items-center justify-center rounded-full bg-accent/15 text-accent">
                      <CheckCircle2 className="size-8" />
                    </div>
                    <h3 className="display mt-6 font-serif text-2xl text-foreground sm:text-3xl">
                      Inquiry Received
                    </h3>
                    <p className="mt-3 max-w-md text-sm leading-relaxed text-muted-foreground">
                      Thank you,{" "}
                      <strong className="text-foreground">{formData.name}</strong>
                      . We have received your request for{" "}
                      <em>{formData.service}</em>. Our team will call or email
                      you shortly at <span className="text-foreground">{formData.email}</span>.
                    </p>
                    <button
                      type="button"
                      onClick={() => {
                        setSubmitted(false)
                        setAttemptedSubmit(false)
                        setTouched({})
                        setFormData({
                          name: "",
                          phone: "",
                          email: "",
                          service: serviceOptions[0],
                          date: "",
                          notes: "",
                        })
                      }}
                      className="mt-8 text-xs font-semibold uppercase tracking-wider text-accent hover:underline"
                    >
                      Send another inquiry →
                    </button>
                  </div>
                ) : (
                  <form
                    noValidate
                    onSubmit={handleSubmit}
                    className="flex flex-col gap-6"
                  >
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                      {/* Name */}
                      <div className="flex flex-col gap-2">
                        <label
                          htmlFor="form-name"
                          className="eyebrow text-xs font-semibold uppercase tracking-wider text-foreground/80"
                        >
                          Full Name <span className="text-accent">*</span>
                        </label>
                        <input
                          id="form-name"
                          type="text"
                          required
                          aria-invalid={!!getFieldError("name")}
                          aria-describedby={
                            getFieldError("name") ? "form-name-error" : undefined
                          }
                          placeholder="e.g. Siya Choudhary"
                          value={formData.name}
                          onBlur={() => handleBlur("name")}
                          onChange={(e) => handleChange("name", e.target.value)}
                          className={cn(
                            "h-12 w-full rounded-none border bg-background px-4 text-sm text-foreground transition-colors placeholder:text-muted-foreground/60 focus:outline-none",
                            getFieldError("name")
                              ? "border-red-500 focus:border-red-500"
                              : "border-border-strong focus:border-accent",
                          )}
                        />
                        {getFieldError("name") && (
                          <p
                            id="form-name-error"
                            className="mt-0.5 text-xs font-medium text-red-600"
                          >
                            {getFieldError("name")}
                          </p>
                        )}
                      </div>

                      {/* Email */}
                      <div className="flex flex-col gap-2">
                        <label
                          htmlFor="form-email"
                          className="eyebrow text-xs font-semibold uppercase tracking-wider text-foreground/80"
                        >
                          Email Address <span className="text-accent">*</span>
                        </label>
                        <input
                          id="form-email"
                          type="email"
                          required
                          aria-invalid={!!getFieldError("email")}
                          aria-describedby={
                            getFieldError("email") ? "form-email-error" : undefined
                          }
                          placeholder="name@example.com"
                          value={formData.email}
                          onBlur={() => handleBlur("email")}
                          onChange={(e) => handleChange("email", e.target.value)}
                          className={cn(
                            "h-12 w-full rounded-none border bg-background px-4 text-sm text-foreground transition-colors placeholder:text-muted-foreground/60 focus:outline-none",
                            getFieldError("email")
                              ? "border-red-500 focus:border-red-500"
                              : "border-border-strong focus:border-accent",
                          )}
                        />
                        {getFieldError("email") && (
                          <p
                            id="form-email-error"
                            className="mt-0.5 text-xs font-medium text-red-600"
                          >
                            {getFieldError("email")}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
                      {/* Phone */}
                      <div className="flex flex-col gap-2 sm:col-span-1">
                        <label
                          htmlFor="form-phone"
                          className="eyebrow text-xs font-semibold uppercase tracking-wider text-foreground/80"
                        >
                          Phone Number <span className="text-accent">*</span>
                        </label>
                        <input
                          id="form-phone"
                          type="tel"
                          required
                          aria-invalid={!!getFieldError("phone")}
                          aria-describedby={
                            getFieldError("phone") ? "form-phone-error" : undefined
                          }
                          placeholder="+91 88666 65784"
                          value={formData.phone}
                          onBlur={() => handleBlur("phone")}
                          onChange={(e) => handleChange("phone", e.target.value)}
                          className={cn(
                            "h-12 w-full rounded-none border bg-background px-4 text-sm text-foreground transition-colors placeholder:text-muted-foreground/60 focus:outline-none",
                            getFieldError("phone")
                              ? "border-red-500 focus:border-red-500"
                              : "border-border-strong focus:border-accent",
                          )}
                        />
                        {getFieldError("phone") && (
                          <p
                            id="form-phone-error"
                            className="mt-0.5 text-xs font-medium text-red-600"
                          >
                            {getFieldError("phone")}
                          </p>
                        )}
                      </div>

                      {/* Service Select */}
                      <div className="flex flex-col gap-2 sm:col-span-1">
                        <label
                          htmlFor="form-service"
                          className="eyebrow text-xs font-semibold uppercase tracking-wider text-foreground/80"
                        >
                          Preferred Treatment <span className="text-accent">*</span>
                        </label>
                        <select
                          id="form-service"
                          required
                          aria-invalid={!!getFieldError("service")}
                          aria-describedby={
                            getFieldError("service")
                              ? "form-service-error"
                              : undefined
                          }
                          value={formData.service}
                          onBlur={() => handleBlur("service")}
                          onChange={(e) => handleChange("service", e.target.value)}
                          className={cn(
                            "h-12 w-full rounded-none border bg-background px-3 text-xs text-foreground transition-colors focus:outline-none",
                            getFieldError("service")
                              ? "border-red-500 focus:border-red-500"
                              : "border-border-strong focus:border-accent",
                          )}
                        >
                          {serviceOptions.map((opt) => (
                            <option key={opt} value={opt}>
                              {opt}
                            </option>
                          ))}
                        </select>
                        {getFieldError("service") && (
                          <p
                            id="form-service-error"
                            className="mt-0.5 text-xs font-medium text-red-600"
                          >
                            {getFieldError("service")}
                          </p>
                        )}
                      </div>

                      {/* Date */}
                      <div className="flex flex-col gap-2 sm:col-span-1">
                        <label
                          htmlFor="form-date"
                          className="eyebrow text-xs font-semibold uppercase tracking-wider text-foreground/80"
                        >
                          Preferred Date
                        </label>
                        <input
                          id="form-date"
                          type="date"
                          min={todayString}
                          aria-invalid={!!getFieldError("date")}
                          aria-describedby={
                            getFieldError("date") ? "form-date-error" : undefined
                          }
                          value={formData.date}
                          onBlur={() => handleBlur("date")}
                          onChange={(e) => handleChange("date", e.target.value)}
                          className={cn(
                            "h-12 w-full rounded-none border bg-background px-3 text-xs text-foreground transition-colors focus:outline-none",
                            getFieldError("date")
                              ? "border-red-500 focus:border-red-500"
                              : "border-border-strong focus:border-accent",
                          )}
                        />
                        {getFieldError("date") && (
                          <p
                            id="form-date-error"
                            className="mt-0.5 text-xs font-medium text-red-600"
                          >
                            {getFieldError("date")}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Notes / Health Preferences */}
                    <div className="flex flex-col gap-2">
                      <label
                        htmlFor="form-notes"
                        className="eyebrow text-xs font-semibold uppercase tracking-wider text-foreground/80"
                      >
                        Health Notes / Pressure Preferences (Optional)
                      </label>
                      <textarea
                        id="form-notes"
                        rows={4}
                        aria-invalid={!!getFieldError("notes")}
                        aria-describedby={
                          getFieldError("notes") ? "form-notes-error" : undefined
                        }
                        placeholder="Mention sore areas, injuries, or any specific pressure preferences..."
                        value={formData.notes}
                        onBlur={() => handleBlur("notes")}
                        onChange={(e) => handleChange("notes", e.target.value)}
                        className={cn(
                          "w-full resize-none rounded-none border bg-background p-4 text-sm text-foreground transition-colors placeholder:text-muted-foreground/60 focus:outline-none",
                          getFieldError("notes")
                            ? "border-red-500 focus:border-red-500"
                            : "border-border-strong focus:border-accent",
                        )}
                      />
                      {getFieldError("notes") && (
                        <p
                          id="form-notes-error"
                          className="mt-0.5 text-xs font-medium text-red-600"
                        >
                          {getFieldError("notes")}
                        </p>
                      )}
                    </div>

                    {/* Submit Button */}
                    <button
                      type="submit"
                      disabled={loading}
                      className={cn(
                        buttonVariants({ variant: "primary", size: "lg" }),
                        "mt-2 h-12 self-start rounded-none px-8 text-xs font-semibold uppercase tracking-widest",
                      )}
                    >
                      {loading ? (
                        "Sending Request..."
                      ) : (
                        <>
                          <span>Submit Inquiry</span>
                          <Send className="size-3.5" />
                        </>
                      )}
                    </button>
                  </form>
                )}
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  )
}
