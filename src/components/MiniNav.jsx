import React from 'react'

const MiniNav = () => {
    const [isOpen, setIsOpen] = useState(false);
  return (
    <>
        <div className="lg:hidden flex items-center space-x-3">
          
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="focus:outline-none"
            aria-label="Toggle navigation menu"
          >
            {isOpen ? <X className="w-8 h-8" /> : <Menu className="w-8 h-8" />}
          </button>
        </div>
            <div className=''>
                {isOpen && (
                        <div className="lg:hidden flex flex-col mt-3 space-y-3 bg-white text-red-600 rounded-lg shadow-md p-5 absolute right-4 top-16 w-56 z-50">
                          <NavLink
                            to="/"
                            onClick={() => setIsOpen(false)}
                            className={({ isActive }) =>
                              isActive ? "text-red-500 font-bold" : "hover:text-gray-600"
                            }
                          >
                            Home
                          </NavLink>
                          <NavLink
                            to="/donation"
                            onClick={() => setIsOpen(false)}
                            className={({ isActive }) =>
                              isActive ? "text-red-500 font-bold" : "hover:text-gray-600"
                            }
                          >
                            Donation Requests
                          </NavLink>
                          <NavLink
                            to="/blogs"
                            onClick={() => setIsOpen(false)}
                            className={({ isActive }) =>
                              isActive ? "text-red-500 font-bold" : "hover:text-gray-600"
                            }
                          >
                            Blogs
                          </NavLink>
                          
                         
                          
                        </div>
                      )}
            </div>
    </>
  )
}

export default MiniNav