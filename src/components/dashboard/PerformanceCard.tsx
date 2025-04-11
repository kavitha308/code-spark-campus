
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Activity, TrendingUp, Award, Code } from "lucide-react";

interface StatProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  change?: {
    value: number;
    positive: boolean;
  };
}

const Stat: React.FC<StatProps> = ({ title, value, icon, change }) => {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2">
        <div className="rounded-md bg-campus-purple/10 p-2">{icon}</div>
        <div>
          <p className="text-sm font-medium">{title}</p>
          <p className="text-2xl font-bold">{value}</p>
        </div>
      </div>
      {change && (
        <div
          className={`flex items-center text-xs ${
            change.positive ? "text-green-600" : "text-red-600"
          }`}
        >
          <TrendingUp
            className={`h-3 w-3 ${!change.positive && "rotate-180"}`}
          />
          <span>{change.value}%</span>
        </div>
      )}
    </div>
  );
};

const PerformanceCard = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Performance Overview</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <Stat
            title="Weekly Coding Activity"
            value="23 hrs"
            icon={<Activity className="h-4 w-4 text-campus-purple" />}
            change={{ value: 12, positive: true }}
          />
          
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>DSA Skills</span>
              <span>78%</span>
            </div>
            <Progress value={78} className="h-2" />
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Web Development</span>
              <span>65%</span>
            </div>
            <Progress value={65} className="h-2" />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col items-center justify-center p-3 bg-campus-purple/5 rounded-md">
              <Award className="h-5 w-5 text-campus-purple mb-2" />
              <span className="text-lg font-bold">12</span>
              <span className="text-xs text-muted-foreground">Badges Earned</span>
            </div>
            
            <div className="flex flex-col items-center justify-center p-3 bg-campus-purple/5 rounded-md">
              <Code className="h-5 w-5 text-campus-purple mb-2" />
              <span className="text-lg font-bold">156</span>
              <span className="text-xs text-muted-foreground">Problems Solved</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PerformanceCard;
