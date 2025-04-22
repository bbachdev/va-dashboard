'use client'
import { Card, CardContent, CardTitle } from '@/components/ui/Card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/Form';
import { z } from 'zod';

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { Separator } from '@/components/ui/Separator';
import Link from 'next/link';

const signInSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

export default function SignIn() {
  const form = useForm<z.infer<typeof signInSchema>>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  async function onSubmit(data: z.infer<typeof signInSchema>) {
    console.log(data)
  }

  return (
    <div>
      <Card className={`mt-8 w-1/3 xl:w-1/5 mx-auto`}>
        <CardTitle className={`text-center text-3xl`}>Sign In</CardTitle>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className={`flex flex-col gap-8`}>
              <FormField control={form.control} name="email" render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}/>
              <FormField control={form.control} name="password" render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input type='password' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}/>
              <Button type="submit">Sign In</Button>
            </form>
          </Form>
          <Separator className={`mt-8 mb-4`} />
          <div className={`flex flex-col text-center`}>
            <p>{`Don't have an account?`}</p>
            <p><Link className={`underline text-sm`} href={`/signup`}>Sign Up</Link></p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}