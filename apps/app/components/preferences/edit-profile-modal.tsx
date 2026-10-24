"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import type {
  AuthUser,
  UpdateProfileInput,
} from "@workspace/types/use-cases/users";
import { updateProfileInputSchema } from "@workspace/types/use-cases/users";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@workspace/ui/components/alert-dialog";
import { Button } from "@workspace/ui/components/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@workspace/ui/components/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@workspace/ui/components/form";
import { Input } from "@workspace/ui/components/input";
import { Skeleton } from "@workspace/ui/components/skeleton";
import { Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import {
  deleteAccount as deleteAccountMutation,
  updateProfile as updateProfileMutation,
} from "./mutations";

interface EditProfileModalProps {
  onOpenChange: (open: boolean) => void;
  open: boolean;
  user: AuthUser | undefined;
}

function EditProfileModalSkeleton() {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Skeleton className="h-4 w-12" />
        <Skeleton className="h-9 w-full" />
      </div>
      <div className="flex justify-between pt-4">
        <Skeleton className="h-9 w-36" />
        <div className="flex gap-2">
          <Skeleton className="h-9 w-20" />
          <Skeleton className="h-9 w-28" />
        </div>
      </div>
    </div>
  );
}

interface EditProfileFormProps {
  onOpenChange: (open: boolean) => void;
  user: AuthUser;
}

function EditProfileForm({ onOpenChange, user }: EditProfileFormProps) {
  const queryClient = useQueryClient();
  const router = useRouter();
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const updateProfile = useMutation(updateProfileMutation(queryClient));
  const deleteAccount = useMutation(deleteAccountMutation(queryClient));

  const isDemoAccount = user.email === "demo@orion-kit.dev";

  const form = useForm<UpdateProfileInput>({
    resolver: zodResolver(updateProfileInputSchema),
    defaultValues: {
      name: user.name || "",
    },
  });

  const onSubmit = async (data: UpdateProfileInput) => {
    try {
      await updateProfile.mutateAsync(data);
      router.refresh();
      onOpenChange(false);
    } catch {
      // Error is handled by the mutation
    }
  };

  const handleDeleteAccount = async () => {
    try {
      await deleteAccount.mutateAsync({});
    } catch {
      // Error is handled by the mutation
    }
  };

  return (
    <>
      <Form {...form}>
        <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nome</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Digite seu nome"
                    {...field}
                    disabled={isDemoAccount}
                  />
                </FormControl>
                {isDemoAccount && (
                  <p className="text-muted-foreground text-xs">
                    Não é possível editar o nome da conta de demonstração
                  </p>
                )}
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex justify-between pt-4">
            {isDemoAccount ? (
              <div className="flex items-center gap-2 text-muted-foreground text-sm">
                <Trash2 className="h-4 w-4" />
                <span>Não é possível excluir a conta de demonstração</span>
              </div>
            ) : (
              <Button
                className="flex items-center gap-2"
                onClick={() => setShowDeleteConfirm(true)}
                type="button"
                variant="destructive"
              >
                <Trash2 className="h-4 w-4" />
                Excluir conta
              </Button>
            )}

            <div className="flex gap-2">
              <Button
                onClick={() => onOpenChange(false)}
                type="button"
                variant="outline"
              >
                Cancelar
              </Button>
              <Button
                disabled={updateProfile.isPending || isDemoAccount}
                type="submit"
              >
                {updateProfile.isPending ? "Salvando..." : "Salvar alterações"}
              </Button>
            </div>
          </div>
        </form>
      </Form>

      <AlertDialog onOpenChange={setShowDeleteConfirm} open={showDeleteConfirm}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Tem certeza absoluta?</AlertDialogTitle>
            <AlertDialogDescription>
              Essa ação não pode ser desfeita. Sua conta será excluída
              permanentemente e todos os seus dados serão removidos dos nossos
              servidores.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
              disabled={deleteAccount.isPending}
              onClick={handleDeleteAccount}
            >
              {deleteAccount.isPending ? "Excluindo..." : "Excluir conta"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}

export function EditProfileModal({
  open,
  onOpenChange,
  user,
}: EditProfileModalProps) {
  return (
    <Dialog onOpenChange={onOpenChange} open={open}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Editar perfil</DialogTitle>
          <DialogDescription>
            {user?.email === "demo@orion-kit.dev"
              ? "Conta de demonstração: edição limitada."
              : "Atualize as informações do seu perfil ou exclua sua conta."}
          </DialogDescription>
        </DialogHeader>
        {user ? (
          <EditProfileForm onOpenChange={onOpenChange} user={user} />
        ) : (
          <EditProfileModalSkeleton />
        )}
      </DialogContent>
    </Dialog>
  );
}
