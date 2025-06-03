
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { FileText, BookOpen, Lightbulb, Download, Copy, Trash2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Index = () => {
  const [inputText, setInputText] = useState('');
  const [summary, setSummary] = useState('');
  const [summaryType, setSummaryType] = useState('brief');
  const [isLoading, setIsLoading] = useState(false);
  const [wordCount, setWordCount] = useState(0);
  const { toast } = useToast();

  const handleTextChange = (text: string) => {
    setInputText(text);
    setWordCount(text.trim().split(/\s+/).filter(word => word.length > 0).length);
  };

  const summarizeText = async () => {
    if (!inputText.trim()) {
      toast({
        title: "No text to summarize",
        description: "Please enter some text to summarize.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    
    // Simulate AI processing delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Mock summarization based on type
    let mockSummary = '';
    const sentences = inputText.split('.').filter(s => s.trim().length > 0);
    
    switch (summaryType) {
      case 'brief':
        mockSummary = `Brief Summary: ${sentences.slice(0, 2).join('. ')}.`;
        break;
      case 'detailed':
        mockSummary = `Detailed Summary:\n\n• Main points: ${sentences.slice(0, 3).join('. ')}.\n\n• Key insights: This text discusses important concepts that are relevant to academic study.\n\n• Conclusion: The material presents valuable information for further research.`;
        break;
      case 'keypoints':
        mockSummary = `Key Points:\n\n1. ${sentences[0] || 'First main concept'}.\n2. ${sentences[1] || 'Second important idea'}.\n3. ${sentences[2] || 'Third key insight'}.\n\nThese points represent the core ideas presented in the academic text.`;
        break;
    }
    
    setSummary(mockSummary);
    setIsLoading(false);
    
    toast({
      title: "Summary generated!",
      description: "Your academic text has been successfully summarized.",
    });
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(summary);
    toast({
      title: "Copied to clipboard",
      description: "Summary has been copied to your clipboard.",
    });
  };

  const clearAll = () => {
    setInputText('');
    setSummary('');
    setWordCount(0);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      {/* Header */}
      <div className="bg-white border-b border-blue-100 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 py-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-600 rounded-lg">
              <BookOpen className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Academic Text Summarizer</h1>
              <p className="text-gray-600">AI-powered tool to help students understand complex academic materials</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Input Section */}
          <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
            <CardHeader className="pb-4">
              <div className="flex items-center gap-2">
                <FileText className="h-5 w-5 text-blue-600" />
                <CardTitle className="text-xl text-gray-900">Input Text</CardTitle>
              </div>
              <CardDescription>
                Paste your academic text, research paper, or study material here
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium text-gray-700">
                    Academic Text
                  </label>
                  <Badge variant="outline" className="text-xs">
                    {wordCount} words
                  </Badge>
                </div>
                <Textarea
                  placeholder="Paste your academic text here... For example, a research paper abstract, textbook chapter, or lecture notes."
                  value={inputText}
                  onChange={(e) => handleTextChange(e.target.value)}
                  className="min-h-[300px] resize-none border-gray-200 focus:border-blue-400 focus:ring-blue-400"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">
                  Summary Type
                </label>
                <Select value={summaryType} onValueChange={setSummaryType}>
                  <SelectTrigger className="border-gray-200 focus:border-blue-400 focus:ring-blue-400">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-white border-gray-200">
                    <SelectItem value="brief">Brief Summary</SelectItem>
                    <SelectItem value="detailed">Detailed Summary</SelectItem>
                    <SelectItem value="keypoints">Key Points</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex gap-3 pt-2">
                <Button 
                  onClick={summarizeText} 
                  disabled={isLoading || !inputText.trim()}
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white"
                >
                  {isLoading ? "Analyzing..." : "Summarize Text"}
                  <Lightbulb className="ml-2 h-4 w-4" />
                </Button>
                <Button 
                  variant="outline" 
                  onClick={clearAll}
                  className="border-gray-200 hover:bg-gray-50"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Output Section */}
          <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Lightbulb className="h-5 w-5 text-green-600" />
                  <CardTitle className="text-xl text-gray-900">Summary</CardTitle>
                </div>
                {summary && (
                  <div className="flex gap-2">
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={copyToClipboard}
                      className="border-gray-200 hover:bg-gray-50"
                    >
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>
                )}
              </div>
              <CardDescription>
                AI-generated summary of your academic material
              </CardDescription>
            </CardHeader>
            <CardContent>
              {summary ? (
                <div className="space-y-4">
                  <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                    <pre className="whitespace-pre-wrap text-sm text-gray-800 font-medium leading-relaxed">
                      {summary}
                    </pre>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-gray-500">
                    <Badge variant="secondary" className="bg-green-100 text-green-800">
                      Summary generated
                    </Badge>
                    <span>•</span>
                    <span>Ready to copy or export</span>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <div className="p-3 bg-gray-100 rounded-full mb-4">
                    <FileText className="h-8 w-8 text-gray-400" />
                  </div>
                  <p className="text-gray-500 font-medium">No summary yet</p>
                  <p className="text-sm text-gray-400 mt-1">
                    Enter your academic text and click "Summarize Text" to get started
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Features Section */}
        <Card className="mt-8 shadow-lg border-0 bg-white/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-xl text-gray-900">How It Works</CardTitle>
            <CardDescription>
              Follow these simple steps to summarize your academic texts effectively
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center space-y-2">
                <div className="p-3 bg-blue-100 rounded-full w-fit mx-auto">
                  <FileText className="h-6 w-6 text-blue-600" />
                </div>
                <h3 className="font-semibold text-gray-900">1. Paste Your Text</h3>
                <p className="text-sm text-gray-600">
                  Copy and paste any academic material - research papers, textbooks, or lecture notes
                </p>
              </div>
              <div className="text-center space-y-2">
                <div className="p-3 bg-green-100 rounded-full w-fit mx-auto">
                  <Lightbulb className="h-6 w-6 text-green-600" />
                </div>
                <h3 className="font-semibold text-gray-900">2. Choose Summary Type</h3>
                <p className="text-sm text-gray-600">
                  Select brief, detailed, or key points format based on your study needs
                </p>
              </div>
              <div className="text-center space-y-2">
                <div className="p-3 bg-purple-100 rounded-full w-fit mx-auto">
                  <Download className="h-6 w-6 text-purple-600" />
                </div>
                <h3 className="font-semibold text-gray-900">3. Get Your Summary</h3>
                <p className="text-sm text-gray-600">
                  Receive a clear, concise summary ready for your studies and note-taking
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Index;
