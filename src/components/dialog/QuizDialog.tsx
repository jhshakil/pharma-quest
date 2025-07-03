import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { getQuizQuestions } from "@/lib/quiz-data";
import type { Country, QuizQuestion } from "@/types/game";
import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { CheckCircle, XCircle } from "lucide-react";
import { Progress } from "../ui/progress";
import { Badge } from "../ui/badge";

type Props = {
  open: boolean;
  setOpen: (open: boolean) => void;
  country: Country;
  onComplete: (score: number, totalQuestions: number) => void;
};

type QuizState = {
  questions: QuizQuestion[];
  currentQuestionIndex: number;
  selectedAnswer: string | null;
  showResult: boolean;
  score: number;
  answers: {
    questionId: string;
    selectedAnswer: string;
    correct: boolean;
  }[];
};

const QuizDialog = ({ open, setOpen, country, onComplete }: Props) => {
  const [quizState, setQuizState] = useState<QuizState>({
    questions: getQuizQuestions(country.id),
    currentQuestionIndex: 0,
    selectedAnswer: null,
    showResult: false,
    score: 0,
    answers: [],
  });

  useEffect(() => {
    if (open) {
      setQuizState({
        questions: getQuizQuestions(country.id),
        currentQuestionIndex: 0,
        selectedAnswer: null,
        showResult: false,
        score: 0,
        answers: [],
      });
    }
  }, [country.id, open]);

  const currentQuestion = quizState.questions[quizState.currentQuestionIndex];
  const isLastQuestion =
    quizState.currentQuestionIndex === quizState.questions.length - 1;

  const handleAnswerSelect = (answer: string) => {
    setQuizState((prev) => ({
      ...prev,
      selectedAnswer: answer,
    }));
  };

  const handleNextQuestion = () => {
    if (!quizState.selectedAnswer) return;

    const isCorrect =
      quizState.selectedAnswer === currentQuestion.correctAnswer;
    const newAnswer = {
      questionId: currentQuestion.id,
      selectedAnswer: quizState.selectedAnswer,
      correct: isCorrect,
    };

    setQuizState((prev) => ({
      ...prev,
      answers: [...prev.answers, newAnswer],
      score: isCorrect ? prev.score + 5 : prev.score,
      showResult: true,
    }));

    setTimeout(() => {
      if (isLastQuestion) {
        const finalScore = isCorrect ? quizState.score + 5 : quizState.score;
        onComplete(finalScore, quizState.questions.length);
      } else {
        setQuizState((prev) => ({
          ...prev,
          currentQuestionIndex: prev.currentQuestionIndex + 1,
          selectedAnswer: null,
          showResult: false,
        }));
      }
    }, 2000);
  };

  const progress =
    ((quizState.currentQuestionIndex + 1) / quizState.questions.length) * 100;

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="!w-full !max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{country.name} Quiz</DialogTitle>
          <DialogDescription>
            Question {quizState.currentQuestionIndex + 1} of{" "}
            {quizState.questions.length}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Progress</span>
              <span>{Math.round(progress)}%</span>
            </div>
            <Progress value={progress} />
          </div>

          <div className="flex justify-between items-center">
            <Badge variant="outline" className="text-lg px-3 py-1">
              Score: {quizState.score} points
            </Badge>
            <Badge variant="secondary">
              {quizState.score}/{(quizState.currentQuestionIndex + 1) * 5}{" "}
              possible
            </Badge>
          </div>

          {!quizState.showResult ? (
            <>
              <div className="space-y-4">
                <h3 className="text-lg font-semibold leading-relaxed">
                  {currentQuestion.question}
                </h3>

                <div className="space-y-3">
                  {currentQuestion.options.map((option, index) => (
                    <Button
                      key={index}
                      variant={
                        quizState.selectedAnswer === option
                          ? "default"
                          : "outline"
                      }
                      className={`w-full text-left justify-start h-auto p-4 ${
                        quizState.selectedAnswer === option
                          ? "bg-primary text-white"
                          : "hover:bg-gray-50"
                      }`}
                      onClick={() => handleAnswerSelect(option)}
                    >
                      <span className="font-medium mr-3">
                        {String.fromCharCode(65 + index)}.
                      </span>
                      <span className="flex-1">{option}</span>
                    </Button>
                  ))}
                </div>
              </div>

              <div className="flex justify-end">
                <Button
                  onClick={handleNextQuestion}
                  disabled={!quizState.selectedAnswer}
                  className="px-8"
                >
                  {isLastQuestion ? "Finish Quiz" : "Next Question"}
                </Button>
              </div>
            </>
          ) : (
            <div className="text-center space-y-4 py-8">
              {quizState.answers[quizState.answers.length - 1]?.correct ? (
                <div className="space-y-4">
                  <CheckCircle className="h-16 w-16 text-green-600 mx-auto" />
                  <h3 className="text-2xl font-bold text-green-600">
                    Correct!
                  </h3>
                  <p className="text-gray-600">+5 points</p>
                </div>
              ) : (
                <div className="space-y-4">
                  <XCircle className="h-16 w-16 text-red-600 mx-auto" />
                  <h3 className="text-2xl font-bold text-red-600">Incorrect</h3>
                  <div className="bg-red-50 p-4 rounded-lg">
                    <p className="text-sm text-red-800">
                      <strong>Correct answer:</strong>{" "}
                      {currentQuestion.correctAnswer}
                    </p>
                    {currentQuestion.explanation && (
                      <p className="text-sm text-red-700 mt-2">
                        {currentQuestion.explanation}
                      </p>
                    )}
                  </div>
                </div>
              )}

              {isLastQuestion && (
                <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                  <p className="text-primary font-medium">
                    Quiz completed! Final score:{" "}
                    {quizState.score +
                      (quizState.answers[quizState.answers.length - 1]?.correct
                        ? 5
                        : 0)}{" "}
                    points
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default QuizDialog;
