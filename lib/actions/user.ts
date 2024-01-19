import { db } from "@/db";
import { randomInt } from "crypto";

type EmailType = {
  email_address: string;
};

export const updateOrCreateUser = async (
  ClerkId: string | undefined,
  email: EmailType[],
  username: string | null,
  image: string
): Promise<void> => {
  if (username == null) {
    username = "man";
  }
  if (ClerkId == null) {
    ClerkId = String(randomInt(0, 12232));
  }

  console.log("----------------------------------- it has been used ");

  try {
    const existingUser = await db.user.findUnique({
      where: {
        ClerkId,
      },
    });

    if (existingUser) {
      console.log("----------------------------------- it has been used ");
      await db.user.update({
        where: {
          ClerkId: ClerkId!,
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
          ClerkId: ClerkId!,
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

export const deleteUser = async (
  ClerkId: string | undefined
): Promise<void> => {
  try {
    if (ClerkId) {
      await db.user.delete({ where: { ClerkId } });
    } else {
      console.warn("ClerkId is undefined. Cannot delete user.");
    }
  } catch (error) {
    console.error("Error deleting user:", error);
    // Handle the error appropriately, such as logging or throwing
    throw error;
  }
};
