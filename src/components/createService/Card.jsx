import Avatar from "../common/Avatar";
import { FaStar } from "react-icons/fa";

export default function ServiceCard({ craftsman, }) {
  return (
    <div className="bg-gray-50 rounded-xl p-6 shadow-md flex items-center gap-4 w-120">

      <div className="relative">
        <div className="rounded-full border-4 border-orange-500 p-1">
          <Avatar
            src={craftsman.image}
            size={90}
          />
        </div>

        <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 
                        bg-gray-100 px-3 py-1 rounded-full 
                        flex items-center gap-1 text-sm shadow">
          <FaStar className="text-yellow-500 text-xs" />
          <span className="font-medium">{craftsman.rating}</span>
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <span className="text-sm bg-purple-100 text-purple-600 px-3 py-1 rounded-lg w-fit">
          {craftsman.cityName}
        </span>

        <h3 className="text-xl font-bold">{craftsman.fullName}</h3>

        <p className="text-sm text-gray-400">
          {craftsman.bio}
        </p>
      </div>
    </div>
  );
}