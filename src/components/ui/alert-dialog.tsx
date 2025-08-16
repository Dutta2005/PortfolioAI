"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface AlertDialogProps {
  open: boolean;
  onOpenChangeAction: (open: boolean) => void;
  title: string;
  description: string;
  onConfirmAction: () => void;
  onCancelAction?: () => void;
  confirmText?: string;
  cancelText?: string;
  variant?: "default" | "destructive";
}

export function AlertDialog({
  open,
  onOpenChangeAction,
  title,
  description,
  onConfirmAction,
  onCancelAction,
  confirmText = "Continue",
  cancelText = "Cancel",
  variant = "default",
}: AlertDialogProps) {
  const handleConfirm = () => {
    onConfirmAction();
    onOpenChangeAction(false);
  };

  const handleCancel = () => {
    if (onCancelAction) onCancelAction();
    onOpenChangeAction(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChangeAction}>
      <DialogContent className="sm:max-w-[425px] bg-white border-none">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button className='bg-white shadow-md hover:bg-gray-50 border-inherit' onClick={handleCancel}>
            {cancelText}
          </Button>
          <Button
            onClick={handleConfirm} className='bg-red-600 shadow-md hover:bg-red-500 border-inherit text-white'
          >
            {confirmText}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
