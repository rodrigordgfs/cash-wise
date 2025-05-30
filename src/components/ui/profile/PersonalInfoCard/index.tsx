"use client";

import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/shared/Button";
import { InputField } from "@/components/shared/InputField";
import { useUser } from "@clerk/nextjs";
import { useEffect, useState } from "react";
import { toast } from "sonner";

const schema = z.object({
  name: z.string().min(1, "Nome é obrigatório"),
  email: z.string().email("E-mail inválido"),
});

type FormData = z.infer<typeof schema>;

export const PersonalInfoCard = () => {
  const { user } = useUser();
  const [isEditing, setIsEditing] = useState(false);

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: "",
      email: "",
    },
  });

  useEffect(() => {
    if (user) {
      reset({
        name: String(user?.unsafeMetadata?.name || ""),
        email: String(user?.emailAddresses[0]?.emailAddress || ""),
      });
    }
  }, [user, reset]);

  const onSubmit = async (data: FormData) => {
    await user?.update({
      unsafeMetadata: { name: data.name },
    });
    toast.success("Dados salvos com sucesso!");
    setIsEditing(false);
  };

  return (
    <div className="rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 shadow-sm">
      <div className="p-6">
        <h3 className="text-lg font-semibold">Informações Pessoais</h3>
        <p className="text-sm text-zinc-500 dark:text-zinc-400">
          Gerencie suas informações pessoais
        </p>
      </div>
      <div className="p-6 pt-0">
        {isEditing ? (
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <Controller
              control={control}
              name="name"
              render={({ field }) => (
                <InputField
                  label="Nome"
                  {...field}
                  error={errors.name?.message}
                />
              )}
            />
            <Controller
              control={control}
              name="email"
              render={({ field }) => (
                <InputField
                  label="E-mail"
                  type="email"
                  disabled
                  {...field}
                  error={errors.email?.message}
                />
              )}
            />
            <div className="flex gap-2 pt-4">
              <Button type="submit">Salvar</Button>
              <Button
                type="button"
                variant="neutral"
                onClick={() => {
                  reset();
                  setIsEditing(false);
                }}
              >
                Cancelar
              </Button>
            </div>
          </form>
        ) : (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Nome</label>
              <p className="text-sm">
                {(user?.unsafeMetadata?.name as string) || "-"}
              </p>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">E-mail</label>
              <p className="text-sm">
                {(user?.emailAddresses[0]?.emailAddress as string) || "-"}
              </p>
            </div>
            <Button onClick={() => setIsEditing(true)}>Editar</Button>
          </div>
        )}
      </div>
    </div>
  );
};
