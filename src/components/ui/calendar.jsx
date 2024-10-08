import * as React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { DayPicker } from 'react-day-picker';

import { cn } from 'src/lib/utils';
import { buttonVariants } from 'src/components/ui/button';

function Calendar({ className, classNames, showOutsideDays = true, ...props }) {
  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn(className)}
      classNames={{
        months:
          'w-full mx-auto flex flex-col space-y-4 sm:flex-row sm:space-y-0 sm:space-x-6',
        month: ' space-y-2 sm:grow',
        caption: 'flex justify-center py-1 relative items-center',
        caption_label: 'text-sm font-medium',
        nav: 'space-x-1 flex items-center',
        nav_button: cn(
          buttonVariants({ variant: 'outline' }),
          'h-8 w-8 bg-transparent p-0 opacity-50 hover:opacity-100'
        ),
        nav_button_previous: 'hidden absolute left-1 sm:block ',
        nav_button_next: 'hidden  absolute right-1 sm:block',
        table: 'w-full border-collapse space-y-1',
        head_row: 'flex pb-2 border-b',
        head_cell: 'w-full text-gray-500 rounded-md font-normal text-[0.8rem]',
        row: 'flex w-full mt-2',
        cell: 'w-full aspect-1 rounded-md text-center text-sm p-auto relative [&:has([aria-selected].day-range-end)]:rounded-r-md [&:has([aria-selected].day-outside)]:bg-gray-100/50 [&:has([aria-selected])]:bg-gray-100 first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20 ',
        day: cn(
          buttonVariants({ variant: 'ghost' }),
          'w-full h-full aspect-1 p-0 font-normal aria-selected:opacity-100'
        ),
        day_range_end: 'day-range-end',
        day_selected:
          ' bg-gray-700 text-gray-50 hover:bg-gray-900 hover:text-gray-50 focus:bg-gray-900 focus:text-gray-50 ',
        day_today: 'bg-gray-200 text-gray-900',
        day_outside:
          'day-outside text-gray-500 opacity-50 aria-selected:bg-gray-100/50 aria-selected:text-gray-500 aria-selected:opacity-30 ',
        day_disabled: 'text-gray-500 opacity-50',
        day_range_middle:
          'aria-selected:bg-gray-100 aria-selected:text-gray-900',
        day_hidden: 'invisible',
        ...classNames,
      }}
      components={{
        IconLeft: ({ ...props }) => <ChevronLeft className='h-4 w-4' />,
        IconRight: ({ ...props }) => <ChevronRight className='h-4 w-4' />,
      }}
      {...props}
    />
  );
}
Calendar.displayName = 'Calendar';

export { Calendar };
