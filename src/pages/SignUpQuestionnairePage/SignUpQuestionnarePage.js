import React, { useState, useEffect, useRef } from 'react';
import {
  Routes,
  Route,
  useParams,
  useLocation,
  useNavigate,
} from 'react-router-dom';
import QuestionComponent from 'src/pages/SignUpQuestionnairePage/components/QuestionComponent';
import { Input } from 'src/components/ui/input';
import { Switch } from 'src/components/ui/switch';
import { CircleCheckBig } from 'lucide-react';

// first question
import useUserStore from 'src/stores/useUserStore';
// import {useLocation} from 'react-router-dom'

// second question component imports
import serviceConstants from 'src/constants/categories';
import useServicesStore from 'src/stores/useServicesStore';

// third question
import daysConstants from 'src/constants/days';
import useSchedulesStore from 'src/stores/useSchedulesStore';
import { Button } from 'src/components/ui/button';
import PageLoader from 'src/components/PageLoader';

// last Question
// import { useNavigate } from 'react-router-dom';

const SignUpQuestionnarePage = () => {
  return (
    <div className='flex flex-col text-neutral-700 text-base'>
      <Routes>
        <Route path='/question/:index' element={<QuestionRouter />} />
      </Routes>
    </div>
  );
};

const QuestionRouter = () => {
  const { index: nonConvertedIndex } = useParams();
  const userStore = useUserStore((state) => state.user);

  const index = parseInt(nonConvertedIndex, 10);
  const last = 4;

  const progress = ((index - 1) / (last - 1)) * 100;
  if (userStore === null)
    return <PageLoader className='fixed inset-x-0 border' />;

  // Render components based on index
  if (index === 1) {
    return <FirstQuestion progress={progress} userId={userStore?._id} />;
  } else if (index === 2) {
    return <SecondQuestion progress={progress} userId={userStore?._id} />;
  } else if (index === 3) {
    return <ScheduleQuestion progress={progress} userId={userStore?._id} />;
  } else if (index === last) {
    return <ResultsQuestion progress={progress} />;
  } else {
    return <div>Question not found</div>;
  }
};

const FirstQuestion = React.memo(({ progress, userId }) => {
  // router
  const navigate = useNavigate();
  const location = useLocation();
  // zustand
  const userStore = useUserStore((state) => state.user);
  const { first_name: firstName, last_name: lastName, email } = userStore;
  const userStoreLoading = useUserStore((state) => state.isLoading);
  const patchBasicUserInfo = useUserStore((state) => state.patchBasicUserInfo);

  // local state
  const [canSubmit, setCanSubmit] = useState(
    firstName && lastName && email ? true : false
  );

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
      if (firstNameRef.current && lastNameRef.current && emailRef.current) {
        firstNameRef.current.removeEventListener('input', handleInputChange);
        lastNameRef.current.removeEventListener('input', handleInputChange);
        emailRef.current.removeEventListener('input', handleInputChange);
      }
    };
  }, [location]);

  //   This doesnt need to take agruments
  //  just needs to run
  const handleSubmit = async () => {
    console.log('firstNameRef: ', firstNameRef.current.value);
    console.log('lastNameRef: ', lastNameRef.current.value);
    console.log('emailRef: ', emailRef.current.value);
    console.log('roleRef: ', roleRef.current.getAttribute('aria-checked'));

    const firstName = firstNameRef.current.value;
    const lastName = lastNameRef.current.value;
    const email = emailRef.current.value;

    const role =
      roleRef.current.getAttribute('aria-checked') === 'true'
        ? 'client'
        : 'user';

    console.log('firstName: ', firstName);
    console.log('lastName: ', lastName);
    console.log('email: ', email);
    console.log('role: ', role);

    console.log('Call api to submit first, last, email, and role');
    await patchBasicUserInfo(userId, firstName, lastName, email, role);

    navigate('/sign-up/questionnaire/question/4');
    return role === 'user' ? true : false;
  };

  return (
    <>
      <QuestionComponent
        header='Lets Get Started!'
        className='pt-4'
        progress={progress}
        question='Tell us about yourself!'
        subQuestion='Enter your information, like your first name, last name, and email!'
        submitFunction={handleSubmit}
        canSubmit={canSubmit}
        submitLoading={userStoreLoading}
      >
        <div className='flex flex-col space-y-8 '>
          <div className='flex flex-col space-y-3'>
            <label htmlFor='firstName'>First Name:</label>
            <Input
              text='text'
              name='firstName'
              ref={firstNameRef}
              defaultValue={firstName}
            />
          </div>
          <div className='flex flex-col space-y-3'>
            <label htmlFor='lastName'>Last Name:</label>
            <Input
              text='text'
              name='lastName'
              ref={lastNameRef}
              defaultValue={lastName}
            />
          </div>
          <div className='flex flex-col space-y-3'>
            <label htmlFor='email'>Email:</label>
            <Input
              text='email'
              name='email'
              ref={emailRef}
              defaultValue={email}
            />
          </div>
          <div className='flex flex-col space-y-3'>
            <label htmlFor='role'>I am an aethetician!</label>
            <Switch id='role' ref={roleRef} className='' />
          </div>
        </div>
      </QuestionComponent>
    </>
  );
});

const SecondQuestion = React.memo(({ progress, userId }) => {
  // zustand
  const servicesStore = useServicesStore((state) => state.services);
  const servicesLoadingStore = useServicesStore((state) => state.isLoading);
  const postServicesStore = useServicesStore((state) => state.postServices);
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
  const handleSubmit = async () => {
    await postServicesStore(userId, services);
  };

  return (
    <>
      <QuestionComponent
        header='Awesome! Let’s get to know you better'
        className='pt-4'
        progress={progress}
        question="What services do you offer? We'd love to hear how you'll be bringing your expertise to the table! 🎉 "
        submitFunction={handleSubmit}
        canSubmit={services?.length > 0 ? true : false}
        submitLoading={servicesLoadingStore}
      >
        <div className='flex flex-col space-y-8'>{renderButtons}</div>
      </QuestionComponent>
    </>
  );
});

const ScheduleQuestion = React.memo(({ progress, userId }) => {
  // zustand
  const schedulesLoadingStore = useSchedulesStore((state) => state.isLoading);
  const postSchedulesStore = useSchedulesStore((state) => state.postSchedules);
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
  const handleSubmit = async () => {
    await postSchedulesStore(userId, schedules);
  };

  return (
    <>
      <QuestionComponent
        header='Last question, I promise!'
        className='pt-4'
        progress={progress}
        question='What days work best for you?'
        submitFunction={handleSubmit}
        canSubmit={schedules?.length > 0 ? true : false}
        submitLoading={schedulesLoadingStore}
      >
        <div className='flex flex-col space-y-8'>{renderButtons}</div>
      </QuestionComponent>
    </>
  );
});

// ResultsQuestionScreen
const ResultsQuestion = React.memo(({ progress }) => {
  const navigate = useNavigate();

  const submitFunction = () => {
    navigate('/');
  };

  return (
    <>
      <QuestionComponent
        header='All Done!'
        className='pt-4'
        progress={progress}
        question="You're all set! You've completed the questionnaire, great job! 🎉"
        subQuestion='Now, click continue to return to your dashboard and explore a world of talented aestheticians nearby, ready to help you look and feel your best. Let’s get glowing!'
        submitFunction={submitFunction}
        canSubmit={true}
      >
        <div className='flex justify-center my-10'>
          <CircleCheckBig size='80' className='text-primary border-primary' />
        </div>
      </QuestionComponent>
    </>
  );
});

export default SignUpQuestionnarePage;
