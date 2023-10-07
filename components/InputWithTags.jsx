import { MdClear } from "react-icons/md";
import { doctorTypes } from "../assets/doctorTypes";

const InputWithTags = ({ tags, setTags }) => {
  const onInputChange = (e) => {
    if (
      e.nativeEvent.inputType == "insertReplacementText" ||
      e.nativeEvent.inputType === null
    ) {
      setTags((prev) => [...new Set([...prev, e.target.value])]);
      setTimeout(() => (e.target.value = ""), 100);
    }
  };

  const removeTag = (t) => {
    setTags((prev) => prev.filter((p) => p !== t));
  };

  return (
    <div>
      <label className="block text-gray-300 mb-2" htmlFor="tags">
        Select the Aplicable Types
      </label>
      {tags.length ? (
        <div className="flex items-center justify-start gap-4 flex-wrap my-4">
          {tags.map((t, i) => (
            <div
              key={i}
              className="bg-orange-600 rounded-full py-1 px-2 cursor-default flex items-center gap-2
              "
            >
              <span className="text-sm">{t}</span>
              <MdClear
                className="cursor-pointer"
                onClick={() => removeTag(t)}
              />
            </div>
          ))}
        </div>
      ) : (
        ""
      )}
      <input
        className="bg-zinc-900 border-none outline-0 outline outline-gray-400 pl-3 pr-8 py-2 rounded w-full placeholder-zinc-700 tracking-wider focus:outline-2"
        placeholder="Eg. Dentist"
        id="tags"
        list="types-list"
        onChange={onInputChange}
      />
      <datalist id="types-list">
        {doctorTypes.map((d) => (
          <option key={d} value={d}>
            {d}
          </option>
        ))}
      </datalist>
    </div>
  );
};

export default InputWithTags;
