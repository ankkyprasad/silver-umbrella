import { useNavigate, useParams } from "react-router-dom";
import UserAvatar from "../../components/users/UserAvatar";
import Blogs from "../../components/blogs/Blogs";
import { useQuery } from "@tanstack/react-query";
import { findUserBySlug } from "../../services/api/users";
import LoadingSvg from "../../components/shared/LoadingSvg";
import ErrorCard from "../../components/shared/ErrorCard";
import { useSelector } from "react-redux";

const Profile = () => {
  const params = useParams();
  const userSlug = params.user_slug;
  const navigate = useNavigate("/");
  const currentUserState = useSelector((state) => state.user.data);

  const getUserQuery = useQuery({
    queryKey: ["user_by_slug"],
    queryFn: () => findUserBySlug({ slug: userSlug }),
    retry: false,
  });

  if (getUserQuery.isLoading) {
    return (
      <div className="flex flex-1 items-center justify-center">
        <LoadingSvg />
      </div>
    );
  }

  let profileUserData = {};
  let errorData = {};
  let owner = false;
  if (getUserQuery.isError === false) {
    profileUserData = getUserQuery.data.data;
    owner = profileUserData.id === currentUserState.id;
  } else {
    if (getUserQuery.error.status === 404) {
      navigate("/not-found");
    } else if (getUserQuery.error.status >= 500) {
      errorData = {
        header: "Internal Server Error",
        message: "Please Hang tight, it will be fixed soon!",
      };
    }
  }

  return (
    <div className="flex flex-1">
      {getUserQuery.isError ? (
        <div className="items-start flex justify-center flex-1 mt-4">
          <ErrorCard error={errorData} />
        </div>
      ) : (
        <>
          <div className="w-full">
            <div className="w-2/3 mx-auto py-8">
              <h1 className="text-3xl font-fold">
                {owner ? "Your Stories" : "Stories"}
              </h1>
              <ul className="menu menu-horizontal bg-base-200 w-full my-6 font-medium text-gray-600 px-6 flex gap-6 py-2.5">
                <li className="link link-hover">Published</li>
                {owner && <li className="link link-hover">Saved</li>}
              </ul>
              <Blogs userId={profileUserData.id} />
            </div>
          </div>
          <div className="border-l w-2/3 pt-16 px-16">
            <div>
              <div className="inline-flex gap-8">
                <div className="inline-flex flex-col items-center gap-3">
                  <UserAvatar width="100px" height="100px" />
                  <p className="text-gray-700 font-medium">
                    {profileUserData.name}
                  </p>
                </div>

                <div className="flex flex-col justify-start gap-2.5">
                  <p className="text-gray-500 hover:text-gray-600 cursor-pointer">
                    {profileUserData.followers} Followers
                  </p>
                  <p className=" text-gray-500 hover:text-gray-600 cursor-pointer">
                    {profileUserData.followings} Followings
                  </p>
                </div>
              </div>
            </div>

            {owner === false && (
              <button className="btn btn-primary rounded-full mt-6">
                Follow
              </button>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default Profile;
