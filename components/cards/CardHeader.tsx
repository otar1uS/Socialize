import { formatTime } from "@/lib/Utilities/utils";
import { CardDescription, CardHeader, CardTitle } from "../shadcn-ui/card";
import { AvatarComponent } from "./Avatar";

import { BookmarkIcon, UnBookmarkIcon } from "@/lib/Utilities/IconsStore";
import { CardHeaderComponentProps } from "@/TS/ActionTypes";

export const CardHeaderComponent: React.FC<CardHeaderComponentProps> = ({
  isItProfile,
  userInfo,
  postData,
  router,
  switcher,
  postHandler,
  savePostUrl,
}) => {
  return (
    <CardHeader className="flex justify-between ">
      <CardTitle className="flex justify-between items-center">
        <AvatarComponent
          isItProfile={isItProfile}
          userInfo={userInfo}
          postData={postData}
          router={router}
        />
        <div className="flex gap-4 flex-col items-center">
          {switcher ? (
            <BookmarkIcon
              className="max-w-7   cursor-pointer text-cyan"
              onClick={() => {
                postHandler(savePostUrl, "POST");
              }}
            />
          ) : (
            <UnBookmarkIcon
              className="cursor-pointer max-w-7 text-slate-200 hover:text-pink-700"
              onClick={() => {
                postHandler(savePostUrl, "POST");
              }}
            />
          )}
          <p className="text-sm text-slate-200">
            {formatTime(postData.createdAt)}
          </p>
        </div>
      </CardTitle>
      <CardDescription>
        <h2 className="text-[18px] font-[500] text-slate-200 leading-tight  ">
          {postData?.caption}{" "}
        </h2>
      </CardDescription>
    </CardHeader>
  );
};
