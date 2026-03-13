import { FaUserCircle } from "react-icons/fa";

export default function Avatar({
  src,
  name = "",
  size = 40,
  }) {
  const initials = name
    .split(" ")
    .map(n => n[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
return (
    <div
      className="flex items-center justify-center rounded-full overflow-hidden bg-gray-200 text-gray-700 font-bold"
      style={{ width: size, height: size }}>
      {src ? (
        <img
          src={src}
          alt={name}
          className="w-full h-full object-cover"
        />
      ) : name ? (
        <span>{initials}</span>
      ) : (
        <FaUserCircle size={size} />
      )}
    </div>
  );
}
