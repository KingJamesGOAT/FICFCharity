


export const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-background py-8">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <p className="text-gray-400 text-sm">
          &copy; {year} Foundation for Indian Children's Future (FICF)
        </p>
      </div>
    </footer>
  );
};
