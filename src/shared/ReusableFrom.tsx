import { FormProvider, useForm } from "react-hook-form";

const ReusableForm = ({
  children,
  onSubmit,
  resolver,
  defaultValues,
}: {
  children: React.ReactNode;
  onSubmit: (values: any) => void;
  resolver?: any;
  defaultValues?: any;
}) => {
  const methods = useForm({
    resolver,
    defaultValues,
  });

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        {children}
      </form>
    </FormProvider>
  );
};

export default ReusableForm;
