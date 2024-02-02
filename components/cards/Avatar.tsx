import { AvatarComponentProps } from "@/TS/ActionTypes";
import { Avatar, AvatarFallback, AvatarImage } from "../shadcn-ui/avatar";

export const AvatarComponent: React.FC<AvatarComponentProps> = ({
  isItProfile,
  userInfo,
  postData,
  router,
}) => {
  return (
    <div className="flex gap-2 items-center mb-2">
      <Avatar>
        <AvatarImage
          src={
            isItProfile
              ? userInfo?.profilePhoto
              : postData?.creator?.profilePhoto
          }
          onClick={() =>
            router.replace(
              `/profile/${
                isItProfile ? userInfo?.clerkId : postData?.creator.clerkId
              }`
            )
          }
          className="cursor-pointer"
        />
        <AvatarFallback>
          {isItProfile
            ? userInfo?.firstName.slice(0, 2).toUpperCase()
            : postData?.creator?.firstName.slice(0, 2).toUpperCase()}
        </AvatarFallback>
      </Avatar>
      <p
        className="text-[14px]  sm:text-[16px] xl:text-[20px] text-slate-200 cursor-pointer"
        onClick={() =>
          router.replace(
            `/profile/${
              isItProfile ? userInfo?.clerkId : postData?.creator.clerkId
            }`
          )
        }
      >
        {isItProfile
          ? userInfo?.firstName + " " + userInfo?.lastName
          : postData?.creator?.firstName + " " + postData?.creator?.lastName}
      </p>
    </div>
  );
};
