import { createFormHook } from '@tanstack/react-form';

import {
  Select,
  SubscribeButton,
  TextArea,
  TextField,
} from '@/components/demo.FormComponents';
import { fieldContext, formContext } from '@/hooks/demo.form-context';

export const { useAppForm } = createFormHook({
  fieldComponents: {
    Select,
    TextArea,
    TextField,
  },
  fieldContext,
  formComponents: {
    SubscribeButton,
  },
  formContext,
});
