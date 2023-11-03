'use client';

import axios from 'axios';
import toast from 'react-hot-toast';
import { FcGoogle } from 'react-icons/fc';
import { AiFillGithub } from 'react-icons/ai';
import { useCallback, useState } from 'react';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';

import useLoginModal from '@/app/hooks/useLoginModal';
import useRegisterModal from '@/app/hooks/useRegisterModal';

import Modal from './Modal';
import Heading from '../Heading';
import Input from '../inputs/Input';
import Button from '../Button';

const LoginModal = () => {
  const router = useRouter();
  const loginModal = useLoginModal();
  const registerModal = useRegisterModal();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onModalClose = () => {
    loginModal.onClose();
    reset();
  };

  const onToggleModal = useCallback(() => {
    loginModal.onClose();
    registerModal.onOpen();
  }, [registerModal, loginModal]);

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    setIsLoading(true);

    signIn('credentials', {
      ...data,
      redirect: false,
    }).then((resp) => {
      if (resp?.ok) {
        toast.success('Authentication success!');
        router.refresh();
        loginModal.onClose();
      }

      if (resp?.error) {
        setIsLoading(false);
        toast.error(
          'An error occurred while authenticating the account. Please try again!'
        );
      }
    });
  };

  const bodyContent = (
    <div className='flex flex-col gap-4'>
      <Heading title='Welcome back' subTitle='Login to your account!' center />
      <Input
        id='email'
        label='Email'
        disabled={isLoading}
        register={register}
        errors={errors}
        autoComplete='off'
        required
      />

      <Input
        id='password'
        label='Password'
        type='password'
        disabled={isLoading}
        register={register}
        errors={errors}
        autoComplete='off'
        required
      />
    </div>
  );

  const footerContent = (
    <div className='flex flex-col gap-4 mt-3'>
      <hr />
      <Button
        outline
        label='Continue with Google'
        icon={FcGoogle}
        onClick={() => signIn('google')}
      />

      <Button
        outline
        label='Continue with Github'
        icon={AiFillGithub}
        onClick={() => signIn('github')}
      />

      <div
        className='
        text-neutral-500 
        text-center 
        mt-4 
        font-light'
      >
        <p>
          First time using Airbnb?
          <span
            onClick={onToggleModal}
            className='
              text-neutral-800
              cursor-pointer 
              hover:underline'
          >
            {' '}
            Create an account
          </span>
        </p>
      </div>
    </div>
  );

  return (
    <Modal
      title='Login'
      actionLabel='Sign In'
      disabled={isLoading}
      isOpen={loginModal.isOpen}
      onSubmit={handleSubmit(onSubmit)}
      onClose={onModalClose}
      body={bodyContent}
      footer={footerContent}
    />
  );
};

export default LoginModal;
