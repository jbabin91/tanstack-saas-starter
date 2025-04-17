import {
  createFormHook,
  createFormHookContexts,
  useStore,
} from '@tanstack/react-form';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import * as ShadcnSelect from '@/components/ui/select';
import { Slider as ShadcnSlider } from '@/components/ui/slider';
import { Switch as ShadcnSwitch } from '@/components/ui/switch';
import { Textarea as ShadcnTextarea } from '@/components/ui/textarea';

export const { fieldContext, useFieldContext, formContext, useFormContext } =
  createFormHookContexts();

export function SubscribeButton({ label }: { label: string }) {
  const form = useFormContext();
  return (
    <form.Subscribe selector={(state) => state.isSubmitting}>
      {(isSubmitting) => (
        <Button disabled={isSubmitting} type="submit">
          {label}
        </Button>
      )}
    </form.Subscribe>
  );
}

function ErrorMessages({
  errors,
}: {
  errors: (string | { message: string })[];
}) {
  // Deduplicate error messages
  const uniqueMessages = Array.from(
    new Set(
      errors.map((error) =>
        typeof error === 'string' ? error : error.message,
      ),
    ),
  );
  return (
    <>
      {uniqueMessages.map((message) => (
        <div key={message} className="mt-1 font-bold text-red-500">
          {message}
        </div>
      ))}
    </>
  );
}

export function FormTextField({
  label,
  placeholder,
  type = 'text',
  inputMode,
  'aria-label': ariaLabel,
  'aria-required': ariaRequired,
  'aria-describedby': ariaDescribedBy,
  id,
}: {
  label: string;
  placeholder?: string;
  type?: 'text' | 'search' | 'tel' | 'url' | 'email' | 'number';
  inputMode?:
    | 'text'
    | 'search'
    | 'none'
    | 'tel'
    | 'url'
    | 'email'
    | 'numeric'
    | 'decimal';
  'aria-label'?: string;
  'aria-required'?: boolean;
  'aria-describedby'?: string;
  id?: string;
}) {
  const field = useFieldContext<string>();
  const errors = useStore(field.store, (state) => state.meta.errors);
  const fieldId = id ?? `field-${field.name}`;
  const errorId = `${fieldId}-error`;

  return (
    <div>
      <Label className="mb-2 text-xl font-bold" htmlFor={fieldId}>
        {label}
      </Label>
      <Input
        aria-describedby={errors?.length ? errorId : ariaDescribedBy}
        aria-invalid={errors?.length > 0}
        aria-label={ariaLabel}
        aria-required={ariaRequired}
        className="placeholder:text-muted-foreground/70 hover:bg-accent/10"
        id={fieldId}
        inputMode={inputMode}
        placeholder={placeholder}
        type={type}
        value={field.state.value}
        onBlur={field.handleBlur}
        onChange={(e) => field.handleChange(e.target.value)}
      />
      {field.state.meta.isTouched && errors?.length > 0 && (
        <div className="text-destructive text-sm" id={errorId}>
          <ErrorMessages errors={errors} />
        </div>
      )}
    </div>
  );
}

export function FormTextArea({
  label,
  rows = 3,
  placeholder,
  'aria-label': ariaLabel,
  'aria-required': ariaRequired,
  'aria-describedby': ariaDescribedBy,
  id,
}: {
  label: string;
  rows?: number;
  placeholder?: string;
  'aria-label'?: string;
  'aria-required'?: boolean;
  'aria-describedby'?: string;
  id?: string;
}) {
  const field = useFieldContext<string>();
  const errors = useStore(field.store, (state) => state.meta.errors);
  const fieldId = id ?? `field-${field.name}`;
  const errorId = `${fieldId}-error`;

  return (
    <div>
      <Label className="mb-2 text-xl font-bold" htmlFor={fieldId}>
        {label}
      </Label>
      <ShadcnTextarea
        aria-describedby={errors?.length ? errorId : ariaDescribedBy}
        aria-invalid={errors?.length > 0}
        aria-label={ariaLabel}
        aria-required={ariaRequired}
        className="placeholder:text-muted-foreground/70 hover:bg-accent/10"
        id={fieldId}
        placeholder={placeholder}
        rows={rows}
        value={field.state.value}
        onBlur={field.handleBlur}
        onChange={(e) => field.handleChange(e.target.value)}
      />
      {field.state.meta.isTouched && errors?.length > 0 && (
        <div className="text-destructive text-sm" id={errorId}>
          <ErrorMessages errors={errors} />
        </div>
      )}
    </div>
  );
}

