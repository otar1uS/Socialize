import { db } from "@/db";

const updateOrCreateUser = async (email, username, image) => {
  const existingUser = await db.user.findUnique({
    where: {
      email: email[0].email_address,
    },
  });

  if (existingUser) {
    await db.user.update({
      where: {
        email: email[0].email_address,
      },
      data: {
        email: email[0].email_address,

        image: image,
      },
    });
  } else {
    await db.user.create({
      data: {
        username: username,
        email: email[0].email_address,

        image: image,
      },
    });
  }
};

export const deleteUser = async (email) => {
  await db.user.delete({ where: { email: email[0].email_address } });
};
