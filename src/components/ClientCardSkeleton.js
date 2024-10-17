import { Skeleton } from 'src/components/ui/skeleton';

export function ClientCardSkeleton() {
  return (
    <div
      id='card-container'
      className='p-4 min-w-[200px] sm:max-w-[350px] w-full flex flex-col flex-auto border rounded-lg text-xs shadow-md my-2'
    >
      <Skeleton className='h-[100px] w-full rounded-xl mb-2' />
      <div id='card-title' className='flex justify-between pb-4 mb-2'>
        <Skeleton className='rounded-full h-[70px] w-[70px]' />
        <div
          id='client-title-details'
          className='grow ml-3 flex flex-col justify-between'
        >
          <Skeleton className='h-4 w-3/5' />
          <Skeleton className='h-4 w-1/3' />
          <Skeleton className='h-4' />
        </div>
      </div>
    </div>
  );
}
