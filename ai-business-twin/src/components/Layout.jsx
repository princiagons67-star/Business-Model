import Sidebar from "./Sidebar";

function Layout({ children }) {
  return (
    <div
      style={{
        display: "flex",
        minHeight: "100vh",
      }}
    >
      <Sidebar />

      <main
        style={{
          flex: 1,
          padding: "30px",
          background: "#f8fafc",
        }}
      >
        {children}
      </main>
    </div>
  );
}

export default Layout;