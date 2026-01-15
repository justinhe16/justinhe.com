export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-6xl font-medium mb-4 text-black">404</h1>
        <p className="text-xl text-black mb-8">Page not found</p>
        <a
          href="/"
          className="text-black hover:opacity-60 transition-opacity underline"
        >
          Return home
        </a>
      </div>
    </div>
  );
}
