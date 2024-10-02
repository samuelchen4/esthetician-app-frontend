import React, { useState, useEffect, useRef } from 'react';
import { Routes, Route, useParams } from 'react-router-dom';
import QuestionComponent from 'src/pages/SignUpQuestionnairePage/components/QuestionComponent';
import { Input } from 'src/components/ui/input';
import { Switch } from 'src/components/ui/switch';

// second question component imports
import serviceConstants from 'src/constants/categories';

// third question
import daysConstants from 'src/constants/days';
import { Button } from 'src/components/ui/button';

const SignUpQuestionnarePage = () => {
  return (
    <div className='scrollable-container flex flex-col text-neutral-600 animate-fadeIn'>
      <Routes>
        <Route path='/question/:index' element={<QuestionRouter />} />
      </Routes>
    </div>
  );
};

const QuestionRouter = () => {
  const { index: nonConvertedIndex } = useParams();

  const index = parseInt(nonConvertedIndex, 10);

  const progress = ((index - 1) / 3) * 100;

  // Render components based on index
  if (index === 1) {
    return <FirstQuestion progress={progress} />;
  } else if (index === 2) {
    return <SecondQuestion progress={progress} />;
  } else if (index === 3) {
    return <ScheduleQuestion progress={progress} />;
  } else {
    return <div>Question not found</div>;
  }
};

const FirstQuestion = React.memo(({ progress }) => {
  // local state
  const [canSubmit, setCanSubmit] = useState(false);

  // local ref
  const firstNameRef = useRef(null);
  const lastNameRef = useRef(null);
  const emailRef = useRef(null);
  const roleRef = useRef(null);

  const checkFieldsFilled = () => {
    if (
      firstNameRef.current.value !== '' &&
      lastNameRef.current.value !== '' &&
      emailRef.current.value !== ''
    ) {
      setCanSubmit(true);
    } else {
      setCanSubmit(false);
    }
  };

  // Attach `onInput` event listeners to check the values as the user types
  useEffect(() => {
    const handleInputChange = () => checkFieldsFilled();

    firstNameRef.current.addEventListener('input', handleInputChange);
    lastNameRef.current.addEventListener('input', handleInputChange);
    emailRef.current.addEventListener('input', handleInputChange);

    // Cleanup event listeners on unmount
    return () => {
      firstNameRef.current.removeEventListener('input', handleInputChange);
      lastNameRef.current.removeEventListener('input', handleInputChange);
      emailRef.current.removeEventListener('input', handleInputChange);
    };
  }, []);

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
        canSubmit={canSubmit}
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
            <label htmlFor='role'>I am selling services!</label>
            <Switch id='role' ref={roleRef} />
          </div>
        </div>
      </QuestionComponent>
    </>
  );
});

const SecondQuestion = React.memo(({ progress }) => {
  // local state
  // has to be state bc we need to rerender for the buttons
  const [services, setServices] = useState([]);

  const renderButtons = serviceConstants.map((service) => {
    const handleClick = (e) => {
      console.log('event: ', e.target.name);
      const newService = e.target.name;
      // situation changes depending if service is on there
      setServices((prevState) => {
        // if previous state is on there
        if (prevState.includes(newService)) {
          const updatedState = prevState.filter(
            (service) => service !== newService
          );
          console.log(updatedState);
          return updatedState;
        } else {
          const updatedState = [...prevState, newService];
          console.log(updatedState);
          return updatedState;
        }
      });
    };

    return (
      <Button
        type='button'
        name={service}
        key={service}
        className={`py-2 px-4 border border-blue-500 text-blue-500 bg-white
            ${
              services.includes(service) &&
              'bg-blue-200 border-blue-200 text-black'
            }`}
        onClick={handleClick}
      >
        {service}
      </Button>
    );
  });
  //   This doesnt need to take agruments
  //  just needs to run
  const handleSubmit = () => {};

  return (
    <>
      <QuestionComponent
        header='Awesome! Let’s get to know you better'
        className='pt-4 animate-fadeIn'
        progress={progress}
        question="What services do you offer? We'd love to hear how you'll be bringing your expertise to the table! 🎉 "
        submitFunction={handleSubmit}
      >
        <div className='flex flex-col space-y-8'>{renderButtons}</div>
      </QuestionComponent>
    </>
  );
});

const ScheduleQuestion = React.memo(({ progress }) => {
  // local state
  // has to be state bc we need to rerender for the buttons
  const [schedules, setSchedules] = useState([]);

  const renderButtons = daysConstants.map((schedule) => {
    const handleClick = (e) => {
      console.log('event: ', e.target.name);
      const newSchedule = e.target.name;
      // situation changes depending if service is on there
      setSchedules((prevState) => {
        // if previous state is on there
        if (prevState.includes(newSchedule)) {
          const updatedState = prevState.filter(
            (schedule) => schedule !== newSchedule
          );
          console.log(updatedState);
          return updatedState;
        } else {
          const updatedState = [...prevState, newSchedule];
          console.log(updatedState);
          return updatedState;
        }
      });
    };

    return (
      <Button
        type='button'
        name={schedule}
        key={schedule}
        className={`py-2 px-4 border border-blue-500 text-blue-500 bg-white
            ${
              schedules.includes(schedule) &&
              'bg-blue-200 border-blue-200 text-black'
            }`}
        onClick={handleClick}
      >
        {schedule}
      </Button>
    );
  });
  //   This doesnt need to take agruments
  //  just needs to run
  const handleSubmit = () => {};

  return (
    <>
      <QuestionComponent
        header='Last question, I promise!'
        className='pt-4 animate-fadeIn'
        progress={progress}
        question='What days work best for you?'
        submitFunction={handleSubmit}
      >
        <div className='flex flex-col space-y-8'>{renderButtons}</div>
      </QuestionComponent>
    </>
  );
});

export default SignUpQuestionnarePage;
