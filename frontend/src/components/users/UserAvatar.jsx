const UserAvatar = (props) => {
  return (
    <img
      src="https://img.freepik.com/free-psd/3d-illustration-person-with-sunglasses_23-2149436188.jpg?size=338&ext=jpg&ga=GA1.1.1700460183.1712793600&semt=ais"
      alt="Avatar"
      style={{ height: props.height, width: props.width }}
      className="rounded-full cursor-pointer user-menu"
    />
  );
};

UserAvatar.defaultProps = {
  height: "30px",
  width: "30px",
};

export default UserAvatar;
