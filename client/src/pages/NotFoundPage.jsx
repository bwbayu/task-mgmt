import { Link } from "react-router-dom";

export const NotFoundPage = () => {
  return (
    <div className="min-h-screen min-w-screen bg-gray-900 text-white flex items-center justify-center">
      <main className="text-center px-4">
        <h1 className="text-6xl font-bold text-red-500 mb-4">404</h1>
        <p className="text-xl mb-6 text-gray-300">
          The page you are looking for was not found.
        </p>
        <Link
          to="/"
          className="inline-block bg-gray-800 px-4 py-2 rounded hover:bg-gray-700 focus:outline-none focus:ring-0 active:outline-none"
        >
          <p className="text-white">Back to Home</p>
        </Link>
      </main>
    </div>
  );
};
