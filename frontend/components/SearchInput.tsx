'use client';

import { Search } from 'lucide-react';
import { Field } from './ui/field';
import { Input } from './ui/input';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

const searchSchema = z.object({
  title: z.string().trim(),
});

type SearchFormValues = z.infer<typeof searchSchema>;

const SearchInput = () => {
  const router = useRouter();

  const { register, handleSubmit } = useForm<SearchFormValues>({
    resolver: zodResolver(searchSchema),
    defaultValues: {
      title: '',
    },
  });

  const onSubmit = ({ title }: SearchFormValues) => {
    router.push(
      `/games?search=${encodeURIComponent(title)}&sortBy=title&sortOrder=asc&page=1`,
    );
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Field>
        <div className="flex items-center bg-[#202024] p-2 rounded-3xl">
          <Search size={20} color="#686868" />
          <Input
            type="text"
            placeholder="Search store"
            {...register('title')}
            className="border-none text-[#b1b1b2] focus-visible:ring-0 focus-visible:ring-offset-0"
          />
        </div>
      </Field>
    </form>
  );
};

export default SearchInput;
