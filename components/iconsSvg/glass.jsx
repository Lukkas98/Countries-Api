"use client"

const Glass = ({ handleSearch, isLoading }) => {
  return (
    <svg
      onClick={handleSearch}
      fill="#000000"
      width="190px"
      height="190px"
      viewBox="0 0 19.00 19.00"
      xmlns="http://www.w3.org/2000/svg"
      stroke="#000000"
      strokeWidth="0.00019"
      className={`${isLoading ? "cursor-not-allowed pointer-events-none z-20" : "cursor-pointer z-50"} h-7 w-7 hover:scale-110 transition-all duration-300`}
    >
      <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
      <g
        id="SVGRepo_tracerCarrier"
        strokeLinecap="round"
        strokeLinejoin="round"
      ></g>
      <g id="SVGRepo_iconCarrier">
        <path d="M14.147 15.488a1.112 1.112 0 0 1-1.567 0l-3.395-3.395a5.575 5.575 0 1 1 1.568-1.568l3.394 3.395a1.112 1.112 0 0 1 0 1.568zm-6.361-3.903a4.488 4.488 0 1 0-1.681.327 4.443 4.443 0 0 0 1.68-.327z"></path>
      </g>
    </svg>
  );
};

export default Glass;
