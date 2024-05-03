import Login_button from "./Login_button";

export default function Header() {
  return (
    <header
      className = "fixed inset-x-0 top-0 z-50 left-0 bg-white text-gray-700 body-font ">
      <div className = "container mx-auto flex flex-wrap p-3 flex-col md:flex-row items-center">
        <div
          className = "flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0"
        >
          <img src = {"/logo512.png"} className = "w-8 h-8 -mr-1" />
          <span className = "ml-3 text-xl text-indigo-500">로고</span>
        </div>
        <nav className = "md:ml-auto flex flex-wrap items-center text-base justify-center">
          <Login_button />
        </nav>
      </div>
    </header>
  )
}