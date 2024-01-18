import { Messages } from "../ui2/Messages";

const RightSideBar = () => {
  return (
    <div className=" h-screen  flex sticky right-0 top-0 w-[400px] xl:w-[450px] gap-12  bg-dark  ">
      <div className="ml-5 flex flex-col gap-4 pt-10">
        <h1 className="text-xl font-bold">Following</h1>
        <div className="">mapping users</div>
        <h1 className="text-xl font-bold">Suggest to follow</h1>
        <div>mapping users</div>
        <div className="relative h-full w-full hidden xl:block">
          <Messages />
        </div>
      </div>
    </div>
  );
};

export default RightSideBar;
