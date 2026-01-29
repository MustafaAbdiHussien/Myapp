import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Zap, UserPlus, Mail, Lock, User } from "lucide-react";

const SignupPage = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const handleSignup = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            const apiBase = import.meta.env.PROD ? "" : "http://localhost:5000";
            const res = await fetch(`${apiBase}/api/auth/signup`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name, email, password }),
            });

            let result;
            const text = await res.text();
            try {
                result = JSON.parse(text);
            } catch (e) {
                console.error("Non-JSON response:", text);
                throw new Error("Server error: System returned invalid response.");
            }

            if (!res.ok) throw new Error(result.message || "Registration failed");

            toast.success("Identity established. Welcome to the system.");
            navigate("/login");
        } catch (error: any) {
            toast.error(error.message);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-background px-6">
            <div className="w-full max-w-md animate-fade-in">
                <div className="mb-10 text-center">
                    <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-[2.5rem] bg-card shadow-2xl shadow-black/20 border border-border mt-10">
                        <UserPlus className="h-10 w-10 text-primary" />
                    </div>
                    <h1 className="text-4xl font-black tracking-tight text-foreground">Join System</h1>
                    <p className="mt-3 text-sm font-medium text-muted-foreground uppercase tracking-widest">Create your productivity nexus</p>
                </div>

                <Card className="border-0 bg-card shadow-2xl shadow-black/30 rounded-[2.5rem] overflow-hidden mb-10">
                    <CardContent className="p-8 sm:p-10">
                        <form onSubmit={handleSignup} className="space-y-6">
                            <div className="space-y-2">
                                <Label className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground ml-1">Full Name</Label>
                                <div className="relative">
                                    <User className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                                    <Input
                                        placeholder="Identity Label"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        required
                                        className="h-14 bg-background border-border pl-12 rounded-2xl focus:ring-2 focus:ring-primary/20 transition-all font-medium"
                                    />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <Label className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground ml-1">Email Protocol</Label>
                                <div className="relative">
                                    <Mail className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                                    <Input
                                        type="email"
                                        placeholder="user@system.io"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                        className="h-14 bg-background border-border pl-12 rounded-2xl focus:ring-2 focus:ring-primary/20 transition-all font-medium"
                                    />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <Label className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground ml-1">Secure Passkey</Label>
                                <div className="relative">
                                    <Lock className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                                    <Input
                                        type="password"
                                        placeholder="••••••••"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                        className="h-14 bg-background border-border pl-12 rounded-2xl focus:ring-2 focus:ring-primary/20 transition-all font-medium"
                                    />
                                </div>
                            </div>
                            <Button
                                type="submit"
                                disabled={isLoading}
                                className="h-14 w-full bg-primary hover:bg-primary/90 text-white font-black text-xs uppercase tracking-[0.2em] shadow-xl shadow-primary/20 rounded-2xl transition-all active:scale-95"
                            >
                                {isLoading ? "Synchronizing..." : "Finalise Enrollment"}
                            </Button>
                        </form>
                    </CardContent>
                </Card>

                <p className="mt-4 text-center text-sm font-medium text-muted-foreground pb-10">
                    Already enrolled?{" "}
                    <Link to="/login" className="font-black text-primary hover:underline underline-offset-4 tracking-tight">
                        Login to Vault
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default SignupPage;
