import { db } from "@/db";
import { randomInt } from "crypto";

type emailType = {
  email_address: string;
};

export const updateOrCreateUser = async (
  ClerkId: string | undefined,
  email: emailType[],
  username: string | null,
  image: string
) => {
  if (username == null) {
    username = "man";
  }
  if (ClerkId == null) {
    ClerkId = String(randomInt(0, 12232));
  }

  try {
    const existingUser = await db.user.findUnique({
      where: {
        ClerkId,
      },
    });

    if (existingUser) {
      await db.user.update({
        where: {
          ClerkId,
        },
        data: {
          email: email[0].email_address,
          username,
          image,
        },
      });
    } else {
      await db.user.create({
        data: {
          ClerkId,
          username,
          email: email[0].email_address,
          image,
        },
      });
    }
  } catch (error) {
    console.error("Error updating/creating user:", error);
    // Handle the error appropriately, such as logging or throwing
    throw error;
  }
};

export const deleteUser = async (ClerkId: string | undefined) => {
  try {
    await db.user.delete({ where: { ClerkId } });
  } catch (error) {
    console.error("Error deleting user:", error);
    // Handle the error appropriately, such as logging or throwing
    throw error;
  }
};
