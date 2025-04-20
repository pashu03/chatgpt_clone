import type { FC } from "react";
import {
  ThreadListItemPrimitive,
  ThreadListPrimitive,
} from "@assistant-ui/react";
import { ArchiveIcon, PlusIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { TooltipIconButton } from "@/components/assistant-ui/tooltip-icon-button";

export const ThreadList: FC = () => {
  return (
    <ThreadListPrimitive.Root
      className="flex flex-col gap-2 w-full px-2 sm:px-4 bg-background h-full md:block hidden"
      id="sidebar"
    >
      <ThreadListNew />
      <ThreadListItems />
    </ThreadListPrimitive.Root>
  );
};

const ThreadListNew: FC = () => { 
  const handleNewThread = () => {
    // Optionally save history before opening new tab
    const history = JSON.parse(localStorage.getItem("chatHistory") || "[]");
    const timestamp = new Date().toISOString();
    history.push({ id: timestamp, title: `Chat on ${timestamp}` });
    localStorage.setItem("chatHistory", JSON.stringify(history));

    // Open a new tab with the base route or /new
    window.open("/", "_top");
  };

  return (
    <Button
      onClick={handleNewThread}
      className="w-full flex items-center gap-2 rounded-lg px-3 py-2 text-sm sm:text-base"
      variant="outline"
    >
      <PlusIcon className="h-4 w-4 sm:h-5 sm:w-5" />
      <span className="hidden sm:inline">New Thread</span>
    </Button>
  );
};

const ThreadListItems: FC = () => {
  return <ThreadListPrimitive.Items components={{ ThreadListItem }} />;
};

const ThreadListItem: FC = () => {
  return (
    <ThreadListItemPrimitive.Root className="data-[active]:bg-muted hover:bg-muted flex items-center justify-between rounded-lg transition-all focus:outline-none focus:ring-2 focus:ring-ring px-2 py-1">
      <ThreadListItemPrimitive.Trigger className="flex-grow text-sm sm:text-base text-start px-2 py-1">
        <ThreadListItemTitle />
      </ThreadListItemPrimitive.Trigger>
      <ThreadListItemArchive />
    </ThreadListItemPrimitive.Root>
  );
};

const ThreadListItemTitle: FC = () => {
  return (
    <p className="truncate text-sm font-medium text-foreground">
      <ThreadListItemPrimitive.Title fallback="New Chat" />
    </p>
  );
};

const ThreadListItemArchive: FC = () => {
  return (
    <ThreadListItemPrimitive.Archive asChild>
      <TooltipIconButton
        tooltip="Archive thread"
        className="text-foreground hover:text-primary p-1"
        variant="ghost"
      >
        <ArchiveIcon className="h-4 w-4" />
      </TooltipIconButton>
    </ThreadListItemPrimitive.Archive>
  );
};
