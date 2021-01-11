import React, {useState} from "react";

const Search =(props)=> {
  const {searchValue, setSearchValue} = useState("");

  const handleChange =(e)=>{
    setSearchValue(e.target.value);
  }

  const resetInputField =()=> {
    setSearchValue("")
  }

  const callSearchFunction =(e)=> {
    props.search(searchValue);
    resetInputField();
  }
  return(
    <form className="search">
      <input
        value={searchValue}
        onChange={handleChange}
        type="text" />
      <input onclick={callSearchFunction} type="submit" value="Search" />
    </form>
  )
}

export default Search;
