'use client';

import axios from 'axios';
import { FcGoogle } from 'react-icons/fc';
import { AiFillGithub } from 'react-icons/ai';
import { useCallback, useState } from 'react';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { signIn } from 'next-auth/react';

import useLoginModal from '@/app/hooks/useLoginModal';
import useRegisterModal from '@/app/hooks/useRegisterModal';

import Modal from './Modal';
import Heading from '../Heading';
import Input from '../inputs/Input';
import toast from 'react-hot-toast';
import Button from '../Button';

const RegisterModal = () => {
  const registerModal = useRegisterModal();
  const loginModal = useLoginModal();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      name: '',
      email: '',
      password: '',
    },
  });

  const onModalClose = () => {
    registerModal.onClose();
    reset();
  };

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    setIsLoading(true);
    // const { data: respData, status } = await axios.post('/api/register', data);
    axios
      .post(`/api/register`, data)
      .then(() => {
        reset();
        registerModal.onClose();
        loginModal.onOpen();
      })
      .catch((err) => {
        toast.error(
          'An error occurred while processing the request. Please try again!'
        );
        setIsLoading(false);
      })
      .finally(() => setIsLoading(false));
  };

  const onToggleModal = useCallback(() => {
    registerModal.onClose();
    loginModal.onOpen();
  }, [loginModal, registerModal]);

  const bodyContent = (
    <div className='flex flex-col gap-4'>
      <Heading title='Welcome to Airbnb' subTitle='Create an Account' center />
      <Input
        id='name'
        label='Name'
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />

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

      <div className='text-neutral-500 text-center mt-4 font-light'>
        <div className='flex flex-row items-center justify-center gap-2'>
          <div>Already have an account?</div>
          <div
            onClick={onToggleModal}
            className='text-neutral-800 cursor-pointer hover:underline'
          >
            Sign In
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <Modal
      title='Register'
      actionLabel='Continue'
      disabled={isLoading}
      isOpen={registerModal.isOpen}
      onSubmit={handleSubmit(onSubmit)}
      onClose={onModalClose}
      body={bodyContent}
      footer={footerContent}
    />
  );
};

export default RegisterModal;
