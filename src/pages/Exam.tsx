import React, { useEffect } from 'react';
import { useExamState } from '@/hooks/useExamState';
import { questionsBySection } from './data';
import AptitudeLevelSelector from './helpers/AptitudeLevelSelector';
import QuestionCard from './helpers/QuestionCard';
import NavigationButtons from './helpers/NavigationButtons';

interface AnsweredQuestions {
    aptitudeLevel: Record<string, string>;
    InterestPersonality: Record<string, string>;
    SubjectKnowledge: Record<string, string>;
  }

const ExamPage: React.FC = () => {
  
  
  const questionsBySectionWithLevels = questionsBySection.map((section) => ({
    ...section,
    level: section.section,
  }));

  // console.log(questionsBySectionWithLevels);

  const {
    currentQuestion,
    flaggedQuestions,
    answeredQuestions,
    goToNextQuestion,
    goToPreviousQuestion,
    setQuestion,
    answerQuestion,
    flagQuestion,
    submitExam,
    getUnansweredQuestionCount,
    formattedTime,
    isTimerRunning,
    startTimer,
  } = useExamState(questionsBySectionWithLevels);

  useEffect(() => {
    if (!isTimerRunning) {
      startTimer();
    }
  }, []);

  const currentSection = questionsBySection[currentQuestion.sectionIndex];
  const currentQuestionData = currentSection.questions.find(q => q.id === currentQuestion.id);

  const level = currentSection.section as keyof AnsweredQuestions;
  const selectedAnswer = answeredQuestions[level]?.[currentQuestion.id] ?? null;
  return (
    <div className="flex bg-[#f7f7f7] min-h-screen h-full ">
      <div className='flex md:flex-row flex-col px-2 md:bg-[#ffff] gap-1 container my-5 mx-auto rounded-lg relative'>
        <div className=" md:w-1/4 w-full  p-4 border-[0.1px] md:border-none bg-white rounded-md border-slate-300/60">
          <AptitudeLevelSelector
            currentQuestionid={currentQuestion.id}
            currentQuestionlevel={currentQuestion.level}
            flaggedQuestions={flaggedQuestions}
            answeredQuestions={answeredQuestions}
            onSelectQuestion={(sectionIndex, id,level) => setQuestion(sectionIndex, id,level)}
            questionsBySection={questionsBySection}
            formattedTime={formattedTime}
            section={currentSection.sectionTitle}
          />
        </div>
        <div className="max-h-screen hidden md:block h-full border-r-[0.1px] border-slate-300/40"></div>
        <div className="md:w-3/4 w-full md:p-6 p-4 flex flex-col  justify-between h-full  border-[0.1px] bg-white rounded-md border-slate-300/60 md:border-none">
          {currentQuestionData && (
            <QuestionCard
            formattedTime={formattedTime}
              question={currentQuestionData.question}
              options={currentQuestionData.options}
              selectedAnswer={selectedAnswer}
              onAnswer={(answer) => answerQuestion(answer)}
              questionNumber={currentSection.questions.findIndex(q => q.id === currentQuestion.id) + 1}
              section={currentSection.sectionTitle}
            />
          )}
          <div className='flex flex-col md:static sticky bottom-0  md:py-0 py-5 bg-white pb-5 w-full '>
            <div className="w-full border-b-[0.1px] hidden md:block  border-slate-300/60"></div>
            <NavigationButtons
              onNext={goToNextQuestion}
              onPrevious={goToPreviousQuestion}
              onFlag={flagQuestion}
              onFinish={submitExam}
              isFlagged={flaggedQuestions.has(currentQuestion.id)}
              UnansweredQuestionCount={getUnansweredQuestionCount()}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExamPage;