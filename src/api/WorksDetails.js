async function WorksDetails() {
  const token = localStorage.getItem("token");

  const res = await fetch("https://herafie.runasp.net/api/Craftsmen", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await res.json();
  return data;
}

export default WorksDetails;
