
import React from "react";
import PageLayout from "@/components/layout/PageLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Trophy, Code, Star, Zap, Award } from "lucide-react";

const Leaderboard = () => {
  const weeklyLeaders = [
    { name: "Alex Johnson", points: 1250, avatarFallback: "AJ", rank: 1, badges: ["Algorithm Master", "7-Day Streak"] },
    { name: "Sarah Chen", points: 1180, avatarFallback: "SC", rank: 2, badges: ["Database Pro"] },
    { name: "Mike Williams", points: 1120, avatarFallback: "MW", rank: 3, badges: ["Web Wizard", "Perfect Score"] },
    { name: "Emma Davis", points: 980, avatarFallback: "ED", rank: 4, badges: ["Quick Solver"] },
    { name: "James Wilson", points: 910, avatarFallback: "JW", rank: 5, badges: ["Code Reviewer"] },
    { name: "Lisa Garcia", points: 890, avatarFallback: "LG", rank: 6, badges: ["UI Expert"] },
    { name: "David Miller", points: 850, avatarFallback: "DM", rank: 7, badges: ["Bug Hunter"] },
    { name: "John Doe", points: 820, avatarFallback: "JD", rank: 8, badges: ["AI Enthusiast"] },
  ];

  const allTimeLeaders = [
    { name: "Sarah Chen", points: 15320, avatarFallback: "SC", rank: 1, badges: ["Database Pro", "All-Star"] },
    { name: "Alex Johnson", points: 14250, avatarFallback: "AJ", rank: 2, badges: ["Algorithm Master", "Top Contributor"] },
    { name: "Emma Davis", points: 13980, avatarFallback: "ED", rank: 3, badges: ["Quick Solver", "Java Expert"] },
    { name: "Mike Williams", points: 12920, avatarFallback: "MW", rank: 4, badges: ["Web Wizard", "Perfect Score"] },
    { name: "John Doe", points: 10240, avatarFallback: "JD", rank: 5, badges: ["AI Enthusiast", "Dedicated Learner"] },
    { name: "Lisa Garcia", points: 9890, avatarFallback: "LG", rank: 6, badges: ["UI Expert", "Design Guru"] },
    { name: "James Wilson", points: 9210, avatarFallback: "JW", rank: 7, badges: ["Code Reviewer", "Team Player"] },
    { name: "David Miller", points: 8750, avatarFallback: "DM", rank: 8, badges: ["Bug Hunter", "Problem Solver"] },
  ];

  const byLanguage = [
    { language: "Python", leaders: [
      { name: "Sarah Chen", points: 5320, avatarFallback: "SC" },
      { name: "John Doe", points: 4240, avatarFallback: "JD" },
      { name: "Emma Davis", points: 3980, avatarFallback: "ED" },
    ]},
    { language: "JavaScript", leaders: [
      { name: "Alex Johnson", points: 4850, avatarFallback: "AJ" },
      { name: "Mike Williams", points: 4120, avatarFallback: "MW" },
      { name: "Lisa Garcia", points: 3890, avatarFallback: "LG" },
    ]},
    { language: "Java", leaders: [
      { name: "Emma Davis", points: 5580, avatarFallback: "ED" },
      { name: "James Wilson", points: 4310, avatarFallback: "JW" },
      { name: "David Miller", points: 3750, avatarFallback: "DM" },
    ]},
    { language: "C++", leaders: [
      { name: "Alex Johnson", points: 5720, avatarFallback: "AJ" },
      { name: "Sarah Chen", points: 5020, avatarFallback: "SC" },
      { name: "James Wilson", points: 3910, avatarFallback: "JW" },
    ]},
  ];

  const renderLeaderRow = (user: any, index: number) => (
    <div key={index} className="flex items-center py-3 border-b last:border-0">
      <div className={`flex items-center justify-center h-8 w-8 rounded-full ${
        user.rank === 1 ? "bg-yellow-100 text-yellow-600" : 
        user.rank === 2 ? "bg-gray-100 text-gray-600" : 
        user.rank === 3 ? "bg-orange-100 text-orange-600" : 
        "bg-purple-100 text-purple-600"
      } font-bold text-sm mr-3`}>
        {user.rank}
      </div>
      
      <Avatar className="h-9 w-9 mr-3">
        <AvatarImage src="" alt={user.name} />
        <AvatarFallback className={`${
          user.rank === 1 ? "bg-gradient-to-br from-yellow-400 to-yellow-600" : 
          user.rank === 2 ? "bg-gradient-to-br from-gray-300 to-gray-500" : 
          user.rank === 3 ? "bg-gradient-to-br from-orange-300 to-orange-500" : 
          "bg-gradient-to-br from-campus-purple to-campus-blue"
        } text-white`}>
          {user.avatarFallback}
        </AvatarFallback>
      </Avatar>
      
      <div className="flex-1">
        <div className="font-medium">{user.name}</div>
        <div className="flex gap-1 mt-1 flex-wrap">
          {user.badges?.map((badge: string, i: number) => (
            <Badge key={i} variant="outline" className="bg-white text-xs py-0">
              {badge}
            </Badge>
          ))}
        </div>
      </div>
      
      <div className="font-semibold text-lg text-campus-purple">
        {user.points.toLocaleString()}
        <span className="text-xs text-muted-foreground ml-1">pts</span>
      </div>
    </div>
  );

  return (
    <PageLayout>
      <div className="container py-8">
        <div className="flex flex-col gap-2 mb-6">
          <h1 className="text-3xl font-bold flex items-center gap-2">
            <Trophy className="h-7 w-7 text-yellow-500" />
            Coding Leaderboard
          </h1>
          <p className="text-muted-foreground">
            Track the top performers in coding challenges and exercises
          </p>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          <div className="xl:col-span-2">
            <Tabs defaultValue="weekly" className="w-full">
              <TabsList className="bg-purple-100 text-purple-800 w-full mb-6">
                <TabsTrigger value="weekly" className="flex-1 data-[state=active]:bg-white">
                  <Zap className="h-4 w-4 mr-1" /> Weekly Leaders
                </TabsTrigger>
                <TabsTrigger value="alltime" className="flex-1 data-[state=active]:bg-white">
                  <Award className="h-4 w-4 mr-1" /> All-Time Leaders
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="weekly">
                <Card className="bg-gradient-to-br from-white to-purple-50 border-purple-100">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-xl flex items-center gap-2">
                      <Zap className="h-5 w-5 text-campus-purple" />
                      This Week's Top Performers
                    </CardTitle>
                    <CardDescription>
                      Based on points earned from April 5-11, 2025
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-1">
                      {weeklyLeaders.map((user, index) => renderLeaderRow(user, index))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="alltime">
                <Card className="bg-gradient-to-br from-white to-blue-50 border-blue-100">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-xl flex items-center gap-2">
                      <Award className="h-5 w-5 text-campus-purple" />
                      All-Time Top Performers
                    </CardTitle>
                    <CardDescription>
                      Cumulative points since joining Campus Bridge
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-1">
                      {allTimeLeaders.map((user, index) => renderLeaderRow(user, index))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          <div className="space-y-6">
            <Card className="bg-gradient-to-br from-white to-green-50 border-green-100">
              <CardHeader className="pb-2">
                <CardTitle className="text-xl flex items-center gap-2">
                  <Code className="h-5 w-5 text-campus-purple" />
                  Top By Language
                </CardTitle>
                <CardDescription>
                  Leading coders in each programming language
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {byLanguage.map((lang, langIndex) => (
                    <div key={langIndex}>
                      <div className="flex items-center gap-2 mb-3">
                        <Star className="h-4 w-4 text-campus-purple" />
                        <h3 className="font-semibold">{lang.language}</h3>
                      </div>
                      <div className="space-y-2">
                        {lang.leaders.map((user, userIndex) => (
                          <div key={userIndex} className="flex items-center py-2">
                            <div className="flex items-center justify-center h-6 w-6 rounded-full bg-purple-100 text-purple-600 font-medium text-xs mr-2">
                              {userIndex + 1}
                            </div>
                            <Avatar className="h-8 w-8 mr-2">
                              <AvatarImage src="" alt={user.name} />
                              <AvatarFallback className="bg-gradient-to-br from-campus-purple to-campus-blue text-white text-xs">
                                {user.avatarFallback}
                              </AvatarFallback>
                            </Avatar>
                            <div className="flex-1 font-medium text-sm">{user.name}</div>
                            <div className="font-semibold text-campus-purple">
                              {user.points.toLocaleString()}
                              <span className="text-xs text-muted-foreground ml-1">pts</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default Leaderboard;
