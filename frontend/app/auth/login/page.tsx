'use client';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { authKeys, useLogin } from '@/lib/hooks/use-auth';
import { zodResolver } from '@hookform/resolvers/zod';
import { useQueryClient } from '@tanstack/react-query';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Controller, useForm } from 'react-hook-form';
import z from 'zod';

const LoginPage = () => {
  const router = useRouter();

  const queryClient = useQueryClient();

  const { mutate: login } = useLogin();

  const formSchema = z.object({
    email: z.email('Incorrect email'),
    password: z.string(),
  });

  const {
    handleSubmit,
    control,
    setError,
    formState: { errors },
  } = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    login(data, {
      onSuccess: async () => {
        await queryClient.invalidateQueries({ queryKey: authKeys.me });
        router.push('/');
      },
      onError: (error: any) => {
        const errorMessage = error?.response?.data?.message || error.message;

        if (
          errorMessage.includes('Wrong credentials') ||
          error?.response?.status === 401
        ) {
          setError('root', {
            type: 'manual',
            message: 'Incorrect email or password. Please try again',
          });
        } else {
          console.error('Registration failed:', errorMessage);
        }
      },
    });
  };

  return (
    <div className="w-full flex justify-center items-center">
      <Card className="w-full bg-[#18181c] max-w-110 text-[#a8a8a9] border-none">
        <CardHeader>
          <CardTitle className="text-white text-2xl">
            Log into you account
          </CardTitle>
          <CardDescription className="flex gap-2 ">
            <p>Don&apos;t have account?</p>
            <Link href="/auth/signup" className="hover:underline text-white">
              Sign up
            </Link>
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form id="form-login" onSubmit={handleSubmit(onSubmit)}>
            <FieldGroup>
              <Controller
                name="email"
                control={control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="form-login-email">Email</FieldLabel>
                    <Input
                      {...field}
                      id="form-login-email"
                      aria-invalid={fieldState.invalid}
                      placeholder="coolgamer@example.com"
                      className="bg-[#232327] p-5 focus-visible:ring-0 focus-visible:ring-offset-0"
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
              <Controller
                name="password"
                control={control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="form-login-password">
                      Password
                    </FieldLabel>
                    <Input
                      {...field}
                      type="password"
                      id="form-login-password"
                      aria-invalid={fieldState.invalid}
                      placeholder="********"
                      className="bg-[#232327] p-5 focus-visible:ring-0 focus-visible:ring-offset-0"
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                    {errors.root && <FieldError errors={[errors.root]} />}
                  </Field>
                )}
              />
            </FieldGroup>
          </form>
        </CardContent>
        <CardFooter>
          <Field orientation="horizontal">
            <Button
              type="submit"
              form="form-login"
              className="bg-[#353538] text-white hover:bg-[#ffffff59] border-none hover:text-white transition duration-100 cursor-pointer"
            >
              Submit
            </Button>
          </Field>
        </CardFooter>
      </Card>
    </div>
  );
};

export default LoginPage;
