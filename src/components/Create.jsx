import { useContext, useState } from "react";
import { todocontext } from "../Context/Context";

const Create = () => {
    const [tasks, settasks] = useContext(todocontext);

    const [title, settitle] = useState("");

    const TaskSubmitHandler = (e) => {
        e.preventDefault();
        settasks([...tasks, { title: title, completed: false }]);
        settitle("");
    };

    return (
        <form
            onSubmit={TaskSubmitHandler}
            className="lg:w-[35%] ml-5 lg:ml-0 w-full flex lg:justify-between gap-3 items-center lg:gap-0 px-5 my-[2%]"
        >
            <input
                onChange={(e) => settitle(e.target.value)}
                value={title}
                placeholder="write your next task..."
                className="px-5 py-2 text-yellow-100 outline-none w-[80%] rounded-xl bg-zinc-700 "
                type="text"
            />
            <button className="outline-none text-xl lg:text-4xl font-extrabold flex justify-center items-center w-[10vw] h-[10vw] lg:w-[3vmax] lg:h-[3vmax] rounded-full bg-orange-600">
                <i className="ri-add-fill"></i>
            </button>
        </form>
    );
};

export default Create;
