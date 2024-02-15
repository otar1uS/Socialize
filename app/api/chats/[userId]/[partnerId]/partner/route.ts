import { IChat } from "@/TS/ActionTypes";
import User from "@/lib/models/User";
import { connectToDataBase } from "@/lib/mongoDB/mongoose";
import { Params } from "next/dist/shared/lib/router/utils/route-matcher";

export const GET = async (req: Request, { params }: Params) => {
  try {
    await connectToDataBase();

    const user = await User.findById(params.userId);

    if (!user) {
      return new Response(JSON.stringify({ error: "user can't  be found " }), {
        status: 404,
      });
    }

    const chat = user.chats.find((chat: IChat) =>
      chat?.partner.equals(params.partnerId)
    );

    if (!chat) {
      return new Response(
        JSON.stringify({ error: "chat with this id cant be found " }),
        {
          status: 404,
        }
      );
    }

    return new Response(JSON.stringify(chat), { status: 200 });
  } catch (error) {
    console.error(error);

    return new Response(JSON.stringify({ error: "An error occurred" }), {
      status: 500,
    });
  }
};
