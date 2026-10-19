import * as React from "react";
import type {
  AlertDialogSize,
  AlertDialogAppearance,
} from "../alert-dialog";

export interface AlertDialogPresetBaseProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  size?: AlertDialogSize;
  appearance?: AlertDialogAppearance;
  showCloseButton?: boolean;
  closeOnEscape?: boolean;
  closeOnOverlayClick?: boolean;
  trigger?: React.ReactNode;
}
