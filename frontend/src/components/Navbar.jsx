export default function Navbar() {
  return (
    <nav
      style={{
        backgroundColor: "#1f2937",
        color: "white",
        padding: "12px 20px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <h3 style={{ margin: 0 }}>
        Remote Work Productivity Tracker
      </h3>

      <ul
        style={{
          listStyle: "none",
          display: "flex",
          gap: "15px",
          margin: 0,
          padding: 0,
        }}
      >
        <li style={{ cursor: "pointer" }}>Home</li>
        <li style={{ cursor: "pointer" }}>Tasks</li>
        <li style={{ cursor: "pointer" }}>Profile</li>
      </ul>
    </nav>
  );
}


