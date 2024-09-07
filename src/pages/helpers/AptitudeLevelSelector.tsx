import React from 'react';
import { Button } from '@/components/ui/button';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

interface AccordionComponentProps {
  currentQuestionUid: string;
  flaggedQuestions: Set<string>;
  answeredQuestions: Record<string, string>;
  onSelectQuestion: (sectionIndex: number, uid: string) => void;
  questionsBySection: Array<{ section: string; questions: { question: string; options: string[]; uid: string }[] }>;
}

const AptitudeLevelSelector: React.FC<AccordionComponentProps> = ({
  currentQuestionUid,
  flaggedQuestions,
  answeredQuestions,
  onSelectQuestion,
  questionsBySection,
}) => {

  const renderQuestions = (questions: { question: string; options: string[]; uid: string }[], sectionIndex: number, baseQuestionNumber: number) => (
    <div className="flex justify-center px-5 gap-2 mt-2">
      <div className="flex flex-wrap gap-2">
        {questions.map((question, questionIndex) => {
          const questionKey = question.uid;
          const isFlagged = flaggedQuestions.has(questionKey);
          const isAnswered = answeredQuestions[questionKey] !== undefined;
          const isActive = currentQuestionUid === questionKey;

          const globalQuestionNumber = baseQuestionNumber + questionIndex;

          return (
            <Button
              key={questionKey}
              onClick={() => onSelectQuestion(sectionIndex, questionKey)}
              // variant={isFlagged ? 'outline' : 'ghost'}
              variant={'outline'}
              className={`w-9 h-9 rounded-full text-sm font-medium bg-zinc-100/80 border-transparent text-zinc-500
                ${isActive ? 'bg-white text-black  border-zinc-300 border ':'' }
                ${isAnswered ? 'bg-green-100 text-green-600 border-none' : ''}
                ${isFlagged ? 'bg-red-100 text-red-600 border-none':'' }`}
            >
              {globalQuestionNumber} 
            </Button>
          );
        })}
      </div>
    </div>
  );

  return (
    <Accordion type="multiple" className="md:w-4/5 w-full font-inter flex flex-col gap-5 border-gray-300 rounded-md">
      {questionsBySection.map((section, sectionIndex) => {
        const baseQuestionNumber = sectionIndex * 20 + 1;

        return (
          <AccordionItem key={sectionIndex} value={section.section}>
            <AccordionTrigger className="flex justify-between items-center w-full text-sm font-medium py-3 px-4 border-b border-gray-300">
              {section.section}
            </AccordionTrigger>
            <AccordionContent>
              {renderQuestions(section.questions, sectionIndex, baseQuestionNumber)}
            </AccordionContent>
          </AccordionItem>
        );
      })}
    </Accordion>
  );
};

export default AptitudeLevelSelector;
