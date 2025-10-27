import Slider from "@/components/Slider";
import Search from "../search/Search";
import UserWidget from "../User/UserWidget";
import Widget from "./Widget";

function Dashboard() {
  return (
    <>
      <div className="w-full h-full items-center justify-end flex md:flex-row flex-col-reverse gap-6 md:gap-2">
        <div className="w-10/12 md:w-5/12 flex justify-center items-center md:px-4 ">
          <Search />
        </div>
        <div className="lg:w-7/12 w-full flex justify-center items-center">
          <Slider />
        </div>
      </div>
    </>
  );
}

export default Dashboard;
