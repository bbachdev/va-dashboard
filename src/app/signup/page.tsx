'use client'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { z } from 'zod';
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

const signUpSchema = z.object({
  email: z.string().email(),
  displayName: z.string(),
  password: z.string().min(12).refine((val) => val.length > 12),
  passwordConfirmation: z.string(),
  acceptToS: z.boolean(),
}).superRefine((data, ctx) => {
  if (data.password !== data.passwordConfirmation) {
    ctx.addIssue({
      code: 'custom',
      message: 'The passwords you entered do not match',
      path: ['passwordConfirmation'],
    });
  }
});

export default function SignUp() {
  const form = useForm<z.infer<typeof signUpSchema>>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      email: "",
      displayName: "",
      password: "",
      passwordConfirmation: "",
      acceptToS: false,
    },
  })

  function handleSubmit(data: z.infer<typeof signUpSchema>) {
    console.log(data);
  }

  const tosWatch = form.watch("acceptToS")

  return (
    <div className={`mx-auto flex flex-col items-center`}>
      <Card className={`w-96 mt-8`}>
        <CardHeader className={`flex flex-col items-center`}>
          <CardTitle className={`text-3xl`}>Sign Up</CardTitle>
          <CardDescription>Card Description</CardDescription>
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
                  <FormMessage />
                </FormItem>
              )}/>
              <FormField control={form.control} name="displayName" render={({field}) => (
                <FormItem>
                  <FormLabel>Display Name</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}/>
              <FormField control={form.control} name="password" render={({field}) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input type="password" {...field} />
                  </FormControl>
                  <div className={`text-muted-foreground text-sm`}>
                    <span className={`font-bold`}>Passwords must: </span>
                    <ul className={`mt-1 text-xs list-disc list-inside`}>
                      <li>Be at least 12 characters long</li>
                      <li>Contain at least one uppercase and one lowercase letter</li>
                      <li>Contain at least one number</li>
                      <li>Contain at least one special character</li>
                    </ul>
                  </div>
                  
                  <FormMessage />
                </FormItem>
              )}/>
              <FormField control={form.control} name="passwordConfirmation" render={({field}) => (
                <FormItem>
                  <FormLabel>Confirm Password</FormLabel>
                  <FormControl>
                    <Input type="password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}/>
              <FormField control={form.control} name="acceptToS" render={({field}) => (
                <FormItem className={`flex flex-col`}>
                  <div className={`mr-auto flex flex-row items-center gap-2`}>
                    <FormControl>
                      <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                    </FormControl>
                    <p className={`text-sm`}>I accept the <a href="#" className={`text-cyan-950 underline`}>Terms of Service</a></p>
                  </div>
                  <FormMessage />
                </FormItem>
              )}/>
              <div className={`mt-4 flex flex-col`}>
                <Button className={`w-full bg-cyan-950 text-white disabled:bg-cyan-950/40`} type='submit' disabled={tosWatch === false}>Sign Up</Button>
                <div className={`flex flex-col items-center text-sm mt-4`}>
                  <p>Already have an account?</p>
                  <Link href="/signin" className={`text-sm underline`}>Sign In</Link>
                </div>
                
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
      
    </div>
  )
}