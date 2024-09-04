import React from 'react';
import { cn } from 'src/lib/utils';

const Toggle = ({ checked, onChange }) => {
  return (
    <div
      onClick={() => onChange({ target: { checked: !checked } })}
      className={cn(
        'w-14 h-8 flex items-center bg-gray-300 rounded-full p-1 cursor-pointer transition-colors',
        checked && 'bg-blue-600'
      )}
      // className={`w-14 h-8 flex items-center bg-gray-300 rounded-full p-1 cursor-pointer transition-colors ${
      //   checked ? 'bg-blue-600' : ''
      // }`}
    >
      <div
        className={`bg-white w-6 h-6 rounded-full shadow-md transform transition-transform ${
          checked ? 'translate-x-6' : ''
        }`}
      ></div>
    </div>
  );
};

export default Toggle;
