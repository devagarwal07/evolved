"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { PlusCircle, Users, Loader2, LogIn, LogOut, Trash2, Sparkles, Crown } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { useGamification } from "@/context/GamificationContext";
import { api } from "@/lib/api";

interface RoomMember {
    id: string;
    role: string;
    user: { id: string; name: string | null; avatar: string | null; xp?: number };
}

interface StudyRoom {
    id: string;
    name: string;
    topic: string;
    isActive: boolean;
    _count?: { members: number };
    members?: RoomMember[];
    createdAt: string;
}

export default function CommunityPage() {
    const { user } = useAuth();
    const { showXPToast } = useGamification();
    const [rooms, setRooms] = useState<StudyRoom[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const [roomName, setRoomName] = useState("");
    const [roomTopic, setRoomTopic] = useState("");
    const [activeRoom, setActiveRoom] = useState<StudyRoom | null>(null);
    const [isCreating, setIsCreating] = useState(false);

    useEffect(() => {
        if (user?.id) loadRooms();
    }, [user?.id]);

    const loadRooms = async () => {
        try {
            setIsLoading(true);
            const res = await api.get("/community/rooms");
            setRooms(res.data);
        } catch (err) { console.error(err); }
        finally { setIsLoading(false); }
    };

    const createRoom = async () => {
        if (!roomName.trim() || !roomTopic.trim()) return;
        setIsCreating(true);
        try {
            const res = await api.post("/community/rooms", { name: roomName.trim(), topic: roomTopic.trim() });
            showXPToast(10, 'Study room created');
            setRooms(prev => [res.data, ...prev]);
            setRoomName("");
            setRoomTopic("");
            setShowForm(false);
            setActiveRoom(res.data);
        } catch (err) { console.error(err); }
        finally { setIsCreating(false); }
    };

    const viewRoom = async (id: string) => {
        try {
            const res = await api.get(`/community/rooms/${id}`);
            setActiveRoom(res.data);
        } catch (err) { console.error(err); }
    };

    const joinRoom = async (id: string) => {
        try {
            const res = await api.post(`/community/rooms/${id}/join`);
            setActiveRoom(res.data);
            loadRooms();
        } catch (err: any) {
            if (err.response?.status === 400) viewRoom(id); // Already member
            else console.error(err);
        }
    };

    const leaveRoom = async (id: string) => {
        try {
            await api.post(`/community/rooms/${id}/leave`);
            setActiveRoom(null);
            loadRooms();
        } catch (err) { console.error(err); }
    };

    const deleteRoom = async (id: string) => {
        try {
            await api.delete(`/community/rooms/${id}`);
            setActiveRoom(null);
            loadRooms();
        } catch (err) { console.error(err); }
    };

    const isMember = (room: StudyRoom) => room.members?.some(m => m.user.id === user?.id);
    const isHost = (room: StudyRoom) => room.members?.some(m => m.user.id === user?.id && m.role === "host");

    return (
        <div className="max-w-5xl mx-auto space-y-8 p-6">
            {/* Header */}
            <div className="text-center space-y-4">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium">
                    <Users className="w-4 h-4" /> Social Learning
                </div>
                <h1 className="text-3xl font-bold tracking-tighter text-white">
                    Learn Together. <span className="text-gradient-primary">Evolve Together.</span>
                </h1>
                <p className="text-slate-500 max-w-lg mx-auto">Create study rooms, collaborate with peers, and accelerate your learning.</p>
            </div>

            {/* Create Room */}
            <div className="flex justify-center">
                <Button onClick={() => setShowForm(!showForm)} className="bg-primary hover:bg-primary/90 text-white rounded-xl shadow-lg shadow-primary/20">
                    <PlusCircle className="w-4 h-4 mr-2" /> Create Study Room
                </Button>
            </div>

            {showForm && (
                <div className="glass-card p-6 max-w-lg mx-auto space-y-4">
                    <h3 className="text-base font-bold text-white">New Study Room</h3>
                    <input type="text" value={roomName} onChange={e => setRoomName(e.target.value)}
                        placeholder="Room name (e.g., ML Study Group)"
                        className="w-full bg-white/[0.04] border border-white/[0.08] rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-primary/40 text-sm" autoFocus />
                    <input type="text" value={roomTopic} onChange={e => setRoomTopic(e.target.value)}
                        placeholder="Topic (e.g., Machine Learning)"
                        className="w-full bg-white/[0.04] border border-white/[0.08] rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-primary/40 text-sm"
                        onKeyDown={e => e.key === "Enter" && createRoom()} />
                    <div className="flex gap-3">
                        <Button onClick={createRoom} disabled={!roomName.trim() || !roomTopic.trim() || isCreating} className="bg-primary hover:bg-primary/90 text-white rounded-xl">
                            {isCreating ? <Loader2 className="w-4 h-4 animate-spin" /> : "Create"}
                        </Button>
                        <Button onClick={() => setShowForm(false)} variant="ghost" className="text-slate-400 rounded-xl">Cancel</Button>
                    </div>
                </div>
            )}

            <div className="grid lg:grid-cols-12 gap-6">
                {/* Room List */}
                <div className="lg:col-span-5 space-y-3">
                    <h2 className="text-lg font-bold text-white">Active Rooms</h2>
                    {isLoading ? (
                        <div className="flex items-center justify-center py-12"><Loader2 className="w-6 h-6 text-primary animate-spin" /></div>
                    ) : rooms.length === 0 ? (
                        <div className="text-center py-12 glass-card">
                            <Users size={40} className="mx-auto mb-3 text-primary/30" />
                            <p className="text-slate-500 text-sm">No rooms yet — create one!</p>
                        </div>
                    ) : (
                        rooms.map(room => (
                            <div key={room.id} onClick={() => viewRoom(room.id)}
                                className={`glass-card p-4 cursor-pointer transition-all group ${activeRoom?.id === room.id ? "border-primary/20 bg-primary/5" : "hover:border-white/10"}`}>
                                <div className="flex justify-between items-start mb-2">
                                    <h3 className="text-sm font-bold text-white">{room.name}</h3>
                                    <span className="text-[10px] bg-secondary/10 text-secondary px-2 py-0.5 rounded-full border border-secondary/20 font-bold">{room.topic}</span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <div className="flex -space-x-2">
                                        {room.members?.slice(0, 3).map((m, i) => (
                                            <Avatar key={i} className="w-6 h-6 border-2 border-[#050507]">
                                                <AvatarImage src={m.user.avatar || `https://api.dicebear.com/9.x/avataaars/svg?seed=${m.user.name || m.user.id}`} />
                                                <AvatarFallback className="text-[8px]">{m.user.name?.[0] || "?"}</AvatarFallback>
                                            </Avatar>
                                        ))}
                                        {(room._count?.members || 0) > 3 && (
                                            <div className="w-6 h-6 rounded-full bg-white/[0.08] border-2 border-[#050507] flex items-center justify-center text-[8px] font-bold text-slate-400">
                                                +{(room._count?.members || 0) - 3}
                                            </div>
                                        )}
                                    </div>
                                    <span className="text-[10px] text-slate-500 font-medium">{room._count?.members || 0} members</span>
                                </div>
                            </div>
                        ))
                    )}
                </div>

                {/* Room Detail */}
                <div className="lg:col-span-7">
                    {activeRoom ? (
                        <div className="glass-card p-6 space-y-6">
                            <div className="flex justify-between items-start">
                                <div>
                                    <h2 className="text-xl font-bold text-white">{activeRoom.name}</h2>
                                    <span className="text-xs text-secondary bg-secondary/10 px-2 py-0.5 rounded-full border border-secondary/20 font-bold">{activeRoom.topic}</span>
                                </div>
                                <div className="flex gap-2">
                                    {isMember(activeRoom) ? (
                                        <Button size="sm" variant="outline" onClick={() => leaveRoom(activeRoom.id)} className="text-red-400 border-red-500/20 hover:bg-red-500/10 rounded-xl">
                                            <LogOut size={14} className="mr-1" /> Leave
                                        </Button>
                                    ) : (
                                        <Button size="sm" onClick={() => joinRoom(activeRoom.id)} className="bg-primary hover:bg-primary/90 text-white rounded-xl">
                                            <LogIn size={14} className="mr-1" /> Join
                                        </Button>
                                    )}
                                    {isHost(activeRoom) && (
                                        <Button size="sm" variant="outline" onClick={() => deleteRoom(activeRoom.id)} className="text-red-400 border-red-500/20 hover:bg-red-500/10 rounded-xl">
                                            <Trash2 size={14} />
                                        </Button>
                                    )}
                                </div>
                            </div>

                            {/* Members */}
                            <div>
                                <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">Members ({activeRoom.members?.length || 0})</h3>
                                <div className="space-y-2">
                                    {activeRoom.members?.map(member => (
                                        <div key={member.id} className="flex items-center gap-3 p-3 rounded-xl bg-white/[0.02] border border-white/[0.04]">
                                            <Avatar className="w-8 h-8">
                                                <AvatarImage src={member.user.avatar || `https://api.dicebear.com/9.x/avataaars/svg?seed=${member.user.name || member.user.id}`} />
                                                <AvatarFallback>{member.user.name?.[0] || "?"}</AvatarFallback>
                                            </Avatar>
                                            <div className="flex-1">
                                                <span className="text-sm font-medium text-white">{member.user.name || "Anonymous"}</span>
                                                {member.user.xp !== undefined && <span className="text-[10px] text-secondary ml-2">{member.user.xp} XP</span>}
                                            </div>
                                            {member.role === "host" && (
                                                <span className="text-[10px] text-yellow-500 bg-yellow-500/10 px-2 py-0.5 rounded-full border border-yellow-500/20 font-bold flex items-center gap-1">
                                                    <Crown size={10} /> Host
                                                </span>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="glass-card flex items-center justify-center h-64 text-center">
                            <div>
                                <Users size={32} className="mx-auto mb-3 text-primary/30" />
                                <p className="text-sm text-slate-500">Select a room to view details</p>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
