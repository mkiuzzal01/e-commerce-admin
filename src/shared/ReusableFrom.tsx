/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { FormProvider, useForm } from "react-hook-form";
import type { SubmitHandler } from "react-hook-form";

type FormProps = {
  children: React.ReactNode;
  onSubmit: SubmitHandler<any>;
  defaultValues?: Record<string, any>;
};

const ReusableForm = ({ children, onSubmit, defaultValues }: FormProps) => {
  const methods = useForm({ defaultValues });
  const { handleSubmit } = methods;

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)}>{children}</form>
    </FormProvider>
  );
};

export default ReusableForm;
