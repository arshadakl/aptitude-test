
import { useState, useEffect, useCallback, useMemo } from 'react';

export interface AnsweredQuestions {
  aptitudeLevel: Record<string, string>;
  InterestPersonality: Record<string, string>;
  SubjectKnowledge: Record<string, string>;
}

export interface Question {
  id: string;
  level: string;
  question: string;
  options: {
    option: string;
    id: string;
  }[];
}

type CurrentQuestion = {
  sectionIndex: number;
  id: string;
  level?: string;
};

interface ExamState {
  currentQuestion: CurrentQuestion;
  flaggedQuestions: string[];
  answeredQuestions: AnsweredQuestions;
  startTime: number;
  isTimerRunning: boolean;
}

const LOCAL_STORAGE_KEY = 'examState';
const EXAM_DURATION = 60 * 60 * 1000;

const getInitialState = (): ExamState | null => {
  const savedState = localStorage.getItem(LOCAL_STORAGE_KEY);
  if (savedState) {
    const parsedState = JSON.parse(savedState);
    return {
      currentQuestion: parsedState.currentQuestion,
      flaggedQuestions: parsedState.flaggedQuestions,
      answeredQuestions: parsedState.answeredQuestions,
      startTime: parsedState.startTime,
      isTimerRunning: parsedState.isTimerRunning,
    };
  }
  return null;
};

