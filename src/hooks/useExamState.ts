import { useState } from 'react';

export const useExamState = (sections: Array<{ questions: any[] }>) => {
  const [currentQuestion, setCurrentQuestion] = useState({
    sectionIndex: 0,
    uid: sections[0].questions[0].uid, 
  });
  const [flaggedQuestions, setFlaggedQuestions] = useState<Set<string>>(new Set());
  const [answeredQuestions, setAnsweredQuestions] = useState<Record<string, string>>({});

  
  const getUnansweredQuestionCount = () => {
    let unansweredCount = 0;
    
    sections.forEach((section) => {
      section.questions.forEach((question) => {
        if (!answeredQuestions[question.uid]) {
          unansweredCount++;
        }
      });
    });

    return unansweredCount;
  };

  const goToNextQuestion = () => {
    const { sectionIndex, uid } = currentQuestion;
    const section = sections[sectionIndex];
    const currentIndex = section.questions.findIndex((q) => q.uid === uid);

    if (currentIndex < section.questions.length - 1) {
      setCurrentQuestion({
        sectionIndex,
        uid: section.questions[currentIndex + 1].uid,
      });
    } else if (sectionIndex < sections.length - 1) {
      setCurrentQuestion({
        sectionIndex: sectionIndex + 1,
        uid: sections[sectionIndex + 1].questions[0].uid,
      });
    }
  };

  const goToPreviousQuestion = () => {
    const { sectionIndex, uid } = currentQuestion;
    const section = sections[sectionIndex];
    const currentIndex = section.questions.findIndex((q) => q.uid === uid);

    if (currentIndex > 0) {
      setCurrentQuestion({
        sectionIndex,
        uid: section.questions[currentIndex - 1].uid,
      });
    } else if (sectionIndex > 0) {
      const previousSection = sections[sectionIndex - 1];
      setCurrentQuestion({
        sectionIndex: sectionIndex - 1,
        uid: previousSection.questions[previousSection.questions.length - 1].uid,
      });
    }
  };

  const setQuestion = (sectionIndex: number, uid: string) => {
    setCurrentQuestion({ sectionIndex, uid });
  };

  const answerQuestion = (answer: string) => {
    setAnsweredQuestions((prev) => ({
      ...prev,
      [currentQuestion.uid]: answer,
    }));
  };

  const flagQuestion = () => {
    setFlaggedQuestions((prev) => {
      const updated = new Set(prev);
      if (updated.has(currentQuestion.uid)) {
        updated.delete(currentQuestion.uid);
      } else {
        updated.add(currentQuestion.uid);
      }
      return updated;
    });
  };

  const submitExam = () => {
    console.log('Submit exam', answeredQuestions);
  };

  return {
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
  };
};
