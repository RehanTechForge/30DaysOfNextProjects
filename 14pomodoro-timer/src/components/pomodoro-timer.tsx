import React from "react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { MinusIcon, PlayIcon, PlusIcon, RefreshCwIcon } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "./ui/alert-dialog";

const PomodoroTimer = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
      {/* Center the Pomodoro timer card within the screen */}
      <Card className="w-full max-w-md p-6 bg-white dark:bg-gray-800 shadow-lg rounded-lg">
        <div className="flex flex-col items-center justify-center gap-6">
          <h1 className="text-4xl font-bold">Pomodoro Timer</h1>
          <p>A timer for the Pomodoro Technique.</p>
          <div className="flex flex-col items-center gap-4">
            {/* Display current session (work or break) */}
            <div className="text-2xl font-medium">
              <span className={`text-primary`}>Work</span>
            </div>
            {/* Display formatted time */}
            <div className="text-8xl font-bold">00:58</div>
          </div>
          <div className="flex items-center gap-4">
            {/* Buttons to change duration, start/pause, and reset timer */}
            <Button variant="outline" size="icon">
              <MinusIcon className="h-6 w-6" />
            </Button>
            <Button variant="outline" size="icon">
              <PlusIcon className="h-6 w-6" />
            </Button>
            <Button variant="outline" size="icon">
              <PlayIcon className="h-6 w-6" />
            </Button>
            <Button variant="outline" size="icon">
              <RefreshCwIcon className="h-6 w-6" />
            </Button>
          </div>
          <div className="p-2">
            {/* AlertDialog for explaining the Pomodoro Technique */}
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="default">What is Pomodoro Technique?</Button>
              </AlertDialogTrigger>
              <AlertDialogContent className="w-full max-w-2xl p-4 md:p-6">
                <AlertDialogHeader>
                  <AlertDialogTitle>
                    <strong> ➡️ Explanation of Pomodoro Technique 🔥</strong>
                  </AlertDialogTitle>
                  <AlertDialogDescription>
                    <strong>The Pomodoro Technique </strong>
                    {`
 is a time management method that uses a timer to break work into 
intervals called Pomodoros. The Pomodoro timer is traditionally set for 25 minutes,
but can be customized to fit your needs. The basic steps are:
`}{" "}
                    <br />
                    <br />
                    <ol>
                      <strong>
                        <li>1. Select a single task to focus on.</li>
                        <li>
                          2. Set a timer for 25-30 min. and work continuously
                          until the timer goes off.
                        </li>
                        <li>
                          3. Take a productive 5 min. break-walk around, get a
                          snack, relax.
                        </li>
                        <li>4. Repeat steps 2 & 3 for 4 rounds.</li>
                        <li>5. Take a longer (20-30 min.) break.</li>
                      </strong>
                    </ol>
                    <br />
                    <Button>
                      {" "}
                      <a
                        href="https://todoist.com/productivity-methods/pomodoro-technique"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Click Here to Read more!
                      </a>{" "}
                    </Button>
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction>Continue</AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default PomodoroTimer;
