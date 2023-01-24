import { useSelector } from "react-redux";
import NotificationList from "./NotificationList";

const SecondNotification = () => {
  const users = useSelector((state) => state.user.users);

  return (
    <div className="sidebar-wrapper1">
      <h5 className="my-3 mb-4 ml-3">{users[0].name} notifications</h5>

      {users &&
        users
          .slice(0, 20)
          .reverse()
          .map(({ _id, image, name, surname, title }) => (
            <NotificationList
              _id={_id}
              image={image}
              name={name}
              surname={surname}
              title={title}
            />
          ))}
    </div>
  );
};

export default SecondNotification;
