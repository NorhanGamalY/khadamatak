export default async function getorder_craftman() {
  try {
    const token = localStorage.getItem("token");

    const res = await fetch("https://herafie.runasp.net/api/Orders/craftsman", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!res.ok) throw new Error("Failed to fetch orders");

    const data = await res.json();
    return data;
  } catch (error) {
    console.error(error);
    return [];
  }
}
