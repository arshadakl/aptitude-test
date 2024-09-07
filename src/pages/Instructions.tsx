import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useRouter } from "@tanstack/react-router";



const guidelines: string[] = [
    'This is a timed test: The running time is displayed on the top left corner of the screen.',
    'The question screen displays the question number along with the question and respective options.',
    'The top right of the section above the question has an option to mark the question for review. You can later view the marked question.',
    'You can mark or unmark any option you have chosen by tapping on the respective option.',
    'The bottom left corner contains the option to move to the previous question.',
    'The bottom right corner contains the option to move to the next question.',
    'You can submit the test at any point in time by clicking the Submit button. Before submission, the screen shows a confirmation pop-up with the total number of questions in the test, questions answered, and questions marked for review.',
    'If something goes wrong, contact your tutor and communicate the problem.',
];

const examFormat = [
    {
        heading: "1. Questions 1-20:",
        description: "These questions will test your aptitude, focusing on general skills such as problem-solving and critical thinking. One mark each.",
    },
    {
        heading: "2. Questions 21-40:",
        description: "These questions will assess your subject knowledge relevant to the exam. One mark each.",
    },
    {
        heading: "3. Questions 41-60:",
        description: "These questions will help determine the most suitable course for you based on your performance.",
    },
];


const ListItem: React.FC<{ description: string }> = ({ description }) => (
    <li className="mb-2 text-sm">{description}</li>
);


const List: React.FC<{ items: string[] }> = ({ items }) => (
    <ul className="list-decimal list-inside">
        {items.map((item, index) => (
            <ListItem key={index} description={item} />
        ))}
    </ul>
);

function Instructions() {
    const router = useRouter();
    const goToinstructions = () => {
        router.navigate({ to: '/aptitude-test' });
    };
    return (
        <main className="h-full">
            <div className="container flex flex-col justify-center items-center gap-5 mx-auto py-10 font-inter">
                <div className="flex justify-center mx-auto">
                    <h1 className="font-source text-center text-3xl font-semibold">Instructions to attend the exam</h1>
                </div>
                <Card className="bg-[#F9F9F9]  md:max-w-xl mx-w-11/12 mx-auto p-6 rounded-lg shadow-none border-none">

                    <div className="mb-6">
                        <h2 className="text-lg font-bold mb-4">General Guidelines</h2>
                        <List items={guidelines} />
                    </div>

                    <div>
                        <h2 className="text-lg font-bold mb-4">Exam Format</h2>
                        <ul className="list-none">
                            {examFormat.map((item, index) => (
                                <li key={index} className="mb-4">
                                    <p className="text-sm">{item.heading}</p>
                                    <p className="text-sm ">{item.description}</p>
                                </li>
                            ))}
                        </ul>
                    </div>
                </Card>
                <div className="flex  md:max-w-xl w-full justify-center">
                    <Button onClick={goToinstructions} className="md:w-full w-11/12 bg-iiiPrimary hover:bg-iiiPrimary/90 rounded-full">Start Exam</Button>
                </div>
            </div>
        </main>
    );
}

export default Instructions;
