export default function Main() {
  return (<>
    <header
      className = "fixed inset-x-0 top-0 z-50 left-0 bg-white text-gray-700 body-font border-b border-gray-200">
      <div className = "container mx-auto flex flex-wrap p-3 flex-col md:flex-row items-center">
        <div
          className = "flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0"
        >
          <img src = {"/logo512.png"} className = "w-8 h-8 -mr-1" />
          <span className = "ml-3 text-xl text-indigo-500">로고</span>
        </div>
        <nav className = "md:ml-auto flex flex-wrap items-center text-base justify-center">

          <div
            className = "mr-1 text-white text-xs hover:text-gray-900 bg-indigo-500 shadow-lg shadow-indigo-50000/50 box-content w-15 p-2 border-4 rounded-lg font-sans">
            로그인
          </div>
        </nav>
      </div>
    </header>

    <div className = "h-96 p-2">
      <div
        className = "bg-fixed bg-top rounded-3xl bg-no-repeat bg-cover size-full"
        style = {{
          backgroundImage: `url('/food.jpg')`,

        }}
      >
      </div>
    </div>
  </>)
}