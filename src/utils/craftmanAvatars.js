import defaultAvatar from "/unknown.jpg";
import craftsman1 from "../assets/avatars/Ellipse 87.png";
import craftsman2 from "../assets/avatars/Ellipse 88.png";
import craftsman3 from "../assets/avatars/Ellipse 89.png";

const craftsmanAvatarMap = {
  1: craftsman1,
  2: craftsman2,
  3: craftsman3,
};

const avatarPool = [craftsman1, craftsman2, craftsman3];

export const getCraftsmanAvatar = (order) => {
  if (!order) return defaultAvatar;

  if (order.craftsmanImage) {
    return order.craftsmanImage;
  }

  if (order.craftsmanId && craftsmanAvatarMap[order.craftsmanId]) {
    return craftsmanAvatarMap[order.craftsmanId];
  }

  if (typeof order.id === "number" && avatarPool.length > 0) {
    return avatarPool[order.id % avatarPool.length];
  }

  return defaultAvatar;
};

export { defaultAvatar };
