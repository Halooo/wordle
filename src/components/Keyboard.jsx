import "./keyboard.css";
export default function Keyboard(props) {
  // data = [
  //   [
  //       "b",
  //       "green"
  //   ],
  //   [
  //       "a",
  //       "grey"
  //   ],
  //   [
  //       "r",
  //       "green"
  //   ],
  //   [
  //       "e",
  //       "grey"
  //   ],
  //   [
  //       "l",
  //       "grey"
  //   ],
  //   [
  //       "y",
  //       "yellow"
  //   ]
  // ]
  const { data } = props;
  if (data == null) {
    return null;
  }
  const mp = {};
  mp["q"] = 1;
  mp["w"] = 1;
  mp["e"] = 1;
  mp["r"] = 1;
  mp["t"] = 1;
  mp["y"] = 1;
  mp["u"] = 1;
  mp["i"] = 1;
  mp["o"] = 1;
  mp["p"] = 1;
  mp["a"] = 2;
  mp["s"] = 2;
  mp["d"] = 2;
  mp["f"] = 2;
  mp["g"] = 2;
  mp["h"] = 2;
  mp["j"] = 2;
  mp["k"] = 2;
  mp["l"] = 2;
  mp["z"] = 3;
  mp["x"] = 3;
  mp["c"] = 3;
  mp["v"] = 3;
  mp["b"] = 3;
  mp["n"] = 3;
  mp["m"] = 3;

  let keyboard = [];

  for (let k in mp) {
    if (k === "a" || k === "z") {
      keyboard.push(<br key={`br_${k}`} />);
    }
    if (data.hasOwnProperty(k)) {
      keyboard.push(
        <div key={`key_${k}_${mp[k]}`} className={`kb ${data[k]}`}>
          {k}
        </div>
      );
    } else {
      keyboard.push(
        <div key={`key_${k}_${mp[k]}`} className="kb untouched">
          {k}
        </div>
      );
    }
  }

  return <div className="block">{keyboard}</div>;
}
