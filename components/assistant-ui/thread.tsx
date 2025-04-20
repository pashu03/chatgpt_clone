import React, { FC, useRef } from "react";
import {
  ActionBarPrimitive,
  BranchPickerPrimitive,
  ComposerPrimitive,
  MessagePrimitive,
  ThreadPrimitive,
} from "@assistant-ui/react";
import type { FC as _FC } from "react";
import {
  ArrowDownIcon,
  CheckIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  CopyIcon,
  PencilIcon,
  RefreshCwIcon,
  SendHorizontalIcon,
  PlusIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";
import { MarkdownText } from "@/components/assistant-ui/markdown-text";
import { TooltipIconButton } from "@/components/assistant-ui/tooltip-icon-button";

export const Thread: FC = () => {
  return (
    <ThreadPrimitive.Root
      className="bg-background box-border flex h-full flex-col overflow-hidden"
      style={{
        ["--thread-max-width" as string]: "48rem",
      }}
    >
      <ThreadPrimitive.Viewport className="flex h-full flex-col items-center overflow-y-scroll scroll-smooth bg-inherit px-6 pt-10">
        <ThreadWelcome />

        <ThreadPrimitive.Messages
          components={{ UserMessage, EditComposer, AssistantMessage }}
        />

        <ThreadPrimitive.If empty={false}>
          <div className="min-h-10 flex-grow" />
        </ThreadPrimitive.If>

        <div className="sticky bottom-0 mt-4 flex w-full max-w-[var(--thread-max-width)] flex-col items-center justify-end rounded-t-xl bg-inherit pb-6">
          <ThreadScrollToBottom />
          <Composer />
        </div>
      </ThreadPrimitive.Viewport>
    </ThreadPrimitive.Root>
  );
};

const ThreadScrollToBottom: FC = () => (
  <ThreadPrimitive.ScrollToBottom asChild>
    <TooltipIconButton
      tooltip="Scroll to bottom"
      variant="outline"
      className="absolute -top-10 rounded-full shadow-md backdrop-blur-md bg-background/70"
    >
      <ArrowDownIcon />
    </TooltipIconButton>
  </ThreadPrimitive.ScrollToBottom>
);

const ThreadWelcome: FC = () => (
  <ThreadPrimitive.Empty>
    <div className="flex w-full max-w-[var(--thread-max-width)] flex-grow flex-col">
      <div className="flex w-full flex-grow flex-col items-center justify-center">
        <h2 className="text-xl font-semibold text-primary">Welcome 👋</h2>
        <p className="mt-2 text-sm text-muted-foreground">How can I help you today?</p>
      </div>
      <ThreadWelcomeSuggestions />
    </div>
  </ThreadPrimitive.Empty>
);

const ThreadWelcomeSuggestions: FC = () => {
  const suggestions = [
    "What is the weather in Tokyo?",
    "What is assistant-ui?",
    "Tell me a joke",
    "Explain TypeScript in simple terms",
  ];

  return (
    <div className="mt-5 grid w-full grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-4">
      {suggestions.map((prompt) => (
        <ThreadPrimitive.Suggestion
          key={prompt}
          className="hover:bg-muted/80 flex grow flex-col items-center justify-center rounded-lg border p-4 text-center transition-colors ease-in shadow-sm"
          prompt={prompt}
          method="replace"
          autoSend
        >
          <span className="line-clamp-2 text-ellipsis text-sm font-semibold text-muted-foreground">
            {prompt}
          </span>
        </ThreadPrimitive.Suggestion>
      ))}
    </div>
  );
};

const Composer: FC = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      // TODO: implement file upload logic here
      console.log("Files selected:", files);
    }
  };

  return (
    <ComposerPrimitive.Root className="focus-within:border-ring/30 flex w-full flex-wrap items-end rounded-lg border bg-card px-4 shadow-md transition-colors ease-in">
      <input
        type="file"
        ref={fileInputRef}
        className="hidden"
        multiple
        onChange={handleFileChange}
      />
      <TooltipIconButton
        tooltip="Upload files"
        variant="ghost"
        className="my-2.5 size-9 p-2"
        onClick={handleUploadClick}
      >
        <PlusIcon />
      </TooltipIconButton>
      <ComposerPrimitive.Input
        rows={1}
        autoFocus
        placeholder="Write a message..."
        className="placeholder:text-muted-foreground max-h-40 flex-grow resize-none border-none bg-transparent px-2 py-4 text-sm outline-none focus:ring-0 disabled:cursor-not-allowed"
      />
      <ComposerAction />
    </ComposerPrimitive.Root>
  );
};

const ComposerAction: FC = () => (
  <>
    <ThreadPrimitive.If running={false}>
      <ComposerPrimitive.Send asChild>
        <TooltipIconButton tooltip="Send" variant="default" className="my-2.5 size-9 p-2">
          <SendHorizontalIcon />
        </TooltipIconButton>
      </ComposerPrimitive.Send>
    </ThreadPrimitive.If>
    <ThreadPrimitive.If running>
      <ComposerPrimitive.Cancel asChild>
        <TooltipIconButton tooltip="Cancel" variant="destructive" className="my-2.5 size-9 p-2">
          <CircleStopIcon />
        </TooltipIconButton>
      </ComposerPrimitive.Cancel>
    </ThreadPrimitive.If>
  </>
);

/* Remaining components (UserMessage, AssistantMessage, etc.) unchanged */

const UserMessage: FC = () => (
  <MessagePrimitive.Root className="grid auto-rows-auto grid-cols-[minmax(72px,1fr)_auto] gap-y-2 [&:where(>*)]:col-start-2 w-full max-w-[var(--thread-max-width)] py-4">
    /* ... */
  </MessagePrimitive.Root>
);

/* ... rest of the file ... */

const CircleStopIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" width="16" height="16">
    <rect width="10" height="10" x="3" y="3" rx="2" />
  </svg>
);
