export default function Main(){
    return (
        <>
          <header
            className = "fixed inset-x-0 top-0 z-50 left-0 bg-white text-gray-700 body-font border-b border-gray-200">
            <div className = "container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
              <div
                className = "flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0"
              >
                {/*<img alt = "logo" src = {"../../public/logo512.png"} className = "w-8 h-8 -mr-1" />*/}
                <span className = "ml-3 text-xl text-indigo-500">동글동글 코인 지표 인덱스</span>
              </div>
              <nav className = "md:ml-auto flex flex-wrap items-center text-base justify-center">
                <div className = "mr-5 hover:text-gray-900">
                  Speedometer
                </div>
                <div className = "mr-5 hover:text-gray-900">
                  Graph
                </div>
                <div className = "mr-5 hover:text-gray-900">
                  Chart
                </div>
              </nav>
            </div>
          </header>
        </>
    )
}