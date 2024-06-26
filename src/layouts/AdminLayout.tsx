import Logo from "@/assets/logo.svg?react";
const AdminLayout = () => {
  return (
    <main className="container">
      <header className="header">Header</header>
      <aside className="sidebar">
        <Logo className="logo" />
      </aside>
      <section className="content">
        children 
      </section>
    </main>
  );
};

export default AdminLayout;