export const useExamState = (sections: Array<{ level: string; questions: Question[] }>) => {
  const initialState = useMemo(getInitialState, []);

  const [currentQuestion, setCurrentQuestion] = useState<CurrentQuestion>(() => 
    initialState?.currentQuestion || {
      sectionIndex: 0,
      id: sections[0].questions[0].id,
      level: sections[0].level
    }
  );

  const [flaggedQuestions, setFlaggedQuestions] = useState<Set<string>>(() => 
    new Set(initialState?.flaggedQuestions || [])
  );

  const [answeredQuestions, setAnsweredQuestions] = useState<AnsweredQuestions>(() => 
    initialState?.answeredQuestions || {
      aptitudeLevel: {},
      InterestPersonality: {},
      SubjectKnowledge: {},
    }
  );

  const [startTime, setStartTime] = useState<number>(() => initialState?.startTime || 0);
  const [isTimerRunning, setIsTimerRunning] = useState<boolean>(() => initialState?.isTimerRunning || false);
  const [timeRemaining, setTimeRemaining] = useState<number>(() => 
    startTime ? Math.max(0, EXAM_DURATION - (Date.now() - startTime)) : EXAM_DURATION
  );

  const saveState = useCallback(() => {
    localStorage.setItem(
      LOCAL_STORAGE_KEY,
      JSON.stringify({
        currentQuestion,
        flaggedQuestions: Array.from(flaggedQuestions),
        answeredQuestions,
        startTime,
        isTimerRunning,
      })
    );
  }, [currentQuestion, flaggedQuestions, answeredQuestions, startTime, isTimerRunning]);

  useEffect(() => {
    saveState();
  }, [saveState]);

  useEffect(() => {
    let timer: number | undefined;
    if (isTimerRunning && timeRemaining > 0) {
      timer = window.setInterval(() => {
        const now = Date.now();
        const elapsed = now - startTime;
        const remaining = Math.max(0, EXAM_DURATION - elapsed);
        setTimeRemaining(remaining);

        if (remaining === 0) {
          submitExam();
        }
      }, 1000);
    }
    return () => {
      if (timer) window.clearInterval(timer);
    };
  }, [isTimerRunning, startTime]);

  const startTimer = useCallback(() => {
    if (!isTimerRunning) {
      setStartTime(Date.now() - (EXAM_DURATION - timeRemaining));
      setIsTimerRunning(true);
    }
  }, [isTimerRunning, timeRemaining]);

  const pauseTimer = useCallback(() => {
    setIsTimerRunning(false);
  }, []);

  const resetTimer = useCallback(() => {
    setStartTime(0);
    setTimeRemaining(EXAM_DURATION);
    setIsTimerRunning(false);
  }, []);

  const formatTime = useCallback((milliseconds: number): string => {
    const totalSeconds = Math.floor(milliseconds / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  }, []);

  const getUnansweredQuestionCount = useCallback(() => {
    return sections.reduce((count, section) => {
      const level = section.level as keyof AnsweredQuestions;
      return count + section.questions.filter(question => !answeredQuestions[level][question.id]).length;
    }, 0);
  }, [sections, answeredQuestions]);

  const goToNextQuestion = useCallback(() => {
    setCurrentQuestion(({ sectionIndex, id }) => {
      const section = sections[sectionIndex];
      const currentIndex = section.questions.findIndex((q) => q.id === id);

      if (currentIndex < section.questions.length - 1) {
        return {
          sectionIndex,
          id: section.questions[currentIndex + 1].id,
          level: section.questions[currentIndex + 1].level
        };
      } else if (sectionIndex < sections.length - 1) {
        return {
          sectionIndex: sectionIndex + 1,
          id: sections[sectionIndex + 1].questions[0].id,
          level: sections[sectionIndex + 1].level
        };
      }
      return { sectionIndex, id };
    });
  }, [sections]);

  const goToPreviousQuestion = useCallback(() => {
    setCurrentQuestion(({ sectionIndex, id }) => {
      const section = sections[sectionIndex];
      const currentIndex = section.questions.findIndex((q) => q.id === id);

      if (currentIndex > 0) {
        return {
          sectionIndex,
          id: section.questions[currentIndex - 1].id,
          level: section.questions[currentIndex - 1].level
        };
      } else if (sectionIndex > 0) {
        const previousSection = sections[sectionIndex - 1];
        return {
          sectionIndex: sectionIndex - 1,
          id: previousSection.questions[previousSection.questions.length - 1].id,
          level: previousSection.questions[previousSection.questions.length - 1].level
        };
      }
      return { sectionIndex, id };
    });
  }, [sections]);

  const setQuestion = useCallback((sectionIndex: number, id: string, level: string | undefined) => {
    setCurrentQuestion({ sectionIndex, id, level });
  }, []);

  const answerQuestion = useCallback((answer: string) => {
    setAnsweredQuestions((prev) => {
      const level = sections[currentQuestion.sectionIndex].level as keyof AnsweredQuestions;
      return {
        ...prev,
        [level]: {
          ...prev[level],
          [currentQuestion.id]: answer,
        },
      };
    });
  }, [sections, currentQuestion]);

  const flagQuestion = useCallback(() => {
    setFlaggedQuestions((prev) => {
      const updated = new Set(prev);
      if (updated.has(currentQuestion.id)) {
        updated.delete(currentQuestion.id);
      } else {
        updated.add(currentQuestion.id);
      }
      return updated;
    });
  }, [currentQuestion]);

  const resetExamState = useCallback(() => {
    setCurrentQuestion({
      sectionIndex: 0,
      id: sections[0].questions[0].id,
      level: sections[0].level
    });
    setFlaggedQuestions(new Set());
    setAnsweredQuestions({
      aptitudeLevel: {},
      InterestPersonality: {},
      SubjectKnowledge: {},
    });
    resetTimer();
    localStorage.removeItem(LOCAL_STORAGE_KEY);
  }, [sections, resetTimer]);

  const submitExam = useCallback(() => {
    console.log('Submit exam', answeredQuestions);
    resetExamState();
  }, [answeredQuestions, resetExamState]);

  return {
    currentQuestion,
    flaggedQuestions,
    answeredQuestions,
    timeRemaining,
    formattedTime: formatTime(timeRemaining),
    isTimerRunning,
    startTimer,
    pauseTimer,
    resetTimer,
    goToNextQuestion,
    goToPreviousQuestion,
    setQuestion,
    answerQuestion,
    flagQuestion,
    submitExam,
    getUnansweredQuestionCount,
  };
};