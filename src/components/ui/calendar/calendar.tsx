import { differenceInCalendarDays } from 'date-fns';
import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react';
import * as React from 'react';
import {
  DayPicker,
  type DayPickerProps,
  labelNext,
  labelPrevious,
  useDayPicker,
} from 'react-day-picker';

import { Button, buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export type CalendarProps = DayPickerProps & {
  /**
   * In the year view, the number of years to display at once.
   * @default 12
   */
  yearRange?: number;

  /**
   * Wether to show the year switcher in the caption.
   * @default true
   */
  showYearSwitcher?: boolean;

  monthsClassName?: string;
  monthCaptionClassName?: string;
  weekdaysClassName?: string;
  weekdayClassName?: string;
  monthClassName?: string;
  captionClassName?: string;
  captionLabelClassName?: string;
  buttonNextClassName?: string;
  buttonPreviousClassName?: string;
  navClassName?: string;
  monthGridClassName?: string;
  weekClassName?: string;
  dayClassName?: string;
  dayButtonClassName?: string;
  rangeStartClassName?: string;
  rangeEndClassName?: string;
  selectedClassName?: string;
  todayClassName?: string;
  outsideClassName?: string;
  disabledClassName?: string;
  rangeMiddleClassName?: string;
  hiddenClassName?: string;
};

type NavView = 'days' | 'years';

/**
 * A custom calendar component built on top of react-day-picker.
 * @param props The props for the calendar.
 * @default yearRange 12
 * @returns
 */
function Calendar({
  className,
  showOutsideDays = true,
  showYearSwitcher = true,
  yearRange = 12,
  numberOfMonths,
  ...props
}: CalendarProps) {
  const [navView, setNavView] = React.useState<NavView>('days');
  const [displayYears, setDisplayYears] = React.useState<{
    from: number;
    to: number;
  }>(
    React.useMemo(() => {
      const currentYear = new Date().getFullYear();
      return {
        from: currentYear - Math.floor(yearRange / 2 - 1),
        to: currentYear + Math.ceil(yearRange / 2),
      };
    }, [yearRange]),
  );

  const { onNextClick, onPrevClick, startMonth, endMonth } = props;

  const columnsDisplayed = navView === 'years' ? 1 : numberOfMonths;

  const _monthsClassName = cn('relative flex', props.monthsClassName);
  const _monthCaptionClassName = cn(
    'relative mx-10 flex h-7 items-center justify-center',
    props.monthCaptionClassName,
  );
  const _weekdaysClassName = cn('flex flex-row', props.weekdaysClassName);
  const _weekdayClassName = cn(
    'w-8 text-sm font-normal text-[--color-calendar-muted]',
    props.weekdayClassName,
  );
  const _monthClassName = cn('w-full', props.monthClassName);
  const _captionClassName = cn(
    'relative flex items-center justify-center pt-1',
    props.captionClassName,
  );
  const _captionLabelClassName = cn(
    'truncate text-sm font-medium text-[--color-calendar]',
    props.captionLabelClassName,
  );
  const buttonNavClassName = buttonVariants({
    className:
      'absolute h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100',
    variant: 'outline',
  });
  const _buttonNextClassName = cn(
    buttonNavClassName,
    'right-0',
    props.buttonNextClassName,
  );
  const _buttonPreviousClassName = cn(
    buttonNavClassName,
    'left-0',
    props.buttonPreviousClassName,
  );
  const _navClassName = cn('flex items-start', props.navClassName);
  const _monthGridClassName = cn(
    'mx-auto mt-4 text-[--color-calendar]',
    props.monthGridClassName,
  );
  const _weekClassName = cn(
    'mt-2 flex w-max items-start text-[--color-calendar]',
    props.weekClassName,
  );
  const _dayClassName = cn(
    'flex size-8 flex-1 items-center justify-center p-0 text-sm font-medium text-[--color-calendar]',
    props.dayClassName,
  );
  const _dayButtonClassName = cn(
    buttonVariants({ variant: 'ghost' }),
    'size-8 rounded-md p-0 font-medium transition-none aria-selected:opacity-100 text-[--color-calendar] hover:bg-[--color-calendar-range-middle] hover:text-[--color-calendar]',
    props.dayButtonClassName,
  );
  const buttonRangeClassName =
    'bg-[--color-calendar-range-middle] [&>button]:bg-[--color-calendar-range-from] [&>button]:text-[--color-calendar-selected-foreground] [&>button]:hover:bg-[--color-calendar-range-from]/90';
  const _rangeStartClassName = cn(
    buttonRangeClassName,
    'day-range-start rounded-s-md',
    props.rangeStartClassName,
  );
  const _rangeEndClassName = cn(
    buttonRangeClassName,
    'day-range-end rounded-e-md',
    props.rangeEndClassName,
  );
  const _rangeMiddleClassName = cn(
    'bg-[--color-calendar-range-middle] [&>button]:bg-transparent [&>button]:text-[--color-calendar] [&>button]:hover:bg-transparent',
    props.rangeMiddleClassName,
  );
  const _selectedClassName = cn(
    '[&>button]:bg-[--color-calendar-selected] [&>button]:text-[--color-calendar-selected-foreground] [&>button]:hover:bg-[--color-calendar-selected]/90',
    props.selectedClassName,
  );
  const _todayClassName = cn(
    '[&>button]:bg-[--color-calendar-today] [&>button]:text-[--color-calendar-selected-foreground]',
    props.todayClassName,
  );
  const _outsideClassName = cn(
    'day-outside font-medium text-[--color-calendar-muted] opacity-100 aria-selected:bg-[--color-calendar-range-middle]/50',
    props.outsideClassName,
  );
  const _disabledClassName = cn(
    'text-[--color-calendar-disabled] font-medium opacity-100',
    props.disabledClassName,
  );
  const _hiddenClassName = cn('invisible flex-1', props.hiddenClassName);

  return (
    <DayPicker
      className={cn('p-3', className)}
      classNames={{
        button_next: _buttonNextClassName,
        button_previous: _buttonPreviousClassName,
        caption: _captionClassName,
        caption_label: _captionLabelClassName,
        day: _dayClassName,
        day_button: _dayButtonClassName,
        disabled: _disabledClassName,
        hidden: _hiddenClassName,
        month: _monthClassName,
        month_caption: _monthCaptionClassName,
        month_grid: _monthGridClassName,
        months: _monthsClassName,
        nav: _navClassName,
        outside: _outsideClassName,
        range_end: _rangeEndClassName,
        range_middle: _rangeMiddleClassName,
        range_start: _rangeStartClassName,
        selected: _selectedClassName,
        today: _todayClassName,
        week: _weekClassName,
        weekday: _weekdayClassName,
        weekdays: _weekdaysClassName,
      }}
      components={{
        CaptionLabel: (props) => (
          <CaptionLabel
            displayYears={displayYears}
            navView={navView}
            setNavView={setNavView}
            showYearSwitcher={showYearSwitcher}
            {...props}
          />
        ),
        Chevron: ({ orientation }) => {
          const Icon =
            orientation === 'left' ? ChevronLeftIcon : ChevronRightIcon;
          return <Icon className="h-4 w-4" />;
        },
        MonthGrid: ({ className, children, ...props }) => (
          <MonthGrid
            children={children}
            className={className}
            displayYears={displayYears}
            endMonth={endMonth}
            navView={navView}
            setNavView={setNavView}
            startMonth={startMonth}
            {...props}
          />
        ),
        Nav: ({ className }) => (
          <Nav
            className={className}
            displayYears={displayYears}
            endMonth={endMonth}
            navView={navView}
            setDisplayYears={setDisplayYears}
            startMonth={startMonth}
            onNextClick={onNextClick}
            onPrevClick={onPrevClick}
          />
        ),
      }}
      numberOfMonths={columnsDisplayed}
      showOutsideDays={showOutsideDays}
      style={{
        width: 248.8 * (columnsDisplayed ?? 1) + 'px',
      }}
      {...props}
    />
  );
}
Calendar.displayName = 'Calendar';

function Nav({
  className,
  navView,
  startMonth,
  endMonth,
  displayYears,
  setDisplayYears,
  onPrevClick,
  onNextClick,
}: {
  className?: string;
  navView: NavView;
  startMonth?: Date;
  endMonth?: Date;
  displayYears: { from: number; to: number };
  setDisplayYears: React.Dispatch<
    React.SetStateAction<{ from: number; to: number }>
  >;
  onPrevClick?: (date: Date) => void;
  onNextClick?: (date: Date) => void;
}) {
  const { nextMonth, previousMonth, goToMonth } = useDayPicker();

  const isPreviousDisabled = (() => {
    if (navView === 'years') {
      return (
        (startMonth
          && differenceInCalendarDays(
            new Date(displayYears.from - 1, 0, 1),
            startMonth,
          ) < 0)
        ?? (endMonth
          && differenceInCalendarDays(
            new Date(displayYears.from - 1, 0, 1),
            endMonth,
          ) > 0)
      );
    }
    return !previousMonth;
  })();

  const isNextDisabled = (() => {
    if (navView === 'years') {
      return (
        (startMonth
          && differenceInCalendarDays(
            new Date(displayYears.to + 1, 0, 1),
            startMonth,
          ) < 0)
        ?? (endMonth
          && differenceInCalendarDays(
            new Date(displayYears.to + 1, 0, 1),
            endMonth,
          ) > 0)
      );
    }
    return !nextMonth;
  })();

  const handlePreviousClick = React.useCallback(() => {
    if (!previousMonth) return;
    if (navView === 'years') {
      setDisplayYears((prev) => ({
        from: prev.from - (prev.to - prev.from + 1),
        to: prev.to - (prev.to - prev.from + 1),
      }));
      onPrevClick?.(
        new Date(
          displayYears.from - (displayYears.to - displayYears.from),
          0,
          1,
        ),
      );
      return;
    }
    goToMonth(previousMonth);
    onPrevClick?.(previousMonth);
  }, [previousMonth, goToMonth]);

  const handleNextClick = React.useCallback(() => {
    if (!nextMonth) return;
    if (navView === 'years') {
      setDisplayYears((prev) => ({
        from: prev.from + (prev.to - prev.from + 1),
        to: prev.to + (prev.to - prev.from + 1),
      }));
      onNextClick?.(
        new Date(
          displayYears.from + (displayYears.to - displayYears.from),
          0,
          1,
        ),
      );
      return;
    }
    goToMonth(nextMonth);
    onNextClick?.(nextMonth);
  }, [goToMonth, nextMonth]);
  return (
    <nav className={cn('flex items-center text-[--color-calendar]', className)}>
      <Button
        aria-label={
          navView === 'years' ?
            `Go to the previous ${
              displayYears.to - displayYears.from + 1
            } years`
          : labelPrevious(previousMonth)
        }
        className="absolute left-0 h-7 w-7 bg-transparent p-0 text-[--color-calendar] opacity-80 hover:opacity-100"
        disabled={isPreviousDisabled}
        tabIndex={isPreviousDisabled ? undefined : -1}
        type="button"
        variant="outline"
        onClick={handlePreviousClick}
      >
        <ChevronLeftIcon className="h-4 w-4" />
      </Button>

      <Button
        aria-label={
          navView === 'years' ?
            `Go to the next ${displayYears.to - displayYears.from + 1} years`
          : labelNext(nextMonth)
        }
        className="absolute right-0 h-7 w-7 bg-transparent p-0 text-[--color-calendar] opacity-80 hover:opacity-100"
        disabled={isNextDisabled}
        tabIndex={isNextDisabled ? undefined : -1}
        type="button"
        variant="outline"
        onClick={handleNextClick}
      >
        <ChevronRightIcon className="h-4 w-4" />
      </Button>
    </nav>
  );
}

function CaptionLabel({
  children,
  showYearSwitcher,
  navView,
  setNavView,
  displayYears,
  ...props
}: {
  showYearSwitcher?: boolean;
  navView: NavView;
  setNavView: React.Dispatch<React.SetStateAction<NavView>>;
  displayYears: { from: number; to: number };
} & React.HTMLAttributes<HTMLSpanElement>) {
  if (!showYearSwitcher)
    return (
      <span className="font-medium text-[--color-calendar]" {...props}>
        {children}
      </span>
    );
  return (
    <Button
      className="h-7 w-full truncate text-sm font-medium text-[--color-calendar] hover:bg-[--color-calendar-range-middle] hover:text-[--color-calendar]"
      size="sm"
      variant="ghost"
      onClick={() => setNavView((prev) => (prev === 'days' ? 'years' : 'days'))}
    >
      {navView === 'days' ?
        children
      : displayYears.from + ' - ' + displayYears.to}
    </Button>
  );
}

function MonthGrid({
  className,
  children,
  displayYears,
  startMonth,
  endMonth,
  navView,
  setNavView,
  ...props
}: {
  className?: string;
  children: React.ReactNode;
  displayYears: { from: number; to: number };
  startMonth?: Date;
  endMonth?: Date;
  navView: NavView;
  setNavView: React.Dispatch<React.SetStateAction<NavView>>;
} & React.TableHTMLAttributes<HTMLTableElement>) {
  if (navView === 'years') {
    return (
      <YearGrid
        className={className}
        displayYears={displayYears}
        endMonth={endMonth}
        navView={navView}
        setNavView={setNavView}
        startMonth={startMonth}
        {...props}
      />
    );
  }
  return (
    <table className={className} {...props}>
      {children}
    </table>
  );
}

function YearGrid({
  className,
  displayYears,
  startMonth,
  endMonth,
  setNavView,
  navView,
  ...props
}: {
  className?: string;
  displayYears: { from: number; to: number };
  startMonth?: Date;
  endMonth?: Date;
  setNavView: React.Dispatch<React.SetStateAction<NavView>>;
  navView: NavView;
} & React.HTMLAttributes<HTMLDivElement>) {
  const { goToMonth, selected } = useDayPicker();

  return (
    <div
      className={cn('[&_*]:!text-foreground grid grid-cols-4 gap-2', className)}
      {...props}
    >
      {Array.from(
        { length: displayYears.to - displayYears.from + 1 },
        (_, i) => {
          const isBefore =
            differenceInCalendarDays(
              new Date(displayYears.from + i, 11, 31),
              startMonth!,
            ) < 0;

          const isAfter =
            differenceInCalendarDays(
              new Date(displayYears.from + i, 0, 0),
              endMonth!,
            ) > 0;

          const isDisabled = isBefore || isAfter;
          const isCurrentYear =
            displayYears.from + i === new Date().getFullYear();

          return (
            <Button
              key={i}
              className={cn(
                '!text-foreground h-7 w-full text-sm font-medium',
                isCurrentYear && 'bg-primary !text-primary-foreground',
                isDisabled && '!text-muted-foreground opacity-50',
                !isDisabled && !isCurrentYear && '!text-foreground',
                'hover:bg-accent hover:!text-accent-foreground',
              )}
              disabled={navView === 'years' ? isDisabled : undefined}
              variant="ghost"
              onClick={() => {
                setNavView('days');
                goToMonth(
                  new Date(
                    displayYears.from + i,
                    (selected as Date | undefined)?.getMonth() ?? 0,
                  ),
                );
              }}
            >
              {displayYears.from + i}
            </Button>
          );
        },
      )}
    </div>
  );
}

export { Calendar };
