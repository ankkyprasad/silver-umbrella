import useRedirectToUserProfile from "../../hooks/useRedirectToUserProfile";

const UserAvatar = (props) => {
  const redirectToUserProfile = useRedirectToUserProfile(props.userId);

  const onClickHandler = () => {
    if (props.enableRedirect) redirectToUserProfile();
  };

  return (
    <img
      src="https://img.freepik.com/free-psd/3d-illustration-person-with-sunglasses_23-2149436188.jpg?size=338&ext=jpg&ga=GA1.1.1700460183.1712793600&semt=ais"
      alt="Avatar"
      style={{ height: props.height, width: props.width }}
      className={`rounded-full user-menu ${
        props.enableRedirect && "cursor-pointer"
      }`}
      onClick={onClickHandler}
    />
  );
};

UserAvatar.defaultProps = {
  height: "30px",
  width: "30px",
  enableRedirect: false,
  userId: 0,
};

export default UserAvatar;
