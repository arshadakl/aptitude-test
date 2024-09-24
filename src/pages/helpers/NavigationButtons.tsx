import React from 'react';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, Flag } from 'lucide-react';
import { useConfirm } from '@/components/ui/alert-dialog-provider';

interface NavigationButtonsProps {
    onNext: () => void;
    onPrevious: () => void;
    onFlag: () => void;
    onFinish: () => void;
    isFlagged: boolean;
    UnansweredQuestionCount?: number;
}

const NavigationButtons: React.FC<NavigationButtonsProps> = ({
    onNext,
    onPrevious,
    onFlag,
    onFinish,
    isFlagged,
    UnansweredQuestionCount
}) => {
    const confirm = useConfirm();

    async function handleSubmit() {
        try {
            const confirmed = await confirm({
                body: `${UnansweredQuestionCount === 0 ? ' Do you want to submit?' : `You have (${UnansweredQuestionCount}) Unanswered Questions, Do you want to submit?`}`,
                cancelButton: 'Cancel',
                actionButton: 'Yes, Submit',
                onAction: async () => {
                    await onFinish();
                },
            });

            if (confirmed) {
                console.log('Test submitted successfully');
            } else {
                console.log('Submission was canceled');
            }
        } catch (error) {
            console.error('Action was not completed:', error);
        }
    }

    return (
        <div className="flex  md:gap-0  w-full justify-between mt-6 ">
            <div className='flex justify-end'>
                <Button onClick={handleSubmit} variant="default" className="bg-black md:w-36 w-34 rounded-full text-white p-2">
                    End & Submit <span className='hidden md:block mx-1'> Test</span>
                </Button>
            </div>
            <div className='flex md:justify-between justify-end md:gap-5 gap-1'>
                <Button onClick={onPrevious} variant="outline" className="flex justify-evenly p-2 rounded-full w-10 md:w-24 shadow-none bg-zinc-100 border-none">
                    <ChevronLeft size={17} /> <span className='hidden md:block'>Previous</span>
                </Button>
                <Button
                    onClick={onFlag}
                    variant={isFlagged ? 'default' : 'outline'}
                    className={`p-2 rounded-full hover:bg-red-500 hover:text-white shadow-none border-none flex gap-1 md:w-28 w-24 ${isFlagged ? 'bg-red-500 text-white' : 'bg-zinc-100'}`}
                >
                    {isFlagged ? 'Unflag' : 'Flag'} <Flag size={14} />
                </Button>
                <Button onClick={onNext} variant="outline" className="flex justify-evenly p-2 rounded-full w-10 md:w-24 shadow-none bg-zinc-100 border-none">
                    <span className='hidden md:block'>Next</span> <ChevronRight size={17} />
                </Button>
            </div>
            
        </div>
    );
};

export default NavigationButtons;