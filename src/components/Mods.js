import React from "react";
import { Link } from "react-router-dom";

function Mods(props) {
  const mod = props.name;
  return (
    <div className="container rounded bg-white shadow-2xl divide-y-2 divide-RocketSteel">
      <h1 className="text-center font-bold">Mods</h1>
      <ul className="ml-4 mr-4 mb-1 text-center">
        {props.list ? (
          props.list.map((item) => (
            <Link key={item.id} to={`/profile/${item.id}`}>
              <li
                className="state-rendered-item hover:underline"
                id={item.id}
                onClick={() => {
                  //props.selectItem(item.id);
                }}
              >
                {item.name}
              </li>
            </Link>
          ))
        ) : (
          <li>Loading...</li>
        )}
      </ul>
    </div>
  );
}

export default Mods;
