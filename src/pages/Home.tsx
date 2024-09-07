import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import Wavunderline from "@/components/ui/wavyunderline";
import { useRouter } from "@tanstack/react-router";
import { ChevronRight } from "lucide-react"

const guidanceData = [
    {
        title: 'Personalised Guidance',
        description: 'We analyse your strengths and interests to suggest the best career path.'
    },
    {
        title: 'Clear Direction',
        description: 'Get a clear understanding of whether Chartered Accountancy (CA), Cost and Management Accountancy (CMA), Company Secretary (CS), ACCA is right for you.'
    },
    {
        title: 'Expert Advice',
        description: 'Receive recommendations from professionals to help you make an informed decision about your future.'
    }
];
function Home() {

    return (
        <main className=" bg-iiiwhite md:py-20">
            <div className=" mx-auto flex flex-col lg:gap-0 md:gap-5 ">
                <section className="mx-auto ">
                    <div className="flex justify-center md:gap-6 gap-4   items-center flex-col  md:h-96 py-8">
                        <h1 className="md:text-5xl text-xl font-source font-semibold -tracking-[.68px] text-iiiblack text-center w-full">
                            Confused about choosing the right <br /> career for your future?
                        </h1>
                        <AssessmentButton />
                    </div>
                </section>
                <section>
                    <div className="container mx-auto flex justify-center">
                        <Card className="max-h-96 lg:w-3/6 w-11/12 bg-red-500">
                            <img className="md:object-none object-fill h-full w-full  rounded-xl" src="/images/bg-hero.jpg" alt="" />
                        </Card>
                    </div>
                </section>
                <section className="md:py-0 py-12">
                    <div className="flex flex-col items-center gap-3 justify-center lg:h-80 h-full ">
                        <h1 className="font-source font-semibold text-iiiblack lg:w-2/4 w-11/12 text-center md:text-4xl text-2xl">
                            Our Specialised R&D Team has created <br className="hidden md:block" /> an AI to Find out which course is best for students based on bunch of Questions
                        </h1>
                        <p className="font-inter text-center lg:w-2/5 w-11/12 md:text-lg text-md leading-6 text-iiiblack">Take the guesswork out of choosing the right career path <br className="hidden md:block" />
                         and make an informed decision that aligns with your <br className="hidden md:block" /> aspirations.</p>
                    </div>
                </section>
                <section>
                    <div className="flex flex-col justify-center items-center font-inter gap-5">
                        <div className="flex flex-col items-center  ">
                            <h1 className="text-3xl text-center font-semibold text-iiiblack">How our Specialised Exam can help you?</h1>
                            <Wavunderline />
                        </div>
                        <div className=" bg-[#F9F9F9] rounded-2xl lg:w-5/12 w-11/12 md:p-14 p-8 ">
                            <div className="space-y-10">
                                {/* Mapping through the guidance data */}
                                {guidanceData.map((item, index) => (
                                    <div key={index}>
                                        <div className="flex flex-col w-full sm:flex-row sm:space-x-6">
                                            <div className="sm:w-60 md:w-1/3">
                                                <h3 className="text-xl md:w-10  font-semibold text-gray-900">
                                                    {item.title}
                                                </h3>
                                            </div>

                                            <div className="sm:w-96 md:w-1/3">
                                                <p className="text-iiiblack text-lg">
                                                    {item.description}
                                                </p>
                                            </div>
                                        </div>
                                        {index < guidanceData.length - 1 && <hr className="my-4 border-gray-300" />}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>
                <section>
                    <div className="flex justify-center gap-6 py-10 items-center flex-col ">
                        <AssessmentButton />
                    </div>
                </section>
            </div>
        </main>
    )
}



function AssessmentButton() {
    const router = useRouter();
    const goToinstructions = () => {
        router.navigate({ to: '/instructions' });
    };
    return (
        <>
            <h1 className="md:text-xl text-sm font-inter font-semibold text-center">
                Take our career assessment test to discover <br />
                the best fit for you in CA, CMA IND, CS, <br />
                ACCA or CMA USA.
            </h1>
            <Button onClick={goToinstructions} className="bg-iiiPrimary hover:bg-iiiPrimary animate-bounce transition-all  shadow-iiiPrimary rounded-full font-inter shadow-2xl">Start test now <ChevronRight /> </Button>
        </>
    )
}


export default Home
