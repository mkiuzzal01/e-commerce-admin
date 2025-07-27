/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import {
  FormProvider,
  useForm,
  type UseFormReturn,
  type SubmitHandler,
} from "react-hook-form";

type FormProps = {
  children: React.ReactNode;
  onSubmit?: SubmitHandler<any>;
  defaultValues?: Record<string, any>;
  methods?: UseFormReturn<any>;
};

const ReusableForm = ({
  children,
  onSubmit,
  defaultValues,
  methods,
}: FormProps) => {
  const internalMethods = useForm({ defaultValues });
  const formMethods = methods ?? internalMethods;

  return (
    <FormProvider {...formMethods}>
      <form onSubmit={formMethods.handleSubmit(onSubmit ?? (() => {}))}>
        {children}
      </form>
    </FormProvider>
  );
};

export default ReusableForm;
