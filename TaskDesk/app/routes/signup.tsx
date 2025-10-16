import type { Route } from "./+types/signup";
import { Welcome } from "../welcome/welcome";
import { prisma } from "~/lib/prisma.server";
import { redirect } from "react-router";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "TaskDesk - Créer un compte" },
    { name: "description", content: "Créez votre compte TaskDesk" },
  ];
}

export async function action({ request }: Route.ActionArgs) {
  const formData = await request.formData();
  const username = formData.get("username") as string;
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const confirmPassword = formData.get("confirmPassword") as string;

  // Validation
  if (!username || !email || !password || !confirmPassword) {
    return { error: "Tous les champs sont requis" };
  }

  if (password.length < 8) {
    return { error: "Le mot de passe doit faire au moins 8 caractères" };
  }

  if (password !== confirmPassword) {
    return { error: "Les mots de passe ne correspondent pas" };
  }

  try {
    // Créer l'utilisateur
    await prisma.user.create({
      data: {
        username,
        email,
        password, // TODO: Hash le mot de passe avec bcrypt
      },
    });

    // Rediriger vers la page de login
    return redirect("/login");
  } catch (error: any) {
    if (error.code === "P2002") {
      return { error: "Cet email ou nom d'utilisateur est déjà utilisé" };
    }
    return { error: "Une erreur est survenue lors de la création du compte" };
  }
}

export default function SignupRoute() {
  return <Welcome />;
}
