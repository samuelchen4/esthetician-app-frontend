import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button } from 'src/components/ui/button';
import { Progress } from 'src/components/ui/progress';
import { cn } from 'src/lib/utils';
import PulseLoader from 'src/components/PulseLoader';

const QuestionComponent = ({
  header,
  last = 5,
  question,
  subQuestion = '',
  progress,
  children,
  submitFunction,
  className,
  canSubmit,
  submitLoading,
}) => {
  // react router
  const navigate = useNavigate();
  // params
  const { index: nonConvertedIndex } = useParams();
  const index = parseInt(nonConvertedIndex, 10);
  console.log('index: ', index);

  const goBack = (e) => {
    e.preventDefault();
    const newIndex = index - 1;
    if (newIndex > 0) {
      navigate(`../question/${newIndex}`);
    }
  };

  const goNext = async (e) => {
    e.preventDefault();
    // run api call
    // check if rest of code should execute
    const skipRest = await submitFunction();
    if (skipRest === true) return;
    // ++index
    const newIndex = index + 1;
    console.log('newIndex: ', newIndex);
    // navigate to next page
    if (newIndex < last) {
      navigate(`../question/${newIndex}`);
    }
  };

  return (
    // <div className='flex flex-col'>
    <form className={cn('flex flex-col', className)} onSubmit={goNext}>
      <div
        id='question-component-title'
        className='flex flex-col space-y-4 px-4'
      >
        <h3 className='font-semibold text-3xl text-black'>{header}</h3>
        <Progress value={progress} className='h-2 rounded-md ' />
        <p className='text-sm'>Question {index}</p>
        <p className='text-xl'>{question}</p>
        {subQuestion && <p>{subQuestion}</p>}
      </div>
      <div className='px-4 py-8 mb-[60px]'>{children}</div>
      <div className='fixed bottom-0 border-t w-full py-3 px-4 flex justify-between bg-white'>
        {index !== 4 && (
          <button
            className='py-2 px-3 border border-gray-100 rounded-lg bg-gray-50 shadow-sm'
            type='button'
            onClick={goBack}
          >
            back
          </button>
        )}
        <Button
          className={cn(
            'py-2 px-3 border rounded-lg shadow-sm text-gray-400 bg-gray-50 ml-auto',
            canSubmit && 'text-white bg-primary border-primary'
          )}
          type='submit'
          disabled={!canSubmit || submitLoading}
        >
          {submitLoading ? <PulseLoader /> : 'Continue'}
        </Button>
      </div>
    </form>
  );
};

export default QuestionComponent;
