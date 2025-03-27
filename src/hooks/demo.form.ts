import { createFormHook } from '@tanstack/react-form';

import {
  FormSelect,
  FormTextArea,
  FormTextField,
  SubscribeButton,
} from '@/components/demo.FormComponents';
import { fieldContext, formContext } from '@/hooks/demo.form-context';

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
