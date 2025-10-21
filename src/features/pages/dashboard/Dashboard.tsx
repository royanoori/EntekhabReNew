import UserWidget from "../User/UserWidget";
import Widget from "./Widget";

function Dashboard() {
  return (
    <>
      <div className="w-full h-full flex gap-2 lg:gap-6">
        <div className="lg:w-2/12 w-6/12">
          <UserWidget />
        </div>
        <div className="flex-1">
          <div className="flex gap-4 flex-col lg:flex-row w-full mb-3">
            <Widget title="ثبت کالای فرسوده" image="/image/renew.png" />
            <Widget title="ثبت مشتری جدید" image="/image/user.svg" />
          </div>
        </div>
      </div>
    </>
  );
}

export default Dashboard;
