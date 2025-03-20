'use client'
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { authClient } from "@/lib/auth-client";
import ClipLoader from "react-spinners/ClipLoader";
import { useRouter } from 'next/navigation';

const signInSchema = z.object({
  email: z.string().email(),
  password: z.string()
})

export default function SignIn() {
  const router = useRouter()

  const form = useForm<z.infer<typeof signInSchema>>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  async function handleSubmit(data: z.infer<typeof signInSchema>) {
    console.log(data);
    const authResult = await authClient.signIn.email({
      email: data.email,
      password: data.password,
    });

    if (authResult.error) {
      console.log(authResult.error);
    }else{
      router.push("/dashboard");
    }
  }

  return (
    <div className={`mx-auto flex flex-col items-center`}>
      <Card className={`w-96 mt-8`}>
        <CardHeader className={`flex flex-col items-center`}>
          <CardTitle className={`text-3xl`}>Sign In</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)} className={`flex flex-col gap-4`}>
              <FormField control={form.control} name="email" render={({field}) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="yourname@example.com" type='email' {...field} />
                  </FormControl>
                </FormItem>
              )}/>
              <FormField control={form.control} name="password" render={({field}) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input type="password" {...field} />
                  </FormControl>  
                </FormItem>
              )}/>
              
              <div className={`mt-4 flex flex-col`}>
                <Button className={`w-full bg-cyan-950 text-white disabled:bg-cyan-950/40`} type='submit'>
                  { form.formState.isSubmitting && <ClipLoader className={`h-4 w-4 animate-spin`} color={`#fff`} /> || `Sign In`}
                </Button>
                <div className={`flex flex-col items-center text-sm mt-4`}>
                  <p>{`Don't have an account?`}</p>
                  <Link href="/signup" className={`text-sm underline`}>Sign Up</Link>
                </div>
                
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
      
    </div>
  )
}