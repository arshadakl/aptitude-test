import { Button } from '@/components/ui/button'
import React from 'react';
import { ChevronLeft, ChevronRight, Flag } from 'lucide-react';
import { useConfirm } from '@/components/ui/alert-dialog-provider';

interface NavigationButtonsProps {
    onNext: () => void;
    onPrevious: () => void;
    onFlag: () => void;
    onFinish: () => void;
    isFlagged: boolean;
    UnansweredQuestionCount?:number
}

const NavigationButtons: React.FC<NavigationButtonsProps> = ({ onNext, onPrevious, onFlag, onFinish, isFlagged,UnansweredQuestionCount }) => {
    const confirm = useConfirm();
    async function handleSubmit() {
        try {
            const confirmed = await confirm({
                body: `${UnansweredQuestionCount===0 ? ' Do you want to submit?': `You have (${UnansweredQuestionCount}) Unanswered Questions, Do you want to submit?`}`,
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
        <div className="flex md:flex-row flex-col md:gap-0 gap-5 justify-between  mt-6 ">
            <div className='flex justify-between  gap-5'>
                <Button onClick={onPrevious} variant="outline" className="flex justify-evenly p-2 rounded-full w-24 shadow-none bg-zinc-100 border-none">
                <ChevronLeft size={17} />  Previous 
                </Button>
                <Button
                    onClick={onFlag}
                    variant={isFlagged ? 'default' : 'outline'}
                    className={`p-2 rounded-full hover:bg-red-500 hover:text-white shadow-none border-none  flex gap-1 w-28 ${isFlagged ? 'bg-red-500 text-white' : 'bg-zinc-100 '}`}
                >
                    {isFlagged ? 'Unflag' : 'Flag'} <Flag size={14} />
                </Button>
                <Button onClick={onNext} variant="outline" className="flex justify-evenly p-2 rounded-full w-24 shadow-none bg-zinc-100 border-none">
                    Next  <ChevronRight size={17} />
                </Button>
            </div>
            <div className='flex justify-end'>
                <Button onClick={handleSubmit} variant="default" className="bg-black md:w-36 w-full rounded-full text-white p-2">
                    End & Submit Test
                </Button>
            </div>
        </div>
    );
};

export default NavigationButtons;
