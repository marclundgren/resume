export const Header = () => {
  return (
    <header className="mb-12 text-center">
      <h1 className="text-4xl font-bold mb-2">Marc Lundgren</h1>
      <p className="text-xl text-gray-600 mb-4">
        Frontend Software Engineer | Enterprise Applications
        Specialist | React & TypeScript Expert
      </p>
      <div className="text-gray-600">
        <p className="mt-2 flex items-center justify-center space-x-4">
          <a
            href="https://github.com/marclundgren"
            className="text-blue-600 hover:text-blue-800 underline"
          >
            github.com/marclundgren
          </a>
          <span>📍 US Pacific Time Zone</span>
        </p>
      </div>
    </header>
  );
};
