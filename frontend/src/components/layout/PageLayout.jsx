export default function PageLayout({ children }) {
  return (
    <div className="flex h-screen bg-gray-100">
      {children}
    </div>
  );
}