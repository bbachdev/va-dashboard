'use client'
import { Button } from '@/components/ui/Button';
import { Card, CardContent, CardTitle } from '@/components/ui/Card';
import { Checkbox } from '@/components/ui/Checkbox';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/Form';
import { Input } from '@/components/ui/Input';
import { Separator } from '@/components/ui/Separator';
import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const signUpSchema = z.object({
  email: z.string().email(),
  password: z.string(),
  confirmPassword: z.string(),
  userConsented: z.boolean(),
}).superRefine((data, ctx) => {
  if (data.password !== data.confirmPassword) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: 'Passwords do not match',
    });
  }
});

export default function SignUp() {
  const [hasConsented, setHasConsented] = useState<boolean | 'indeterminate'>(false)

  const form = useForm<z.infer<typeof signUpSchema>>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
      userConsented: false
    },
  })

  async function onSubmit(data: z.infer<typeof signUpSchema>) {
    console.log(data)
  }

  return (
    <div>
      <Card className={`mt-8 w-1/3 xl:w-1/5 mx-auto`}>
        <CardTitle className={`text-center text-3xl`}>Sign Up</CardTitle>
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
                    <Input autoComplete='new-password' type='password' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}/>
              <FormField control={form.control} name="confirmPassword" render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirm Password</FormLabel>
                  <FormControl>
                    <Input autoComplete='password-confirm' type='confirmPassword' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}/>
              <FormField control={form.control} name="userConsented" render={({ field }) => (
                <FormItem className={`flex flex-row gap-2 items-center`}>
                  <FormControl>
                    <Checkbox checked={hasConsented} onChange={field.onChange} onCheckedChange={setHasConsented} />
                  </FormControl>
                  <FormLabel>I agree to the <a className={`underline`} href={`/terms`} target='_blank'>Terms of Service</a></FormLabel>
                  <FormMessage />
                </FormItem>
              )}/>
              <Button type="submit" disabled={!hasConsented}>Sign Up</Button>
            </form>
          </Form>
          <Separator className={`mt-8 mb-4`} />
          <div className={`flex flex-col text-center`}>
            <p>{`Already have an account?`}</p>
            <p><Link className={`underline text-sm`} href={`/signup`}>Sign In</Link></p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}