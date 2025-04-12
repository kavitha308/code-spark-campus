
import React from "react";
import PageLayout from "@/components/layout/PageLayout";
import SmartCodeEditor from "@/components/coding/SmartCodeEditor";
import AiAssistant from "@/components/coding/AiAssistant";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useLocation } from "react-router-dom";

const Coding = () => {
  const location = useLocation();
  const challenge = location.state?.challenge;

  return (
    <PageLayout>
      <div className="container py-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="md:col-span-3 space-y-6">
            {challenge ? (
              <div className="space-y-4">
                <h2 className="text-2xl font-bold text-gray-800 flex items-center">
                  Challenge: {challenge.title}
                  <span className="ml-3 inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                    {challenge.difficulty.charAt(0).toUpperCase() + challenge.difficulty.slice(1)}
                  </span>
                </h2>
                <p className="text-gray-600">{challenge.description}</p>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 border-t border-b py-4">
                  <div>
                    <h3 className="font-medium mb-2">Sample Input</h3>
                    <pre className="bg-gray-100 p-3 rounded text-sm font-mono overflow-x-auto">
                      {challenge.sampleInput}
                    </pre>
                  </div>
                  <div>
                    <h3 className="font-medium mb-2">Expected Output</h3>
                    <pre className="bg-gray-100 p-3 rounded text-sm font-mono overflow-x-auto">
                      {challenge.sampleOutput}
                    </pre>
                  </div>
                </div>
              </div>
            ) : (
              <h1 className="text-3xl font-bold tracking-tight">Code Editor</h1>
            )}

            <Tabs defaultValue="editor">
              <TabsList>
                <TabsTrigger value="editor">Code Editor</TabsTrigger>
                <TabsTrigger value="live">Live Collaborative Session</TabsTrigger>
              </TabsList>
              <TabsContent value="editor" className="mt-4">
                <SmartCodeEditor />
              </TabsContent>
              <TabsContent value="live" className="mt-4">
                <div className="bg-blue-50 rounded-lg p-6 text-center">
                  <h3 className="text-lg font-medium mb-2">Start a collaborative coding session</h3>
                  <p className="text-gray-600 mb-4">
                    Code together with classmates or instructors in real-time.
                  </p>
                  <Button className="bg-gradient-to-r from-campus-blue to-campus-purple">
                    Start New Session
                  </Button>
                </div>
              </TabsContent>
            </Tabs>
          </div>

          <div>
            <AiAssistant />
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default Coding;
