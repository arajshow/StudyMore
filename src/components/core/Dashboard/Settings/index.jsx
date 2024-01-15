import ChangeProfilePicture from "./ChangeProfilePicture";
import EditProfile from "./EditProfile";
import DeleteAccount from "./DeleteAccount";

export default function Settings() {
  return (
    <div className="flex flex-col md:mx-[32px] mx-[12px] gap-14">
      <h1 className="text-3xl font-medium text-richblack-5 ml-16 md:ml-0">
        Edit Profile
      </h1>

      {/* change profile picture */}
      <ChangeProfilePicture />

      {/* edit profile */}
      <EditProfile />

      {/* delete account */}
      <DeleteAccount />
    </div>
  );
}
