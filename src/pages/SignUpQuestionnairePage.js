import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Progress } from 'src/components/ui/progress';
import { categories } from 'src/constants/categories';
import { days } from 'src/constants/days';
import useUserStore from 'src/stores/useUserStore';
import { Label } from 'src/components/ui/label';
import Toggle from 'src/components/Toggle';

const SignUpQuestionnairePage = () => {
  const navigate = useNavigate();
  const user = useUserStore((state) => state.user);
  const postUserClientInfo = useUserStore((state) => state.postUserClientInfo);
  const patchUserRole = useUserStore((state) => state.patchUserRole);
  // Pass in an array of objects to this component which will contain:
  // progress value, question, inputs,
  const [index, setIndex] = useState(0);

  useEffect(() => {
    console.log('index: ', index);
  }, [index]);

  const [basicInfo, setBasicInfo] = useState({
    firstName: user?.first_name,
    lastName: user?.last_name,
    email: user?.email,
    isClient: false,
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

  const handleSubmit = async () => {
    saveAnswer();
    // if users is not a client redirect and submit right away
    const isClient = answersRef.current[index].isClient;
    if (index === 0 && isClient === false) {
      await patchUserRole(user._id, isClient);
      navigate('/');
    }
    // If index === questionsArray.length - 1 then submit
    if (index === questionsArray.length - 1) {
      console.log('Submit to API');
      await postUserClientInfo(user._id, answersRef.current);
      navigate('/');
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
      <div className='grow'>{actionJsx}</div>
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

const BasicInfoComponent = ({ state, setter }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;

    setter((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleToggleChange = (e) => {
    const isChecked = e.target.checked;
    console.log(isChecked);

    setter((prevState) => ({
      ...prevState,
      isClient: isChecked, // Set isClient to true if checked, false if not
    }));
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
        type='email'
        name='email'
        value={state.email}
        onChange={handleChange}
      />
      <div className='flex items-center space-x-2'>
        <Toggle checked={state.isClient} onChange={handleToggleChange} />
        <Label>I am selling services!</Label>
      </div>
    </div>
  );
};
