import React from 'react';
import { Button } from "@/components/ui/button";

interface QuestionCardProps {
  question: string;
  options: { option: string; id: string }[];
  selectedAnswer?: string | null;
  onAnswer: (answer: string) => void;
  questionNumber: number;
  section: string | undefined;
  formattedTime?: string
}


const QuestionCard: React.FC<QuestionCardProps> = ({
  question,
  options,
  selectedAnswer,
  onAnswer,
  questionNumber,
  section,
  formattedTime
}) => {
  return (
    <div className="flex flex-col md:gap-5 gap-2  max:h-[80vh] ">

      <div className='hidden md:flex md:justify-between gap-2'>
        <div className="mb-2 text-sm text-gray-600 font-inter flex items-center ">
          {section} - <span className="text-iiiPrimary">Q{questionNumber}</span>
        </div>
        <div className="mb-2 text-sm text-gray-500 font-inter bg-zinc-100 p-1 min:w-24 w-24 flex justify-center font-">
          00:{formattedTime}
        </div>
      </div>
      <h3 className="text-2xl font-semibold mb-4 font-source">{question}</h3>
      <div className="w-full border-b-[0.1px] border-slate-300/60"></div>
      <div className="flex flex-col gap-2 font-inter">
        {options.map((option) => (
          <Button
            key={option.id}
            onClick={() => onAnswer(option.id)}
            variant={selectedAnswer === option.id ? 'default' : 'ghost'}
            className={`text-left h-full w-full block justify-start p-3 hover:bg-zinc-100 whitespace-normal break-words
      ${selectedAnswer === option.id ? 'bg-iiiPrimary hover:bg-iiiPrimary text-white' : ''}`}
          >
            {option.option}
          </Button>
        ))}
      </div>


    </div>
  );
};

export default QuestionCard;
