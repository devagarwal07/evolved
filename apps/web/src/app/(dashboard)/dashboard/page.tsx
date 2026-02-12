"use client";

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import {
    Brain,
    Flame,
    Target,
    Trophy,
    ArrowRight,
    PlayCircle,
    Clock,
    Zap,
} from "lucide-react";

export default function DashboardPage() {
    return (
        <div className="space-y-8">
            {/* Welcome Section */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight text-white">
                        Welcome back, Alex
                    </h2>
                    <p className="text-muted-foreground">
                        You're on a 12-day streak! Keep the momentum going.
                    </p>
                </div>
                <div className="flex items-center gap-2">
                    <Button variant="outline" className="gap-2">
                        <Clock className="w-4 h-4" />
                        Daily Goal: 30/45m
                    </Button>
                    <Button className="gap-2 shadow-lg shadow-primary/20">
                        <PlayCircle className="w-4 h-4" />
                        Resume Learning
                    </Button>
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Card className="bg-card/50 border-input hover:border-primary/50 transition-colors">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Daily Streak</CardTitle>
                        <Flame className="h-4 w-4 text-orange-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-white">12 Days</div>
                        <p className="text-xs text-muted-foreground">
                            +2 days from last week
                        </p>
                    </CardContent>
                </Card>
                <Card className="bg-card/50 border-input hover:border-primary/50 transition-colors">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total XP</CardTitle>
                        <Zap className="h-4 w-4 text-yellow-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-white">12,450</div>
                        <p className="text-xs text-muted-foreground">
                            +150 XP earned today
                        </p>
                    </CardContent>
                </Card>
                <Card className="bg-card/50 border-input hover:border-primary/50 transition-colors">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Current Level</CardTitle>
                        <Trophy className="h-4 w-4 text-primary" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-white">Level 14</div>
                        <Progress value={75} className="mt-2 h-2" />
                        <p className="text-xs text-muted-foreground mt-2">
                            75% to Level 15
                        </p>
                    </CardContent>
                </Card>
                <Card className="bg-card/50 border-input hover:border-primary/50 transition-colors">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Skills Mastered</CardTitle>
                        <Brain className="h-4 w-4 text-cyan-400" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-white">8</div>
                        <p className="text-xs text-muted-foreground">
                            Latest: System Design
                        </p>
                    </CardContent>
                </Card>
            </div>

            {/* Main Content Grid */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                {/* Continue Learning */}
                <Card className="col-span-4 bg-card/60 border-input">
                    <CardHeader>
                        <CardTitle>Continue Learning</CardTitle>
                        <CardDescription>
                            Pick up right where you left off.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-6">
                            <div className="flex items-center gap-4 p-4 rounded-xl bg-background/50 border border-border/50 hover:border-primary/30 transition-all cursor-pointer group">
                                <div className="w-12 h-12 rounded-lg bg-primary/20 flex items-center justify-center text-primary group-hover:scale-105 transition-transform">
                                    <Brain className="w-6 h-6" />
                                </div>
                                <div className="flex-1">
                                    <div className="flex justify-between items-center mb-2">
                                        <h4 className="font-semibold text-white">System Design Patterns</h4>
                                        <span className="text-xs text-muted-foreground">45% Complete</span>
                                    </div>
                                    <Progress value={45} className="h-2" />
                                </div>
                                <Button size="icon" variant="ghost" className="text-muted-foreground group-hover:text-primary">
                                    <PlayCircle className="w-6 h-6" />
                                </Button>
                            </div>

                            <div className="flex items-center gap-4 p-4 rounded-xl bg-background/50 border border-border/50 hover:border-primary/30 transition-all cursor-pointer group">
                                <div className="w-12 h-12 rounded-lg bg-secondary/20 flex items-center justify-center text-secondary group-hover:scale-105 transition-transform">
                                    <Target className="w-6 h-6" />
                                </div>
                                <div className="flex-1">
                                    <div className="flex justify-between items-center mb-2">
                                        <h4 className="font-semibold text-white">Advanced React Hooks</h4>
                                        <span className="text-xs text-muted-foreground">12% Complete</span>
                                    </div>
                                    <Progress value={12} className="h-2" />
                                </div>
                                <Button size="icon" variant="ghost" className="text-muted-foreground group-hover:text-primary">
                                    <PlayCircle className="w-6 h-6" />
                                </Button>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Recommended */}
                <Card className="col-span-3 bg-card/60 border-input">
                    <CardHeader>
                        <CardTitle>Recommended for You</CardTitle>
                        <CardDescription>
                            Based on your recent activity.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            <div className="space-y-4">
                                {[1, 2, 3].map((i) => (
                                    <div key={i} className="flex items-start gap-4 pb-4 border-b border-border/40 last:border-0 last:pb-0">
                                        <div className="w-2 h-2 mt-2 rounded-full bg-primary shrink-0" />
                                        <div>
                                            <h5 className="font-medium text-white hover:text-primary cursor-pointer transition-colors block leading-tight">
                                                The Future of Generative AI in Education
                                            </h5>
                                            <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                                                An in-depth look at how large language models are transforming personalized learning experiences.
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <Button variant="outline" className="w-full mt-4 border-dashed border-border hover:border-primary hover:text-primary">
                                View All Recommendations
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Recent Activity Graph Placeholder */}
            <Card className="bg-card/60 border-input">
                <CardHeader>
                    <CardTitle>Learning Activity</CardTitle>
                    <CardDescription>Your study hours over the last 30 days.</CardDescription>
                </CardHeader>
                <CardContent className="h-[200px] flex items-center justify-center text-muted-foreground">
                    {/* Placeholder for Recharts graph */}
                    <div className="flex flex-col items-center gap-2">
                        <div className="w-full h-[150px] flex items-end gap-2">
                            {[...Array(20)].map((_, i) => (
                                <div key={i} className="w-4 bg-primary/20 rounded-t-sm hover:bg-primary/50 transition-colors" style={{ height: `${Math.random() * 100}%` }} />
                            ))}
                        </div>
                        <span className="text-xs">Activity Graph Mockup</span>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
