import React, { useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { AnsweredQuestions, Question } from "@/hooks/useExamState";
import { ChevronDown } from 'lucide-react';
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerTrigger } from "@/components/ui/drawer";

interface AptitudeLevelSelectorProps {
  currentQuestionid: string;
  flaggedQuestions: Set<string>;
  answeredQuestions: AnsweredQuestions;
  onSelectQuestion: (
    sectionIndex: number,
    questionId: string,
    level?: string | undefined
  ) => void;
  questionsBySection: {
    sectionTitle?: string | undefined;
    section: string;
    questions: Question[];
  }[];
  currentQuestionlevel?: string;
  formattedTime?: string;
  section: string | undefined;
}

const AptitudeLevelSelector: React.FC<AptitudeLevelSelectorProps> = ({
  currentQuestionid,
  flaggedQuestions,
  answeredQuestions,
  onSelectQuestion,
  questionsBySection,
  formattedTime,
  section
}) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const activeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (scrollContainerRef.current && activeButtonRef.current) {
      const scrollContainer = scrollContainerRef.current;
      const activeButton = activeButtonRef.current;

      const containerWidth = scrollContainer.offsetWidth;
      const buttonWidth = activeButton.offsetWidth;
      const buttonLeft = activeButton.offsetLeft;

      const scrollLeft = buttonLeft - containerWidth / 2 + buttonWidth / 2;

      scrollContainer.scrollTo({
        left: scrollLeft,
        behavior: 'smooth'
      });
    }
  }, [currentQuestionid]);

  const renderQuestions = (
    questions: Question[],
    sectionIndex: number,
    baseQuestionNumber: number,
    isRow: boolean = false
  ) => (
    <div key={baseQuestionNumber} className={`flex justify-center ${isRow ? "px-1" : "px-5"} gap-2 mt-2 `}>
      <div
        ref={scrollContainerRef}
        className={`flex ${isRow ? 'overflow-x-scroll no-scrollbar ' : "flex-wrap"} gap-2`}
      >
        {questions.map((question, questionIndex) => {
          const questionKey = question.id;
          const isFlagged = flaggedQuestions.has(questionKey);
          const level = question.level as keyof AnsweredQuestions;
          const isAnswered =
            answeredQuestions[level] &&
            answeredQuestions[level][questionKey] !== undefined;
          const isActive = currentQuestionid === questionKey;

          const globalQuestionNumber = baseQuestionNumber + questionIndex;

          return (
            <Button
              key={questionKey}
              ref={isActive ? activeButtonRef : null}
              onClick={() => onSelectQuestion(sectionIndex, questionKey, level)}
              variant={"outline"}
              className={`w-9 h-9 rounded-full text-sm font-medium bg-zinc-100/80 border-transparent text-zinc-500
                ${isActive ? "bg-white text-black border-iiiPrimary border" : ""}
                ${isAnswered ? "bg-green-100 text-green-600 border-none" : ""}
                ${isFlagged ? "bg-red-100 text-red-600 border-none" : ""}`}
            >
              {globalQuestionNumber}
            </Button>
          );
        })}
      </div>
    </div>
  );

  return (
    <>
      <Accordion
        type="multiple"
        className="md:w-4/5 w-full font-inter md:flex flex-col gap-5 border-gray-300 rounded-md"
      >
        {questionsBySection.map((section, sectionIndex) => {
          const baseQuestionNumber = sectionIndex * 20 + 1;

          return (
            <React.Fragment key={section.section}>
              <AccordionItem
                className="hidden md:block"
                value={section.section}
              >
                <AccordionTrigger className="flex justify-between items-center w-full text-sm font-medium py-3 px-4 border-b border-gray-300">
                  {section.sectionTitle}
                </AccordionTrigger>
                <AccordionContent>
                  {renderQuestions(
                    section.questions,
                    sectionIndex,
                    baseQuestionNumber
                  )}
                </AccordionContent>
              </AccordionItem>
            </React.Fragment>
          );
        })}
      </Accordion>

      <div className="flex flex-col">
        <div className="md:hidden flex font-inter justify-between">
          <div className="flex gap-2">
            <h1>{section}</h1>
            <div className="mb-2 text-sm text-gray-500 font-inter bg-zinc-100 p-1 min:w-24 w-20 flex justify-center">
              00:{formattedTime}
            </div>
          </div>
          <Drawer>
            <DrawerTrigger><ChevronDown /></DrawerTrigger>
            <DrawerContent>
              <DrawerHeader className="gap-5">
                {questionsBySection.map((section, sectionIndex) => {
                  const baseQuestionNumber = sectionIndex * 20 + 1;
                  return (
                    <div key={section.section}>
                      <DrawerTitle className="text-start px-6 py-2">{section.sectionTitle}</DrawerTitle>
                      {renderQuestions(
                        section.questions,
                        sectionIndex,
                        baseQuestionNumber,
                        false
                      )}
                    </div>
                  );
                })}
              </DrawerHeader>
            </DrawerContent>
          </Drawer>
        </div>
        <div className="md:hidden block">
          {questionsBySection.map((currSection, sectionIndex) => {
            const baseQuestionNumber = sectionIndex * 20 + 1;
            if (currSection.sectionTitle === section) {
              return renderQuestions(currSection.questions, sectionIndex, baseQuestionNumber, true);
            }
            return null;
          })}
        </div>
      </div>
    </>
  );
};

export default AptitudeLevelSelector;