interface EmailAddress {
  email_address: string;
}

import User from "../models/userModel";
import { connectToDataBase } from "../mongoDB/mongoose";

export const createOrUpdateUser = async (
  id: string,
  first_name: string,
  last_name: string,
  image_url: string,
  email_addresses: EmailAddress[],
  username: string | null
): Promise<typeof User | undefined> => {
  try {
    await connectToDataBase();

    const user = await User.findOneAndUpdate(
      { clerkId: id },
      {
        $set: {
          firstName: first_name,
          lastName: last_name,
          profilePhoto: image_url,
          email: email_addresses[0].email_address,
          username: username,
        },
      },
      { upsert: true, new: true }
    );

    if (user) {
      await user.save();
    }

    return user;
  } catch (error) {
    console.error(error);
    return undefined;
  }
};

export const deleteUser = async (id: string): Promise<void | undefined> => {
  try {
    await connectToDataBase();
    await User.findOneAndDelete({ clerkId: id });
  } catch (error) {
    console.error(error);
  }
};
