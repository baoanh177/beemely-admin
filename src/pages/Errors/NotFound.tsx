import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();
  return (
    <section className="dark:bg-gray-900 bg-white">
      <div className="container mx-auto flex min-h-screen items-center px-6 py-12">
        <div>
          <p className="text-sm font-medium text-blue-500 dark:text-blue-400">404 error</p>
          <h1 className="text-gray-800 mt-3 text-2xl font-semibold dark:text-white md:text-3xl">We can’t find that page</h1>
          <p className="mt-4 text-gray-500 dark:text-gray-400">Sorry, the page you are looking for doesn't exist or has been moved.</p>

          <div className="mt-6 flex items-center gap-x-3">
            <button
              onClick={() => {
                navigate("/");
              }}
              className="w-1/2 shrink-0 rounded-lg bg-blue-500 px-5 py-2 text-sm tracking-wide text-white transition-colors duration-200 hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-500 sm:w-auto"
            >
              Take me home
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NotFound;
