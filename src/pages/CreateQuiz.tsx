import React, { useState, useEffect } from "react";
import PageLayout from "@/components/layout/PageLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft, Plus, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { getFacultyCourses } from "@/services/CourseService";
import { toast } from "sonner";
import { Separator } from "@/components/ui/separator";

interface Question {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  marks: number;
}

const CreateQuiz = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [courses, setCourses] = useState<any[]>([]);
  const [quizData, setQuizData] = useState({
    title: "",
    description: "",
    course_id: "",
    duration: 30,
    total_marks: 0
  });
  const [questions, setQuestions] = useState<Question[]>([{
    id: "1",
    question: "",
    options: ["", "", "", ""],
    correctAnswer: 0,
    marks: 1
  }]);

  useEffect(() => {
    loadCourses();
  }, []);

  useEffect(() => {
    // Calculate total marks
    const total = questions.reduce((sum, q) => sum + q.marks, 0);
    setQuizData(prev => ({ ...prev, total_marks: total }));
  }, [questions]);

  const loadCourses = async () => {
    try {
      const data = await getFacultyCourses();
      setCourses(data);
    } catch (error) {
      console.error("Error loading courses:", error);
      toast.error("Failed to load courses");
    }
  };

  const addQuestion = () => {
    const newQuestion: Question = {
      id: Date.now().toString(),
      question: "",
      options: ["", "", "", ""],
      correctAnswer: 0,
      marks: 1
    };
    setQuestions([...questions, newQuestion]);
  };

  const removeQuestion = (id: string) => {
    if (questions.length > 1) {
      setQuestions(questions.filter(q => q.id !== id));
    } else {
      toast.error("Quiz must have at least one question");
    }
  };

  const updateQuestion = (id: string, field: keyof Question, value: any) => {
    setQuestions(questions.map(q => 
      q.id === id ? { ...q, [field]: value } : q
    ));
  };

  const updateOption = (questionId: string, optionIndex: number, value: string) => {
    setQuestions(questions.map(q => {
      if (q.id === questionId) {
        const newOptions = [...q.options];
        newOptions[optionIndex] = value;
        return { ...q, options: newOptions };
      }
      return q;
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!quizData.course_id) {
      toast.error("Please select a course");
      return;
    }

    // Validate questions
    for (const q of questions) {
      if (!q.question.trim()) {
        toast.error("All questions must have text");
        return;
      }
      if (q.options.some(opt => !opt.trim())) {
        toast.error("All options must be filled");
        return;
      }
    }

    try {
      setLoading(true);
      
      // Here you would save the quiz to the database
      // For now, we'll just show a success message
      console.log("Quiz data:", { ...quizData, questions });
      
      toast.success("Quiz created successfully!");
      navigate('/faculty-dashboard');
    } catch (error) {
      console.error("Error creating quiz:", error);
      toast.error("Failed to create quiz");
    } finally {
      setLoading(false);
    }
  };

  return (
    <PageLayout>
      <div className="container max-w-4xl py-6">
        <Button 
          variant="ghost" 
          className="mb-4"
          onClick={() => navigate('/faculty-dashboard')}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Dashboard
        </Button>

        <Card className="bg-background/50 backdrop-blur mb-6">
          <CardHeader>
            <CardTitle className="text-3xl">Create New Quiz</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="title">Quiz Title</Label>
                  <Input
                    id="title"
                    placeholder="Enter quiz title"
                    value={quizData.title}
                    onChange={(e) => setQuizData({ ...quizData, title: e.target.value })}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="course">Course</Label>
                  <Select 
                    value={quizData.course_id}
                    onValueChange={(value) => setQuizData({ ...quizData, course_id: value })}
                    required
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select course" />
                    </SelectTrigger>
                    <SelectContent>
                      {courses.map((course) => (
                        <SelectItem key={course.id} value={course.id}>
                          {course.title}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="duration">Duration (minutes)</Label>
                  <Input
                    id="duration"
                    type="number"
                    placeholder="e.g., 30"
                    value={quizData.duration}
                    onChange={(e) => setQuizData({ ...quizData, duration: parseInt(e.target.value) })}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="total_marks">Total Marks</Label>
                  <Input
                    id="total_marks"
                    type="number"
                    value={quizData.total_marks}
                    disabled
                    className="bg-muted"
                  />
                  <p className="text-xs text-muted-foreground">Auto-calculated from questions</p>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Quiz Description</Label>
                <Textarea
                  id="description"
                  placeholder="Enter quiz instructions and description"
                  className="min-h-[100px]"
                  value={quizData.description}
                  onChange={(e) => setQuizData({ ...quizData, description: e.target.value })}
                />
              </div>

              <Separator />

              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-semibold">Questions</h3>
                  <Button type="button" onClick={addQuestion} variant="outline" size="sm">
                    <Plus className="mr-2 h-4 w-4" />
                    Add Question
                  </Button>
                </div>

                {questions.map((question, qIndex) => (
                  <Card key={question.id} className="bg-accent/5">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-lg">Question {qIndex + 1}</CardTitle>
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => removeQuestion(question.id)}
                          disabled={questions.length === 1}
                        >
                          <Trash2 className="h-4 w-4 text-destructive" />
                        </Button>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <Label>Question Text</Label>
                        <Textarea
                          placeholder="Enter your question"
                          value={question.question}
                          onChange={(e) => updateQuestion(question.id, 'question', e.target.value)}
                          required
                        />
                      </div>

                      <div className="grid md:grid-cols-2 gap-4">
                        {question.options.map((option, optIndex) => (
                          <div key={optIndex} className="space-y-2">
                            <Label>Option {optIndex + 1}</Label>
                            <Input
                              placeholder={`Option ${optIndex + 1}`}
                              value={option}
                              onChange={(e) => updateOption(question.id, optIndex, e.target.value)}
                              required
                            />
                          </div>
                        ))}
                      </div>

                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label>Correct Answer</Label>
                          <Select
                            value={question.correctAnswer.toString()}
                            onValueChange={(value) => updateQuestion(question.id, 'correctAnswer', parseInt(value))}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select correct answer" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="0">Option 1</SelectItem>
                              <SelectItem value="1">Option 2</SelectItem>
                              <SelectItem value="2">Option 3</SelectItem>
                              <SelectItem value="3">Option 4</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        <div className="space-y-2">
                          <Label>Marks</Label>
                          <Input
                            type="number"
                            min="1"
                            value={question.marks}
                            onChange={(e) => updateQuestion(question.id, 'marks', parseInt(e.target.value))}
                            required
                          />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <Button 
                type="submit" 
                className="w-full"
                disabled={loading}
              >
                {loading ? "Creating..." : "Create Quiz"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </PageLayout>
  );
};

export default CreateQuiz;
