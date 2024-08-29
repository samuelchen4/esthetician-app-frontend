import React, { useState, useEffect, useRef } from 'react';
import { Progress } from 'src/components/ui/progress';
import { categories } from 'src/constants/categories';
import { days } from 'src/constants/days';
// import EventCalendar from 'src/components/EventCalendar';

const SignUpQuestionnairePage = () => {
  // Pass in an array of objects to this component which will contain:
  // progress value, question, inputs,
  const [index, setIndex] = useState(0);

  useEffect(() => {
    console.log('index: ', index);
  }, [index]);

  const [basicInfo, setBasicInfo] = useState({
    firstName: '',
    lastName: '',
    email: '',
  });
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedDays, setSelectedDays] = useState([]);
  // set as Ref
  const answersRef = useRef([]);

  // Check what answersRef looks like
  useEffect(() => {
    console.log('answersRef.current: ', answersRef.current);
  }, [answersRef.current]);

  const incrementIndex = () => {
    if (index < questionsArray.length - 1) {
      setIndex(index + 1);
    }
  };

  const decrementIndex = () => {
    if (index > 0) {
      setIndex(index - 1);
    }
  };

  const saveAnswer = () => {
    const currentQuestion = questionsArray[index];
    const answer = currentQuestion.getAnswer();
    answersRef.current[index] = answer;
  };

  const handleSubmit = () => {
    saveAnswer();
    // If index === questionsArray.length - 1 then submit
    if (index === questionsArray.length - 1) {
      console.log('Submit to API');
    } else {
      incrementIndex();
    }
  };

  // component that handles all the buttons and has a state that has all the selected categories
  // takes in a list of categories
  const ValuesComponent = ({ constants, state, setter }) => {
    useEffect(() => {
      console.log('state:', state);
    }, [state]);

    const handleValueClick = (value) => {
      setter((prevState) => {
        const containsValue = prevState.includes(value);
        if (containsValue === true) {
          return prevState.filter((item) => item !== value);
        } else {
          return [...prevState, value];
        }
      });
    };

    const renderState = constants.map((value) => {
      return (
        <button
          key={value}
          onClick={() => handleValueClick(value)}
          className={` py-2 px-4 border
            ${state.includes(value) && 'bg-gray-200'}`}
        >
          {value}
        </button>
      );
    });

    return renderState;
  };

  const BasicInfoComponent = ({ state, setter }) => {
    const handleChange = (e) => {
      const { name, value } = e.target;
      setter({ ...state, [name]: value });
    };

    return (
      <div>
        <label>First Name:</label>
        <input
          type='text'
          name='firstName'
          value={state.firstName}
          onChange={handleChange}
        />
        <label>Last Name:</label>
        <input
          type='text'
          name='lastName'
          value={state.lastName}
          onChange={handleChange}
        />
        <label>Email:</label>
        <input
          type='text'
          name='email'
          value={state.email}
          onChange={handleChange}
        />
      </div>
    );
  };

  const questionsArray = [
    {
      question: 'Basic Info:',
      actionJsx: <BasicInfoComponent state={basicInfo} setter={setBasicInfo} />,
      getAnswer: () => basicInfo,
    },
    {
      question: 'What Service Do I Provide?',
      actionJsx: (
        <ValuesComponent
          constants={categories}
          state={selectedCategories}
          setter={setSelectedCategories}
        />
      ),
      getAnswer: () => selectedCategories,
    },
    {
      question: 'When am I available?',
      actionJsx: (
        <ValuesComponent
          constants={days}
          state={selectedDays}
          setter={setSelectedDays}
        />
      ),
      getAnswer: () => selectedDays,
    },
  ];

  // When index (state) changes the whole component is rerendered.
  const { question, actionJsx } = questionsArray[index];

  return (
    <div className='grow border-2 m-4 flex flex-col items-center'>
      <Progress value={(index / (questionsArray.length - 1)) * 100} />
      <h2 className='text-3xl font-semibold'>{question}</h2>
      <div className='grow max-h-[600px] overflow-y-auto'>{actionJsx}</div>
      <div className='mt-auto flex flex-col'>
        <button onClick={handleSubmit}>
          {index === questionsArray.length - 1 ? 'Submit' : 'Continue'}
        </button>
        <button onClick={decrementIndex}>back</button>
      </div>
    </div>
  );
};

export default SignUpQuestionnairePage;
