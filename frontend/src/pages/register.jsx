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
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

export function Register() {
    const { toast } = useToast()
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [type, setType] = useState('student');
    const { isLoggedIn, setIsLoggedIn } = useAuth();


    useEffect(() => {
        if (isLoggedIn) {
            window.location.href = '/';
        }
    }, [isLoggedIn])

    const handleCreateAccount = async () => {
        try {
            const response = await fetch('http://localhost:3000/user/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ username: email, password,type })
            });

            const data = await response.json();
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
            <div className="flex items-center justify-center mt-4">
                <h1 className="text-black font-bold text-4xl dark:text-white">Gyaan</h1>
            </div>
            <Card className="mt-7">
                <CardHeader className="space-y-1">
                    <CardTitle className="text-2xl">Create an account</CardTitle>
                    <CardDescription>
                        Enter your email below to create your account
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
                    <div className="grid gap-2">
                        <Label htmlFor="password">Type</Label>
                        <p>{type}</p>

                        <Select 
                            onValueChange={(value) => setType(value)}
                        >
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder="Student" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="student">Student</SelectItem>
                                <SelectItem value="teacher">Teacher</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </CardContent>
                <CardFooter className="flex flex-col">
                    <Button className="w-full" onClick={handleCreateAccount}>
                        Create account
                    </Button>
                    <p className="text-center text-sm text-gray-500">
                        Already have an account?{" "}
                        <a href="/login" className="text-blue-500">
                            Login
                        </a>
                    </p>

                </CardFooter>
            </Card>
        </div>
    )
}
