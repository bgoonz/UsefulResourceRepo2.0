import formatDistance from "date-fns/formatDistance";
import { useEffect, useState } from "react";
import { User } from "../src/ui/queries";

export const UserList = () => {
  const [users, setUsers] = useState([] as TUser[]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    User.list().then((users: TUser[]) => {
      setUsers(users);
      setLoading(false);
    });
  }, []);

  if (loading) return <div>Loading...</div>;
  if (!users.length) return <div>No members, please invite some people!</div>;
  return <ProfilePreviews users={users} />;
};

const ProfilePreviews = ({ users }: { users: TUser[] }) => {
  return (
    <section className="text-gray-700">
      <div className="flex flex-wrap -m-2">
        {users.map((user) => (
          <ProfilePreview key={user.email} user={user} />
        ))}
      </div>
    </section>
  );
};

const ProfilePreview = ({ user }: { user: TUser }) => {
  return (
    <div className="p-2 lg:w-1/3 md:w-1/2 w-full">
      <div className="h-full flex items-center border-gray-200 border p-4 rounded-lg">
        <img
          alt="Profile picture"
          className="w-16 h-16 bg-gray-100 object-cover object-center flex-shrink-0 rounded-full mr-4"
          src="https://dummyimage.com/104x94"
        />

        <div className="flex-grow">
          <h2 className="text-gray-900 title-font font-medium">{user.name}</h2>
          <p className="text-gray-500">{user.email}</p>
          <p className="text-gray-500">
            {formatDistance(new Date(user.createdAt), new Date(), {
              addSuffix: true,
            })}
          </p>
        </div>
      </div>
    </div>
  );
};
