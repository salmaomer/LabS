function Profilecard({ avatar ,name, age, job }) {
  return (
    <div >
      <h2>Profile Card</h2>
      <img src={avatar} alt={name} style={{ width: "100px", height: "100px" }} />
      <p>Name: {name}</p>
      <p>Age: {age}</p>
      <p>Job: {job}</p>
    </div>
  );
}

export default Profilecard;