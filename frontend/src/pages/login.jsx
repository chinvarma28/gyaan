import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/components/ui/use-toast"
import { useAuth } from "../store/auth-provider"
import { useEffect, useState } from 'react';

export function Login() {
    const { toast } = useToast()
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { isLoggedIn, setIsLoggedIn } = useAuth();
    

    useEffect(() => {
        if (isLoggedIn) {
            window.location.href = '/';
        }
    }, [isLoggedIn])

    const handleCreateAccount = async () => {
        try {
            const response = await fetch('http://localhost:3000/user/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ username: email, password })
            });

            const data=await response.json();
            if (response.ok) {
                setIsLoggedIn(true);
                localStorage.setItem('token', JSON.stringify(data.token).slice(1, -1));
                toast({
                    title: data.message,
                    description: "Congrats Dear Student! You have successfully created your account.",
                })
            } else {
                toast({
                    title: "Error",
                    description: data.message,
                    variant: "destructive"
                })
            }
        } catch (error) {
            console.error('Error creating account:', error);
        }
    };

    return (
        <div className="lg:px-[20rem]">
            <Card className="mt-12">
                <CardHeader className="space-y-1">
                    <CardTitle className="text-2xl">Login</CardTitle>
                    <CardDescription>
                        Enter your email below to login to your account
                    </CardDescription>
                </CardHeader>
                <CardContent className="grid gap-4">
                    <div className="grid gap-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                            id="email"
                            type="email"
                            placeholder="m@example.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="password">Password</Label>
                        <Input
                            id="password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                </CardContent>
                <CardFooter className="flex flex-col">
                    <Button className="w-full" onClick={handleCreateAccount}>
                        Login
                    </Button>
                    <p className="text-center text-gray-500 text-sm">
                        Don&apos;t have an account?{" "}
                        <a href="/register" className="text-blue-500">
                            Register
                        </a>
                    </p>

                </CardFooter>
            </Card>
        </div>
    )
}
