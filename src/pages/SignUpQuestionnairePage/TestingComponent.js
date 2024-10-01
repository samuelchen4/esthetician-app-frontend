import React, { useState, useRef } from 'react';
import { Routes, Route, useParams } from 'react-router-dom';
import QuestionComponent from 'src/pages/SignUpQuestionnairePage/components/QuestionComponent';
import { Input } from 'src/components/ui/input';
import { Label } from 'src/components/ui/label';
import Toggle from 'src/components/Toggle';
import { Switch } from 'src/components/ui/switch';

const TestingComponent = ({
  children,
  header,
  question,
  subQuestion = '',
  submitFunction,
  className,
}) => {
  return (
    <div className='h-full flex flex-col text-neutral-600'>
      <p>This is the testing component</p>
    </div>
  );
};

const QuestionRouter = () => {
  const { index: nonConvertedIndex } = useParams();

  const index = parseInt(nonConvertedIndex, 10);

  const progress = (index / 5) * 100;

  // Render components based on index
  if (index === 1) {
    return <FirstQuestion progress={progress} />;
  } else if (index === 2) {
    return <SecondQuestion progress={progress} />;
  } else {
    return <div>Question not found</div>;
  }
};

const FirstQuestion = React.memo(({ progress }) => {
  // local ref
  const firstNameRef = useRef(null);
  const lastNameRef = useRef(null);
  const emailRef = useRef(null);
  const roleRef = useRef(null);

  //   This doesnt need to take agruments
  //  just needs to run
  const handleSubmit = () => {
    console.log('firstNameRef: ', firstNameRef.current.value);
    console.log('lastNameRef: ', lastNameRef.current.value);
    console.log('emailRef: ', emailRef.current.value);
    console.log('roleRef: ', roleRef.current.getAttribute('aria-checked'));

    console.log('Call api to submit first, last, email, and role');
  };

  return (
    <>
      <QuestionComponent
        header='Lets Get Started!'
        className='pt-4 animate-fadeIn'
        progress={progress}
        question='Tell us about yourself!'
        subQuestion='Enter your information, like your first name, last name, and email!'
        submitFunction={handleSubmit}
      >
        <div className='flex flex-col space-y-8'>
          <div className='flex flex-col space-y-3'>
            <label htmlFor='firstName'>First Name:</label>
            <Input text='text' name='firstName' ref={firstNameRef} />
          </div>
          <div className='flex flex-col space-y-3'>
            <label htmlFor='lastName'>Last Name:</label>
            <Input text='text' name='lastName' ref={lastNameRef} />
          </div>
          <div className='flex flex-col space-y-3'>
            <label htmlFor='email'>Email:</label>
            <Input text='email' name='email' ref={emailRef} />
          </div>
          <div className='flex flex-col space-y-3'>
            {/* <Toggle checked={state.isClient} onChange={handleToggleChange} /> */}
            <label htmlFor='role'>I am selling services!</label>
            <Switch id='role' ref={roleRef} />
          </div>
        </div>
      </QuestionComponent>
    </>
  );
});

const SecondQuestion = React.memo(({ progress }) => {
  // local ref
  const firstNameRef = useRef(null);
  const lastNameRef = useRef(null);
  const emailRef = useRef(null);
  const roleRef = useRef(null);

  //   This doesnt need to take agruments
  //  just needs to run
  const handleSubmit = () => {
    console.log('firstNameRef: ', firstNameRef.current.value);
    console.log('lastNameRef: ', lastNameRef.current.value);
    console.log('emailRef: ', emailRef.current.value);
    console.log('roleRef: ', roleRef.current.getAttribute('aria-checked'));

    console.log('Call api to submit first, last, email, and role');
  };

  return (
    <>
      <QuestionComponent
        header='Awesome! Let’s get to know you better'
        className='pt-4 animate-fadeIn'
        progress={progress}
        question="What services do you offer? We'd love to hear how you'll be bringing your expertise to the table! 🎉 "
        // subQuestion='Enter your information, like your first name, last name, and email!'
        submitFunction={handleSubmit}
      >
        <div className='flex flex-col space-y-8'>
          <div className='flex flex-col space-y-3'>
            <label htmlFor='firstName'>First Name:</label>
            <Input text='text' name='firstName' ref={firstNameRef} />
          </div>
          <div className='flex flex-col space-y-3'>
            <label htmlFor='lastName'>Last Name:</label>
            <Input text='text' name='lastName' ref={lastNameRef} />
          </div>
          <div className='flex flex-col space-y-3'>
            <label htmlFor='email'>Email:</label>
            <Input text='email' name='email' ref={emailRef} />
          </div>
          <div className='flex flex-col space-y-3'>
            {/* <Toggle checked={state.isClient} onChange={handleToggleChange} /> */}
            <label htmlFor='role'>I am selling services!</label>
            <Switch id='role' ref={roleRef} />
          </div>
        </div>
      </QuestionComponent>
    </>
  );
});

export default TestingComponent;
