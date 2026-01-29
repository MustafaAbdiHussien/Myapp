import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Zap, Eye, EyeOff, Lock, Mail } from "lucide-react";

const LoginPage = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            const apiBase = import.meta.env.PROD ? "" : "http://localhost:5000";
            const res = await fetch(`${apiBase}/api/auth/login`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
            });

            let result;
            const text = await res.text();
            try {
                result = JSON.parse(text);
            } catch (e) {
                console.error("Non-JSON response:", text);
                throw new Error("Server error: System returned invalid response.");
            }

            if (!res.ok) throw new Error(result.message || "Invalid credentials");

            localStorage.setItem("token", result.token);
            localStorage.setItem("user", JSON.stringify(result.user));
            localStorage.setItem("isAuthenticated", "true");
            toast.success("Identity verified. Welcome back.");
            navigate("/");
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
                    <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-[2.5rem] bg-card shadow-2xl shadow-black/20 border border-border">
                        <Zap className="h-10 w-10 text-primary fill-current" />
                    </div>
                    <h1 className="text-4xl font-black tracking-tight text-foreground">Secure Login</h1>
                    <p className="mt-3 text-sm font-medium text-muted-foreground uppercase tracking-widest">Access your dashboard</p>
                </div>

                <Card className="border-0 bg-card shadow-2xl shadow-black/30 rounded-[2.5rem] overflow-hidden">
                    <CardContent className="p-8 sm:p-10">
                        <form onSubmit={handleLogin} className="space-y-6">
                            <div className="space-y-2">
                                <Label className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground ml-1">Universal ID (Email)</Label>
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
                                <Label className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground ml-1">Access Key (Password)</Label>
                                <div className="relative">
                                    <Lock className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                                    <Input
                                        type={showPassword ? "text" : "password"}
                                        placeholder="••••••••"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                        className="h-14 bg-background border-border pl-12 rounded-2xl focus:ring-2 focus:ring-primary/20 transition-all font-medium"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                                    >
                                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                                    </button>
                                </div>
                            </div>
                            <Button
                                type="submit"
                                disabled={isLoading}
                                className="h-14 w-full bg-primary hover:bg-primary/90 text-white font-black text-xs uppercase tracking-[0.2em] shadow-xl shadow-primary/20 rounded-2xl transition-all active:scale-95"
                            >
                                {isLoading ? "Processing..." : "Initialise Session"}
                            </Button>
                        </form>
                    </CardContent>
                </Card>

                <p className="mt-10 text-center text-sm font-medium text-muted-foreground">
                    New to the system?{" "}
                    <Link to="/signup" className="font-black text-primary hover:underline underline-offset-4 tracking-tight">
                        Create Identity
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default LoginPage;
