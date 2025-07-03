import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { getQuizQuestions } from "@/lib/quiz-data";
import type { Country, QuizQuestion } from "@/types/game";
import { useState } from "react";
import { Button } from "../ui/button";
import { CheckCircle, XCircle } from "lucide-react";
import { Progress } from "../ui/progress";
import { Badge } from "../ui/badge";

type Props = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  country: Country;
  onComplete: (score: number, totalQuestions: number) => void;
};

const QuizDialog = ({ open, setOpen, country, onComplete }: Props) => {
  const [questions] = useState<QuizQuestion[]>(getQuizQuestions(country.id));
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [answers, setAnswers] = useState<
    { questionId: string; selectedAnswer: string; correct: boolean }[]
  >([]);

  const currentQuestion = questions[currentQuestionIndex];
  const isLastQuestion = currentQuestionIndex === questions.length - 1;

  const handleAnswerSelect = (answer: string) => {
    setSelectedAnswer(answer);
  };

  const handleNextQuestion = () => {
    if (!selectedAnswer) return;

    const isCorrect = selectedAnswer === currentQuestion.correctAnswer;
    const newAnswer = {
      questionId: currentQuestion.id,
      selectedAnswer,
      correct: isCorrect,
    };

    setAnswers((prev) => [...prev, newAnswer]);

    if (isCorrect) {
      setScore((prev) => prev + 5);
    }

    setShowResult(true);

    setTimeout(() => {
      if (isLastQuestion) {
        const finalScore = isCorrect ? score + 5 : score;
        onComplete(finalScore, questions.length);
      } else {
        setCurrentQuestionIndex((prev) => prev + 1);
        setSelectedAnswer(null);
        setShowResult(false);
      }
    }, 2000);
  };

  const progress = ((currentQuestionIndex + 1) / questions.length) * 100;

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="!w-full !max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{country.name} Quiz</DialogTitle>
          <DialogDescription>
            Question {currentQuestionIndex + 1} of {questions.length}
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
              Score: {score} points
            </Badge>
            <Badge variant="secondary">
              {score}/{(currentQuestionIndex + 1) * 5} possible
            </Badge>
          </div>

          {!showResult ? (
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
                        selectedAnswer === option ? "default" : "outline"
                      }
                      className={`w-full text-left justify-start h-auto p-4 ${
                        selectedAnswer === option
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
                  disabled={!selectedAnswer}
                  className="px-8"
                >
                  {isLastQuestion ? "Finish Quiz" : "Next Question"}
                </Button>
              </div>
            </>
          ) : (
            <div className="text-center space-y-4 py-8">
              {answers[answers.length - 1]?.correct ? (
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
                  <p className="text-blue-800 font-medium">
                    Quiz completed! Final score:{" "}
                    {score + (answers[answers.length - 1]?.correct ? 5 : 0)}{" "}
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
