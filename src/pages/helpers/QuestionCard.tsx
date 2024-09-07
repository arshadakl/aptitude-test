// import { Button } from '@/components/ui/button';
// import React from 'react';




// interface QuestionCardProps {
//   question: string;
//   options: string[];
//   selectedAnswer?: string;
//   onAnswer: (answer: string) => void;
// }

// const QuestionCard: React.FC<QuestionCardProps> = ({
//   question,
//   options,
//   selectedAnswer,
//   onAnswer,
// }) => {
//   return (
//     <div>
//       <h3 className="text-2xl font-semibold mb-4 font-source">{question}</h3>
//       <div className="flex flex-col gap-2 font-inter">
//         {options.map((option, index) => (
//           <Button
//             key={index}
//             onClick={() => onAnswer(option)}
//             variant={selectedAnswer === option ? 'default' : 'ghost'}
//             className={`text-left w-full justify-start p-4 hover:bg-zinc-100
//               ${selectedAnswer === option ? 'bg-iiiPrimary hover:bg-iiiPrimary text-white' : ''}`}
//           >
//             {option}
//           </Button>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default QuestionCard;



// import { Button } from '@/components/ui/button';
// import React from 'react';

// interface QuestionCardProps {
//   question: string;
//   options: string[];
//   selectedAnswer?: string;
//   onAnswer: (answer: string) => void;
//   questionNumber: number; // Add questionNumber prop
//   section: string; // Add section (question type) prop
// }

// const QuestionCard: React.FC<QuestionCardProps> = ({
//   question,
//   options,
//   selectedAnswer,
//   onAnswer,
//   questionNumber,
//   section, // Destructure section and questionNumber props
// }) => {
//   return (
//     <div>
//       {/* Display question type (section) and question number */}
//       <div className="mb-2 text-sm font-normal text-gray-600 font-inter">
//         {section} Level - <span className='text-iiiPrimary'>Q{questionNumber}</span>
//       </div>

//       <h3 className="text-2xl font-semibold mb-4 font-source">{question}</h3>

//       <div className="flex flex-col gap-2 font-inter">
//         {options.map((option, index) => (
//           <Button
//             key={index}
//             onClick={() => onAnswer(option)}
//             variant={selectedAnswer === option ? 'default' : 'ghost'}
//             className={`text-left w-full justify-start p-4 hover:bg-zinc-100
//               ${selectedAnswer === option ? 'bg-iiiPrimary hover:bg-iiiPrimary text-white' : ''}`}
//           >
//             {option}
//           </Button>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default QuestionCard;


import { Button } from "@/components/ui/button";

interface QuestionCardProps {
  question: string;
  options: string[];
  selectedAnswer?: string; // selectedAnswer should be a string or undefined
  onAnswer: (answer: string) => void;
  questionNumber: number;
  section: string;
}

const QuestionCard: React.FC<QuestionCardProps> = ({
  question,
  options,
  selectedAnswer,
  onAnswer,
  questionNumber,
  section,
}) => {
  return (
    <div className="flex flex-col gap-5">
      <div className="mb-2 text-sm text-gray-600 font-inter">
        {section} - <span className="text-iiiPrimary">Q{questionNumber}</span>
      </div>
      <h3 className="text-2xl font-semibold mb-4 font-source">{question}</h3>
      <div className=" w-full border-b-[0.1px]  border-slate-300/60"></div>

      <div className="flex flex-col gap-2 font-inter">
        {options.map((option, index) => (
          <Button
            key={index}
            onClick={() => onAnswer(option)}
            variant={selectedAnswer === option ? 'default' : 'ghost'}
            className={`text-left w-full justify-start p-4 hover:bg-zinc-100
            ${selectedAnswer === option ? 'bg-iiiPrimary hover:bg-iiiPrimary text-white' : ''}`}
          >
            {option}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default QuestionCard;
