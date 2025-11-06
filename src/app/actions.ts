"use server";

import { db } from "@/lib/firebase";
import { collection, addDoc, Timestamp } from "firebase/firestore";

export async function saveContactAction(data: { name: string; email: string; phone: string; interestType: 'morar' | 'investir'; message?: string; }) {
  try {
    await addDoc(collection(db, "contacts"), {
      ...data,
      createdAt: Timestamp.now(),
    });
    return { success: true };
  } catch (error) {
    console.error("Error adding document: ", error);
    return { success: false, error: "Falha ao salvar contato." };
  }
}
