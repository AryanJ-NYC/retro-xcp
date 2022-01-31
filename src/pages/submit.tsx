import clsx from 'clsx';
import { NextPage } from 'next';
import Head from 'next/head';
import React from 'react';
import { useForm } from 'react-hook-form';
import { toast, Toaster } from 'react-hot-toast';
import { Layout } from '../modules/shared/components/Layout';

const Submit: NextPage = () => {
  const {
    handleSubmit,
    register,
    reset,
    formState: { isSubmitting },
  } = useForm();

  return (
    <Layout className="space-y-8">
      <Head>
        <title>RetroXCP | Submit</title>
      </Head>
      <h1>Submission Rules</h1>
      <ol className="list-inside list-decimal space-y-2">
        <li>
          Do not share your image with anyone until approved or denied. This is for your protection.
        </li>
        <li>Token must not be divisible</li>
        <li>Token must be locked</li>
        <li>Do not send token until approved</li>
        <li>Only 1 submission per artist until approved or denied</li>
      </ol>
      <form
        onSubmit={handleSubmit(async (data) => {
          const formData = new FormData();
          formData.append('assetName', data.assetName);
          formData.append('contact', data.contact);
          formData.append('file', data.file[0]);
          const response = await fetch('/api/submit', { method: 'POST', body: formData });
          if (response.ok) {
            toast.success(`${data.assetName} has been submitted!`, { duration: 30_000 });
            reset();
          } else {
            const { error } = await response.json();
            toast.error(error ?? 'Something went wrong. Please try again or contact Aryan');
          }
        })}
      >
        <div className="space-y-4">
          <div>
            <label className="flex flex-col max-w-lg space-y-1">
              <p>Xchain Asset Name</p>
              <input
                className="nes-input py-1 px-2 rounded min-w-full"
                {...register('assetName')}
                required
              />
            </label>
          </div>
          <div>
            <label className="flex flex-col max-w-lg space-y-1">
              <p>Artist Contact</p>
              <input
                className="nes-input py-1 px-2 rounded min-w-full"
                {...register('contact')}
                required
              />
            </label>
          </div>
          <label className="nes-btn">
            <span>Select Your File</span>
            <input
              accept="image/png, image/jpeg, image/gif"
              className="hidden"
              type="file"
              {...register('file')}
              required
            />
          </label>
          <ButtonBusySpinner className="nes-btn is-primary" isBusy={isSubmitting} type="submit">
            Submit
          </ButtonBusySpinner>
        </div>
      </form>
      <Toaster />
    </Layout>
  );
};

const ButtonBusySpinner: React.FC<
  React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> & {
    isBusy?: boolean;
  }
> = ({ children, className, isBusy, ...props }) => {
  return (
    <button {...props} className={clsx(className, 'flex justify-center items-center')}>
      <span className={clsx(isBusy && 'invisible')}> {children}</span>
      <span className="absolute animate-spin">{isBusy && <i className="nes-icon coin" />}</span>
    </button>
  );
};

export default Submit;
