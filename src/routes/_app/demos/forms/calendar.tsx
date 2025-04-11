import { createFileRoute } from '@tanstack/react-router';
import { addDays } from 'date-fns';
import * as React from 'react';

import { Calendar } from '@/components/ui/calendar';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { useTranslations } from '@/hooks/use-translations';

export const Route = createFileRoute('/_app/demos/forms/calendar')({
  component: CalendarDemo,
});

function CalendarDemo() {
  const { t } = useTranslations();
  const [date, setDate] = React.useState<Date | undefined>(() =>
    addDays(new Date(), 2),
  );

  return (
    <Card className="w-full max-w-2xl">
      <CardHeader>
        <CardTitle>{t('forms.calendar.title')}</CardTitle>
        <CardDescription>{t('forms.calendar.description')}</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col items-center space-y-4">
        <div className="space-y-2">
          <h3 className="text-lg font-medium">
            {t('forms.calendar.singleDateTitle')}
          </h3>
          <Calendar
            className="rounded-md border"
            mode="single"
            selected={date}
            onSelect={setDate}
          />
        </div>

        <div className="space-y-2">
          <h3 className="text-lg font-medium">
            {t('forms.calendar.multipleMonthsTitle')}
          </h3>
          <Calendar
            className="rounded-md border"
            mode="single"
            numberOfMonths={2}
            selected={date}
            onSelect={setDate}
          />
        </div>
      </CardContent>
    </Card>
  );
}
