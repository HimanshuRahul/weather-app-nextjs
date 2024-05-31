import { cn } from "@/utils/cn";
import React from "react";
import { FaSearch } from "react-icons/fa";

function Searchbar(props) {
  return (
    <form
      onSubmit={props.onSubmit}
      className={cn(
        "flex relative items-center justify-center h-10",
        props.className
      )}
    >
      <input
        type="text"
        value={props.value}
        onChange={props.onChange}
        placeholder="Search for cities"
        //change width of search here
        className="px-4 py-2 w-[650px] bg-gray-200 border border-gray-300 rounded-l-md focus:outline-none focus:border-blue-500 h-full"
      ></input>
      <button className="px-4 py-[9px] bg-gray-200 text-blue-300 rounded-r-md focus:outline-none hover:bg-gray-400 h-full transition-all">
        <FaSearch />
      </button>
    </form>
  );
}

export default Searchbar;
