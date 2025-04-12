
import React, { useState } from 'react';
import PageLayout from '@/components/layout/PageLayout';
import SmartCodeEditor from '@/components/coding/SmartCodeEditor';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from '@/components/ui/use-toast';
import { 
  Users, 
  MessageSquare,
  Video,
  Mic,
  MicOff,
  VideoOff,
  SendHorizontal,
  PlusCircle,
  Lock,
  Globe,
  Copy,
  Share2
} from 'lucide-react';

const LiveCoding = () => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([
    { user: 'Alice Smith', content: 'Hi everyone, I created this room to work on the database assignment', time: '10:25 AM', avatar: '' },
    { user: 'John Doe', content: 'Great, I\'ve been struggling with the query optimization part', time: '10:26 AM', avatar: '' },
    { user: 'Emily Taylor', content: 'Let\'s start by defining the schema structure', time: '10:28 AM', avatar: '' },
  ]);
  const [micEnabled, setMicEnabled] = useState(false);
  const [videoEnabled, setVideoEnabled] = useState(false);
  const [roomName, setRoomName] = useState('Database Assignment Collaboration');
  const [roomCode, setRoomCode] = useState('DB-COLLAB-392');
  const [roomVisibility, setRoomVisibility] = useState('private');
  
  const roomParticipants = [
    { name: 'You', role: 'Owner', status: 'active', avatar: '' },
    { name: 'Alice Smith', role: 'Member', status: 'active', avatar: '' },
    { name: 'John Doe', role: 'Member', status: 'active', avatar: '' },
    { name: 'Emily Taylor', role: 'Member', status: 'active', avatar: '' },
  ];

  const handleSendMessage = () => {
    if (message.trim()) {
      const newMessage = {
        user: 'You',
        content: message,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        avatar: '',
      };
      setMessages([...messages, newMessage]);
      setMessage('');
    }
  };
  
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };
  
  const handleCopyRoomCode = () => {
    navigator.clipboard.writeText(roomCode);
    toast({
      title: "Room code copied",
      description: "You can share this code with others to join the room.",
    });
  };
  
  const handleShareRoom = () => {
    toast({
      title: "Share room",
      description: "This would open options to share the room via email, messaging apps, etc.",
    });
  };
  
  const handleCreateNewRoom = () => {
    toast({
      title: "Create new room",
      description: "This would start the process of creating a new collaborative coding room.",
    });
  };

  return (
    <PageLayout>
      <div className="container py-8">
        <h1 className="text-3xl font-bold mb-6 bg-gradient-to-r from-campus-purple to-campus-blue bg-clip-text text-transparent">
          Live Collaborative Coding
        </h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="lg:col-span-3 space-y-6">
            <Card className="bg-gradient-to-br from-white to-blue-50 shadow-md">
              <CardHeader className="pb-4">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div>
                    <CardTitle>{roomName}</CardTitle>
                    <CardDescription className="flex items-center gap-2 mt-1">
                      <div className="flex items-center gap-1">
                        <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200 flex items-center gap-1">
                          <div className="w-2 h-2 rounded-full bg-green-500"></div>
                          Live
                        </Badge>
                        <Badge variant="outline" className={`flex items-center gap-1 ${
                          roomVisibility === 'private' 
                            ? 'bg-blue-50 text-blue-700 border-blue-200' 
                            : 'bg-orange-50 text-orange-700 border-orange-200'
                        }`}>
                          {roomVisibility === 'private' ? <Lock className="h-3 w-3" /> : <Globe className="h-3 w-3" />}
                          {roomVisibility === 'private' ? 'Private' : 'Public'}
                        </Badge>
                      </div>
                      <span className="text-muted-foreground">Room Code: {roomCode}</span>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="h-6 p-0 text-muted-foreground hover:text-foreground"
                        onClick={handleCopyRoomCode}
                      >
                        <Copy className="h-3 w-3" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="h-6 p-0 text-muted-foreground hover:text-foreground"
                        onClick={handleShareRoom}
                      >
                        <Share2 className="h-3 w-3" />
                      </Button>
                    </CardDescription>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button 
                      size="sm" 
                      variant={micEnabled ? "default" : "outline"}
                      className={micEnabled ? "bg-campus-green hover:bg-campus-green/90" : "text-muted-foreground"}
                      onClick={() => setMicEnabled(!micEnabled)}
                    >
                      {micEnabled ? <Mic className="h-4 w-4" /> : <MicOff className="h-4 w-4" />}
                    </Button>
                    <Button 
                      size="sm" 
                      variant={videoEnabled ? "default" : "outline"}
                      className={videoEnabled ? "bg-campus-blue hover:bg-campus-blue/90" : "text-muted-foreground"}
                      onClick={() => setVideoEnabled(!videoEnabled)}
                    >
                      {videoEnabled ? <Video className="h-4 w-4" /> : <VideoOff className="h-4 w-4" />}
                    </Button>
                    <Button 
                      size="sm" 
                      className="gradient-purple"
                      onClick={handleCreateNewRoom}
                    >
                      <PlusCircle className="h-4 w-4 mr-1" /> New Room
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <SmartCodeEditor collaborative={true} />
              </CardContent>
            </Card>
          </div>
          
          <div className="space-y-6">
            <Tabs defaultValue="chat">
              <TabsList className="w-full">
                <TabsTrigger value="chat" className="flex-1">
                  <MessageSquare className="h-4 w-4 mr-1" /> Chat
                </TabsTrigger>
                <TabsTrigger value="participants" className="flex-1">
                  <Users className="h-4 w-4 mr-1" /> Participants
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="chat" className="mt-4">
                <Card className="bg-gradient-to-br from-white to-purple-50 shadow-md">
                  <CardContent className="p-0">
                    <div className="h-[400px] flex flex-col">
                      <div className="flex-1 overflow-y-auto p-4 space-y-4">
                        {messages.map((msg, index) => (
                          <div 
                            key={index} 
                            className={`flex gap-3 ${msg.user === 'You' ? 'justify-end' : ''}`}
                          >
                            {msg.user !== 'You' && (
                              <Avatar className="h-8 w-8 flex-shrink-0">
                                <AvatarImage src={msg.avatar} alt={msg.user} />
                                <AvatarFallback className={`
                                  ${msg.user === 'Alice Smith' ? 'bg-gradient-blue' : 
                                    msg.user === 'John Doe' ? 'bg-gradient-purple' : 
                                    'bg-gradient-green'} text-white
                                `}>
                                  {msg.user.split(' ').map(n => n[0]).join('')}
                                </AvatarFallback>
                              </Avatar>
                            )}
                            <div className={`max-w-[75%] ${msg.user === 'You' ? 'order-1' : 'order-2'}`}>
                              <div className={`
                                p-3 rounded-lg
                                ${msg.user === 'You' 
                                  ? 'bg-gradient-to-r from-campus-purple to-campus-blue text-white' 
                                  : 'bg-white shadow-sm'
                                }
                              `}>
                                <p className="text-sm">{msg.content}</p>
                              </div>
                              <div className="flex items-center gap-2 mt-1 text-xs text-muted-foreground">
                                {msg.user !== 'You' && <span>{msg.user}</span>}
                                <span>{msg.time}</span>
                              </div>
                            </div>
                            {msg.user === 'You' && (
                              <Avatar className="h-8 w-8 flex-shrink-0 order-2">
                                <AvatarImage src={msg.avatar} alt={msg.user} />
                                <AvatarFallback className="bg-gradient-purple text-white">
                                  You
                                </AvatarFallback>
                              </Avatar>
                            )}
                          </div>
                        ))}
                      </div>
                      <div className="p-4 border-t">
                        <div className="flex gap-2">
                          <Input 
                            placeholder="Type a message..." 
                            className="flex-1 bg-white"
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            onKeyDown={handleKeyDown}
                          />
                          <Button 
                            className="gradient-purple"
                            onClick={handleSendMessage}
                          >
                            <SendHorizontal className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="participants" className="mt-4">
                <Card className="bg-gradient-to-br from-white to-green-50 shadow-md">
                  <CardHeader>
                    <CardTitle className="text-base">Participants ({roomParticipants.length})</CardTitle>
                  </CardHeader>
                  <CardContent className="p-0">
                    <div className="h-[400px] overflow-y-auto">
                      <div className="divide-y">
                        {roomParticipants.map((participant, index) => (
                          <div key={index} className="flex items-center justify-between p-4">
                            <div className="flex items-center gap-3">
                              <Avatar className="h-8 w-8">
                                <AvatarImage src={participant.avatar} alt={participant.name} />
                                <AvatarFallback className={`text-white ${
                                  participant.name === 'You' ? 'bg-gradient-purple' :
                                  index % 3 === 0 ? 'bg-gradient-blue' :
                                  index % 3 === 1 ? 'bg-gradient-green' :
                                  'bg-gradient-orange'
                                }`}>
                                  {participant.name === 'You' ? 'You' : participant.name.split(' ').map(n => n[0]).join('')}
                                </AvatarFallback>
                              </Avatar>
                              <div>
                                <p className="font-medium">{participant.name}</p>
                                <div className="flex items-center gap-2">
                                  <span className="text-xs text-muted-foreground">{participant.role}</span>
                                  {participant.status === 'active' && (
                                    <span className="flex items-center text-xs text-green-600">
                                      <div className="w-1.5 h-1.5 rounded-full bg-green-500 mr-1"></div>
                                      Active
                                    </span>
                                  )}
                                </div>
                              </div>
                            </div>
                            <div className="flex gap-1">
                              {participant.name === 'You' ? (
                                <Badge className="bg-campus-purple text-white">You</Badge>
                              ) : (
                                <>
                                  <Button variant="ghost" size="sm" className="h-7 w-7 p-0">
                                    <MessageSquare className="h-3 w-3" />
                                  </Button>
                                </>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="p-4 border-t">
                    <Button className="w-full gradient-green animate-hover">
                      <PlusCircle className="h-4 w-4 mr-1" /> Invite Participants
                    </Button>
                  </CardFooter>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default LiveCoding;
