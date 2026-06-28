import React from "react";

type SearchInputProps = React.InputHTMLAttributes<HTMLInputElement>;

function SearchInput(props: SearchInputProps) {
  return <input {...props} />;
}

export default SearchInput;
