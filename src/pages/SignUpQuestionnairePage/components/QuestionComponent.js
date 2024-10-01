import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Progress } from 'src/components/ui/progress';
import { cn } from 'src/lib/utils';

const QuestionComponent = ({
  header,
  last = 5,
  question,
  subQuestion = '',
  progress,
  children,
  submitFunction,
  className,
}) => {
  // react router
  const navigate = useNavigate();
  // params
  const { index: nonConvertedIndex } = useParams();
  const index = parseInt(nonConvertedIndex, 10);
  console.log('index: ', index);

  const goBack = () => {
    const newIndex = index - 1;
    if (newIndex > 0) {
      navigate(`../question/${newIndex}`);
    }
  };

  const goNext = (e) => {
    e.preventDefault();
    // run api call
    submitFunction();
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
    <form className={cn('grow flex flex-col', className)} onSubmit={goNext}>
      <div
        id='question-component-title'
        className='flex flex-col space-y-4 px-4'
      >
        <h3 className='font-semibold text-xl text-black'>{header}</h3>
        <Progress value={progress} className='h-2 rounded-md ' />
        <p className='text-sm'>Question {index}</p>
        <p>{question}</p>
        {subQuestion && <p className='text-sm'>{subQuestion}</p>}
      </div>
      <div className='px-4 py-8'>{children}</div>
      <div className='fixed bottom-0 border-t-2 w-full py-3 px-4 flex justify-between'>
        <button
          className='py-2 px-3 border border-gray-100 rounded-lg bg-gray-50 shadow-sm'
          onClick={goBack}
        >
          back
        </button>
        <button
          className='py-2 px-3 border rounded-lg text-white bg-primary border-primary shadow-sm'
          type='submit'
        >
          {index === last ? 'Submit' : 'Continue'}
        </button>
      </div>
    </form>
  );
};

export default QuestionComponent;
