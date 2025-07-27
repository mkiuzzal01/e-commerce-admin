import Swal from "sweetalert2";
import type { SweetAlertIcon } from "sweetalert2";

type ConfirmAlertProps = {
  title?: string;
  text?: string;
  confirmButtonText?: string;
  cancelButtonText?: string;
  icon?: SweetAlertIcon;
  confirmColor?: string;
  cancelColor?: string;
  showCancelButton?: boolean;
  showSuccessAlert?: boolean;
  successTitle?: string;
  successText?: string;
  successIcon?: SweetAlertIcon;
};

export const showAlert = async ({
  title = "Are you sure?",
  text = "You won't be able to revert this!",
  confirmButtonText = "Yes, confirm!",
  cancelButtonText = "Cancel",
  icon = "warning",
  confirmColor = "#3085d6",
  cancelColor = "#d33",
  showCancelButton = true,
  showSuccessAlert = true,
  successTitle = "Success!",
  successText = "Action has been completed.",
  successIcon = "success",
}: ConfirmAlertProps): Promise<boolean> => {
  const result = await Swal.fire({
    title,
    text,
    icon,
    showCancelButton,
    confirmButtonColor: confirmColor,
    cancelButtonColor: cancelColor,
    confirmButtonText,
    cancelButtonText,
  });

  if (result.isConfirmed && showSuccessAlert) {
    await Swal.fire({
      title: successTitle,
      text: successText,
      icon: successIcon,
    });
  }

  return result.isConfirmed;
};
