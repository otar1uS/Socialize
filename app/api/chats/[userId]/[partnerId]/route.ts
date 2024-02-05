import User from "@/lib/models/User";
import { connectToDataBase } from "@/lib/mongoDB/mongoose";
import { Params } from "next/dist/shared/lib/router/utils/route-matcher";

export const POST = async (req: Request, { params }: Params) => {
  try {
    await connectToDataBase();

    const user = await User.findById(params.userId);
    const partner = await User.findById(params.partnerId);

    if (!partner || !user) {
      return new Response(
        JSON.stringify({ error: "partner and user cant be found" }),
        {
          status: 404,
        }
      );
    }

    const existingChat = user.chats.find((chat) =>
      chat.partner.equals(params.partnerId)
    );
    if (existingChat) {
      return new Response(JSON.stringify(user), { status: 200 });
    }

    user.chats.push({
      partner: params.partnerId,
      messages: [],
    });

    await user.save();

    return new Response(JSON.stringify(user), { status: 200 });
  } catch (error) {
    console.error(error);

    return new Response(JSON.stringify({ error: "An error occurred" }), {
      status: 500,
    });
  }
};
