import {
  forwardRef,
  useId,
  type InputHTMLAttributes,
  type SelectHTMLAttributes,
  type TextareaHTMLAttributes,
  type ReactNode,
} from "react";
import { AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface CommonProps {
  label: string;
  error?: string;
  optional?: boolean;
  wrapperClassName?: string;
}

const wrapper =
  "relative rounded-2xl bg-white/[0.03] border border-white/10 transition-all focus-within:border-cyan-glow/70 focus-within:ring-2 focus-within:ring-cyan-glow/25";

const labelBase =
  "pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 origin-left text-white/50 transition-all duration-200 select-none";

const labelFloating =
  "peer-focus:top-3 peer-focus:translate-y-0 peer-focus:text-[10px] peer-focus:uppercase peer-focus:tracking-widest peer-focus:text-neon-200 peer-[:not(:placeholder-shown)]:top-3 peer-[:not(:placeholder-shown)]:translate-y-0 peer-[:not(:placeholder-shown)]:text-[10px] peer-[:not(:placeholder-shown)]:uppercase peer-[:not(:placeholder-shown)]:tracking-widest peer-[:not(:placeholder-shown)]:text-neon-200";

const inputBase =
  "peer w-full bg-transparent outline-none text-white placeholder-transparent px-4 pt-6 pb-2";

function ErrorText({ children }: { children: ReactNode }) {
  return (
    <span
      className="mt-1.5 inline-flex items-center gap-1.5 text-xs text-accent-pink"
      role="alert"
    >
      <AlertCircle className="h-3.5 w-3.5" />
      {children}
    </span>
  );
}

type FloatingInputProps = CommonProps &
  Omit<InputHTMLAttributes<HTMLInputElement>, "placeholder">;

export const FloatingInput = forwardRef<HTMLInputElement, FloatingInputProps>(
  function FloatingInput(
    { label, error, optional, wrapperClassName, className, id, ...rest },
    ref
  ) {
    const autoId = useId();
    const inputId = id ?? autoId;
    return (
      <div className={cn("flex flex-col", wrapperClassName)}>
        <div
          className={cn(wrapper, error && "border-accent-pink/70 ring-2 ring-accent-pink/25")}
        >
          <input
            id={inputId}
            ref={ref}
            placeholder={label}
            aria-invalid={!!error}
            aria-describedby={error ? `${inputId}-err` : undefined}
            className={cn(inputBase, className)}
            {...rest}
          />
          <label htmlFor={inputId} className={cn(labelBase, labelFloating)}>
            {label}
            {optional && (
              <span className="ml-2 text-white/30 normal-case tracking-wide text-[10px]">
                optional
              </span>
            )}
          </label>
        </div>
        {error && (
          <span id={`${inputId}-err`}>
            <ErrorText>{error}</ErrorText>
          </span>
        )}
      </div>
    );
  }
);

type FloatingTextareaProps = CommonProps &
  Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, "placeholder">;

export const FloatingTextarea = forwardRef<
  HTMLTextAreaElement,
  FloatingTextareaProps
>(function FloatingTextarea(
  { label, error, optional, wrapperClassName, className, id, ...rest },
  ref
) {
  const autoId = useId();
  const inputId = id ?? autoId;
  return (
    <div className={cn("flex flex-col", wrapperClassName)}>
      <div
        className={cn(wrapper, error && "border-accent-pink/70 ring-2 ring-accent-pink/25")}
      >
        <textarea
          id={inputId}
          ref={ref}
          placeholder={label}
          aria-invalid={!!error}
          aria-describedby={error ? `${inputId}-err` : undefined}
          className={cn(inputBase, "min-h-[140px] resize-y", className)}
          {...rest}
        />
        <label
          htmlFor={inputId}
          className={cn(
            "pointer-events-none absolute left-4 top-5 origin-left text-white/50 transition-all duration-200 select-none",
            "peer-focus:top-3 peer-focus:text-[10px] peer-focus:uppercase peer-focus:tracking-widest peer-focus:text-neon-200",
            "peer-[:not(:placeholder-shown)]:top-3 peer-[:not(:placeholder-shown)]:text-[10px] peer-[:not(:placeholder-shown)]:uppercase peer-[:not(:placeholder-shown)]:tracking-widest peer-[:not(:placeholder-shown)]:text-neon-200"
          )}
        >
          {label}
          {optional && (
            <span className="ml-2 text-white/30 normal-case tracking-wide text-[10px]">
              optional
            </span>
          )}
        </label>
      </div>
      {error && (
        <span id={`${inputId}-err`}>
          <ErrorText>{error}</ErrorText>
        </span>
      )}
    </div>
  );
});

type FloatingSelectProps = CommonProps &
  SelectHTMLAttributes<HTMLSelectElement> & {
    options: { value: string; label: string }[];
  };

export const FloatingSelect = forwardRef<HTMLSelectElement, FloatingSelectProps>(
  function FloatingSelect(
    { label, error, optional, wrapperClassName, className, id, options, value, ...rest },
    ref
  ) {
    const autoId = useId();
    const inputId = id ?? autoId;
    const hasValue = !!(value ?? rest.defaultValue);
    return (
      <div className={cn("flex flex-col", wrapperClassName)}>
        <div
          className={cn(
            wrapper,
            error && "border-accent-pink/70 ring-2 ring-accent-pink/25"
          )}
        >
          <select
            id={inputId}
            ref={ref}
            value={value}
            aria-invalid={!!error}
            aria-describedby={error ? `${inputId}-err` : undefined}
            className={cn(
              "peer w-full appearance-none bg-transparent outline-none text-white px-4 pt-6 pb-2",
              className
            )}
            {...rest}
          >
            <option value="" disabled hidden />
            {options.map((o) => (
              <option key={o.value} value={o.value} className="bg-surface">
                {o.label}
              </option>
            ))}
          </select>
          <label
            htmlFor={inputId}
            className={cn(
              "pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 origin-left text-white/50 transition-all duration-200 select-none",
              "peer-focus:top-3 peer-focus:translate-y-0 peer-focus:text-[10px] peer-focus:uppercase peer-focus:tracking-widest peer-focus:text-neon-200",
              hasValue &&
                "top-3 translate-y-0 text-[10px] uppercase tracking-widest text-neon-200"
            )}
          >
            {label}
            {optional && (
              <span className="ml-2 text-white/30 normal-case tracking-wide text-[10px]">
                optional
              </span>
            )}
          </label>
          <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-white/40">
            ▾
          </span>
        </div>
        {error && (
          <span id={`${inputId}-err`}>
            <ErrorText>{error}</ErrorText>
          </span>
        )}
      </div>
    );
  }
);
