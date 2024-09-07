/* eslint-disable react-refresh/only-export-components */
import * as React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
    AlertDialog,
    AlertDialogContent,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogDescription,
    AlertDialogFooter,
} from "@/components/ui/alert-dialog";
import StateButton from "./state-button";
import { TriangleAlert } from 'lucide-react';

export const AlertDialogContext = React.createContext<
    <T extends AlertAction>(params: T) => Promise<T["type"] extends "alert" | "confirm" ? boolean : null | string>
>(() => null!);

export type AlertAction =
    | { type: "alert"; title: string; body?: string; cancelButton?: string }
    | {
        type: "confirm";
        title?: string;
        body?: string;
        cancelButton?: string;
        actionButton?: string;
        danger?: boolean;
        onAction?: () => Promise<void>;
    }
    | {
        type: "prompt";
        title: string;
        body?: string;
        cancelButton?: string;
        actionButton?: string;
        danger?: boolean;
        defaultValue?: string;
        onAction?: () => Promise<void>;
        inputProps?: React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>;
    }
    | { type: "close" };

interface AlertDialogState {
    open: boolean;
    title: string;
    body: string;
    type: "alert" | "confirm" | "prompt";
    cancelButton: string;
    actionButton: string;
    danger?: boolean;
    onAction?: () => Promise<void>;
    defaultValue?: string;
    inputProps?: React.PropsWithoutRef<
        React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>
    >;
}

export function alertDialogReducer(state: AlertDialogState, action: AlertAction): AlertDialogState {
    switch (action.type) {
        case "close":
            return { ...state, open: false };
        case "alert":
        case "confirm":
        case "prompt":
            return {
                ...state,
                open: true,
                ...action,
                cancelButton: action.cancelButton || (action.type === "alert" ? "Okay" : "Cancel"),
                actionButton: ("actionButton" in action && action.actionButton) || "Okay",
            };
        default:
            return state;
    }
}

export function AlertDialogProvider({ children }: { children: React.ReactNode }) {
    const [state, dispatch] = React.useReducer(alertDialogReducer, {
        open: false,
        title: "",
        body: "",
        type: "alert",
        cancelButton: "Cancel",
        actionButton: "Okay",
        danger: false,
    });

    const [isLoading, setIsLoading] = React.useState(false);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const resolveRef = React.useRef<(tf: any) => void>();

    function close() {
        dispatch({ type: "close" });
        resolveRef.current?.(false);
    }

    function confirm(value?: string) {
        const closeAndResolve = () => {
            dispatch({ type: "close" });
            resolveRef.current?.(value ?? true);
            setIsLoading(false);
        };

        setIsLoading(true);
        if (state.onAction) {
            state
                .onAction()
                .then(closeAndResolve)
                .catch(() => setIsLoading(false));
        } else {
            closeAndResolve();
        }
    }

    const dialog = React.useCallback(async <T extends AlertAction>(params: T) => {
        dispatch(params);

        return new Promise<T["type"] extends "alert" | "confirm" ? boolean : null | string>((resolve) => {
            resolveRef.current = resolve;
        });
    }, []);

    return (
        <AlertDialogContext.Provider  value={dialog}>
            {children}
            <AlertDialog  
                open={state.open}
                onOpenChange={(open) => {
                    if (!open) close();
                    return;
                }}
            >
                <AlertDialogContent className="font-inter max:w-1/5 w-2/5 " asChild>
                    <form
                        onSubmit={(event) => {
                            event.preventDefault();
                            confirm(event.currentTarget.prompt?.value);
                        }}
                    >
                        <AlertDialogHeader>
                            <AlertDialogTitle>{state.title}</AlertDialogTitle>
                            <TriangleAlert className="bg-red-100 mx-auto rounded-full w-10 h-10 p-2" color="red"/>
                            {state.body ? <AlertDialogDescription className="text-lg text-center">{state.body}</AlertDialogDescription> : null}
                        </AlertDialogHeader>
                        {state.type === "prompt" && (
                            <Input name="prompt" defaultValue={state.defaultValue} {...state.inputProps} />
                        )}
                        <AlertDialogFooter className="flex justify-between gap-4">
                            <Button
                                onClick={close}
                                className="bg-orange-500 text-white w-full py-2 rounded-full hover:bg-orange-600 transition-colors"
                            >
                                Cancel
                            </Button>
                            {state.type === "alert" ? null : (
                                <StateButton className="rounded-full bg-zinc-100 hover:bg-zinc-200/80 shadow-none border-none text-zinc-900  transition-colors w-full"
                                    isLoading={isLoading}
                                    isDisabled={isLoading}
                                    variant={state.danger ? "destructive" : "default"}
                                    type="submit"
                                >
                                    {state.actionButton}
                                </StateButton>
                            )}
                        </AlertDialogFooter>
                    </form>
                </AlertDialogContent>
            </AlertDialog>
        </AlertDialogContext.Provider>
    );
}

type Params<T extends "alert" | "confirm" | "prompt"> = Omit<Extract<AlertAction, { type: T }>, "type"> | string;

export function useConfirm() {
    const dialog = React.useContext(AlertDialogContext);

    return React.useCallback(
        (params: Params<"confirm">) => {
            return dialog({
                ...(typeof params === "string" ? { title: params } : params),
                type: "confirm",
            });
        },
        [dialog],
    );
}

export function usePrompt() {
    const dialog = React.useContext(AlertDialogContext);

    return (params: Params<"prompt">) =>
        dialog({
            ...(typeof params === "string" ? { title: params } : params),
            type: "prompt",
        });
}

export function useAlert() {
    const dialog = React.useContext(AlertDialogContext);
    return (params: Params<"alert">) =>
        dialog({
            ...(typeof params === "string" ? { title: params } : params),
            type: "alert",
        });
}
