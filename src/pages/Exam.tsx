import { useExamState } from '@/hooks/useExamState';
import { questionsBySection } from './data';
import AptitudeLevelSelector from './helpers/AptitudeLevelSelector';
import QuestionCard from './helpers/QuestionCard';
import NavigationButtons from './helpers/NavigationButtons';

const ExamPage: React.FC = () => {
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
        getUnansweredQuestionCount
    } = useExamState(questionsBySection);

    const currentSection = questionsBySection[currentQuestion.sectionIndex];
    const currentQuestionData = currentSection.questions.find(q => q.uid === currentQuestion.uid);

    const selectedAnswer = answeredQuestions[currentQuestion.uid];

    return (
        <div className="flex  bg-[#f7f7f7] min-h-screen h-full">
            <div className='flex md:flex-row flex-col bg-[#ffff] container my-5 mx-auto rounded-lg ' >
                <div className="md:w-1/4 w-full  p-4">
                    <AptitudeLevelSelector
                        currentQuestionUid={currentQuestion.uid}
                        flaggedQuestions={flaggedQuestions}
                        answeredQuestions={answeredQuestions}
                        onSelectQuestion={(sectionIndex, uid) => setQuestion(sectionIndex, uid)}
                        questionsBySection={questionsBySection}
                    />
                </div>

                {/* <div className="max-h-screen hidden md:block h-full border-r-[0.1px] border-slate-300/40"></div> */}


                <div className="md:w-3/4 w-full p-6 flex flex-col justify-between  h-full">
                    <QuestionCard
                        question={currentQuestionData?.question ?? "Question not available"}
                        options={currentQuestionData?.options || []}
                        selectedAnswer={selectedAnswer}
                        onAnswer={(answer) => answerQuestion(answer)}
                        questionNumber={currentSection.questions.findIndex(q => q.uid === currentQuestion.uid) + 1}
                        section={currentSection.section}
                    />

                    <div className='flex flex-col'>
                        <div className=" w-full border-b-[0.1px]  border-slate-300/60"></div>
                        <NavigationButtons
                            onNext={() => goToNextQuestion()}
                            onPrevious={() => goToPreviousQuestion()}
                            onFlag={() => flagQuestion()}
                            onFinish={submitExam}
                            isFlagged={flaggedQuestions.has(currentQuestion.uid)}
                            UnansweredQuestionCount={getUnansweredQuestionCount()}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ExamPage;