export function FormSelect({
  label,
  values,
  placeholder,
  'aria-label': ariaLabel,
  'aria-required': ariaRequired,
  'aria-describedby': ariaDescribedBy,
  id,
}: {
  label: string;
  values: { label: string; value: string }[];
  placeholder?: string;
  'aria-label'?: string;
  'aria-required'?: boolean;
  'aria-describedby'?: string;
  id?: string;
}) {
  const field = useFieldContext<string>();
  const errors = useStore(field.store, (state) => state.meta.errors);
  const fieldId = id ?? `field-${field.name}`;
  const errorId = `${fieldId}-error`;

  return (
    <div>
      <Label className="mb-2 text-xl font-bold" htmlFor={fieldId}>
        {label}
      </Label>
      <ShadcnSelect.Select
        name={field.name}
        value={field.state.value}
        onValueChange={(value) => field.handleChange(value)}
      >
        <ShadcnSelect.SelectTrigger
          aria-describedby={errors?.length ? errorId : ariaDescribedBy}
          aria-invalid={errors?.length > 0}
          aria-label={ariaLabel}
          aria-required={ariaRequired}
          className="placeholder:text-muted-foreground/70 hover:bg-accent/10 w-full"
          id={fieldId}
        >
          <ShadcnSelect.SelectValue
            className="text-muted-foreground"
            placeholder={placeholder}
          />
        </ShadcnSelect.SelectTrigger>
        <ShadcnSelect.SelectContent>
          <ShadcnSelect.SelectGroup>
            <ShadcnSelect.SelectLabel>{label}</ShadcnSelect.SelectLabel>
            {values.map((value) => (
              <ShadcnSelect.SelectItem
                key={value.value}
                className="hover:bg-accent/20"
                value={value.value}
              >
                {value.label}
              </ShadcnSelect.SelectItem>
            ))}
          </ShadcnSelect.SelectGroup>
        </ShadcnSelect.SelectContent>
      </ShadcnSelect.Select>
      {field.state.meta.isTouched && errors?.length > 0 && (
        <div className="text-destructive text-sm" id={errorId}>
          <ErrorMessages errors={errors} />
        </div>
      )}
    </div>
  );
}

export function FormSlider({ label }: { label: string }) {
  const field = useFieldContext<number>();
  const errors = useStore(field.store, (state) => state.meta.errors);

  return (
    <div>
      <Label className="mb-2 text-xl font-bold" htmlFor={label}>
        {label}
      </Label>
      <ShadcnSlider
        id={label}
        value={[field.state.value]}
        onBlur={field.handleBlur}
        onValueChange={(value) => field.handleChange(value[0])}
      />
      {field.state.meta.isTouched && <ErrorMessages errors={errors} />}
    </div>
  );
}

export function FormSwitch({
  label,
  'aria-label': ariaLabel,
  'aria-describedby': ariaDescribedBy,
  id,
}: {
  label: string;
  'aria-label'?: string;
  'aria-describedby'?: string;
  id?: string;
}) {
  const field = useFieldContext<boolean>();
  const errors = useStore(field.store, (state) => state.meta.errors);
  const fieldId = id ?? `field-${field.name}`;
  const errorId = `${fieldId}-error`;

  return (
    <div>
      <div className="flex items-center gap-2">
        <ShadcnSwitch
          aria-describedby={errors?.length ? errorId : ariaDescribedBy}
          aria-invalid={errors?.length > 0}
          aria-label={ariaLabel}
          checked={field.state.value}
          id={fieldId}
          onBlur={field.handleBlur}
          onCheckedChange={(checked) => field.handleChange(checked)}
        />
        <Label htmlFor={fieldId}>{label}</Label>
      </div>
      {field.state.meta.isTouched && errors?.length > 0 && (
        <div className="text-destructive text-sm" id={errorId}>
          <ErrorMessages errors={errors} />
        </div>
      )}
    </div>
  );
}

export const { useAppForm } = createFormHook({
  fieldComponents: {
    Select: FormSelect,
    Switch: FormSwitch,
    TextArea: FormTextArea,
    TextField: FormTextField,
  },
  fieldContext,
  formComponents: {
    SubscribeButton,
  },
  formContext,
});
