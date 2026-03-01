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
import { useRegister } from '@/lib/hooks/use-auth';
import { zodResolver } from '@hookform/resolvers/zod';
import { useQueryClient } from '@tanstack/react-query';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Controller, useForm } from 'react-hook-form';
import z from 'zod';

const SignUpPage = () => {
  const router = useRouter();

  const queryClient = useQueryClient();

  const { mutate: register } = useRegister();

  const formSchema = z.object({
    email: z.email('Incorrect email'),
    password: z
      .string()
      .min(8, 'Password must be at least 8 characters')
      .regex(/[A-Z]/, 'Must contain at least one uppercase letter')
      .regex(/[a-z]/, 'Must contain at least one lowercase letter')
      .regex(/[0-9]/, 'Must contain at least one number')
      .regex(/[\W_]/, 'Must contain at least one special character'),
    passwordConfirm: z.string(),
    name: z
      .string()
      .trim()
      .min(2, 'Nickname must be at least 2 characters')
      .max(32, 'Nickname must be at most 32 characters'),
  });

  const { handleSubmit, control, setError } = useForm<
    z.infer<typeof formSchema>
  >({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
      passwordConfirm: '',
      name: '',
    },
  });

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    register(data, {
      onSuccess: async () => {
        await queryClient.invalidateQueries({ queryKey: authKeys.me });
        router.push('/');
      },
      onError: (error: any) => {
        const errorMessage = error?.response?.data?.message || error.message;

        if (
          errorMessage.includes('Unique constraint failed') ||
          error?.response?.status === 409
        ) {
          setError('email', {
            type: 'manual',
            message: 'User with this email already exists',
          });
        } else if (
          errorMessage.includes('Passwords do not match') ||
          error?.response?.status === 400
        ) {
          setError('passwordConfirm', {
            type: 'manual',
            message: 'Passwords do not match',
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
            Register new account
          </CardTitle>
          <CardDescription className="flex gap-2 ">
            <p>Already have an account?</p>
            <Link href="/auth/login" className="hover:underline text-white">
              Log in
            </Link>
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form id="form-signup" onSubmit={handleSubmit(onSubmit)}>
            <FieldGroup>
              <Controller
                name="email"
                control={control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="form-signup-email">Email</FieldLabel>
                    <Input
                      {...field}
                      id="form-signup-email"
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
                name="name"
                control={control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="form-signup-name">Name</FieldLabel>
                    <Input
                      {...field}
                      id="form-signup-name"
                      aria-invalid={fieldState.invalid}
                      placeholder="Cool Gamer"
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
                    <FieldLabel htmlFor="form-signup-password">
                      Password
                    </FieldLabel>
                    <Input
                      {...field}
                      type="password"
                      id="form-signup-password"
                      aria-invalid={fieldState.invalid}
                      placeholder="********"
                      className="bg-[#232327] p-5 focus-visible:ring-0 focus-visible:ring-offset-0"
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
              <Controller
                name="passwordConfirm"
                control={control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="form-signup-password-confirm">
                      Confirm Password
                    </FieldLabel>
                    <Input
                      {...field}
                      type="password"
                      id="form-signup-password-confirm"
                      aria-invalid={fieldState.invalid}
                      placeholder="********"
                      className="bg-[#232327] p-5 focus-visible:ring-0 focus-visible:ring-offset-0"
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
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
              form="form-signup"
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

export default SignUpPage;
