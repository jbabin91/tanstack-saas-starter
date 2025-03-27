import { createFormHook } from '@tanstack/react-form';

import {
  FormSelect,
  FormTextArea,
  FormTextField,
  SubscribeButton,
} from '@/components/ui/form';
import { fieldContext, formContext } from '@/contexts/form-context';

export const { useAppForm } = createFormHook({
  fieldComponents: {
    Select: FormSelect,
    TextArea: FormTextArea,
    TextField: FormTextField,
  },
  fieldContext,
  formComponents: {
    SubscribeButton,
  },
  formContext,
});
