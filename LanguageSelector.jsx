import React from "react";
import Select from "react-select";

const LanguageSelector = ({ languages, selectedLanguage, onChange }) => {
  const options = languages.map((lang) => ({
    value: lang.code,
    label: lang.name,
  }));

  return (
    <Select
      options={options}
      value={options.find((opt) => opt.value === selectedLanguage)}
      onChange={(selected) => onChange(selected.value)}
    />
  );
};

export default LanguageSelector;
