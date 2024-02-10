import { ChangeEvent, MouseEvent, useEffect, useState } from 'react';
import './App.css';





function App() {
  const colors: string[] = ["slate", "gray", "zinc", "neutral", "stone", "red", "orange", "yellow", "lime", "green", "emerald", "teal", "cyan", "sky", "blue", "indigo", "violet", "purple", "fuchsia", "pink", "rose"];
  const [gridNum, setGridNum] = useState<number>(16);
  const [loading, setLoading] = useState<boolean>(false);
  const [selColor, setSelColor] = useState<string>(colors[0]);
  const [random, setRandom] = useState<boolean>(false);
  // const [colors, setColors] = useState(colorsGen);
  useEffect(() => {
  }, [loading, gridNum]);

  function genCube(grid: number) {
    var cubes: string[] = [];
    for (let i = 0; i < grid; i++) {
      cubes.push(i.toString());
    }

    // return cubes;
    return <>
      {cubes.map((cube) => <div id={cube.toString()} key={cube} className={`cell`} onMouseEnter={handleOver}></div>)}
    </>
  }


  function handleClick(event: ChangeEvent) {
    const { valueAsNumber } = event.target as HTMLInputElement
    // update Value
    setGridNum(valueAsNumber)
    // get the globle grid value from CSS 
    // const b = getComputedStyle(document.documentElement).getPropertyValue("--gridNum");
    // set the value to the latest value
    document.documentElement.style.setProperty('--gridNum', valueAsNumber.toString());
    // Get All the cell element and update the white the backgroud color to white for reset 
    var cells = Array.from(document.getElementsByClassName("cell") as HTMLCollectionOf<HTMLElement>);
    // cells.map((cell) => { cell.style.backgroundColor = "white" });
    cells.map((cell) => { updateBg("reset", cell.classList) });
    // console.log("AAAA", b, cells[0])
  }

  function handleOver(event: MouseEvent) {
    setLoading(true);
    // console.log("EVENT: ", event, colors)
    const { classList } = event.target as HTMLDivElement
    // Get a random number for random color 
    // style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];

    // var bg = classList.value.match(/bg-\w+-\d+/g);

    // if (bg) {
    //   console.log("BG: ", bg[0]);
    //   classList.remove(bg[0])
    // }
    // const a = "bg-" + colors[Math.floor(Math.random() * colors.length)] + "-" + ((Math.floor(Math.random() * 9)) + 1) * 100;
    // // const a: number = Math.floor(Math.random() * colors.length);
    // console.log("DAD", a, colors.length)
    // classList.add(a);
    // classList.add("bg-green-300")

    // setLoading(false);
    updateBg(selColor, classList);
  }

  function handleSelect(event: MouseEvent) {
    const { id } = event.target as HTMLTableCellElement
    // console.log("Event", id);
    setSelColor(id);
  }

  function updateBg(color: string, classList: DOMTokenList): void {
    var newColor: string = "";

    var bg = classList.value.match(/bg-\w+(-\d+)*/g);

    if (bg) {
      // console.log("BG: ", bg[0]);
      classList.remove(bg[0])
    }

    if (color === "reset") {

      newColor = "bg-white"
    }
    else {
      newColor = random ? "bg-" + colors[Math.floor(Math.random() * colors.length)] + "-" + ((Math.floor(Math.random() * 9)) + 1) * 100 : `bg-${color}-500`;
    }



    classList.add(newColor);
    // console.log("Change", classList);
  }

  return (
    <>
      <div className='bg'>
        <h1 className=''>Etch A Skatch</h1>
        <input className="my-3 border-2" type='number' value={gridNum} onChange={handleClick} max="100" min="8"></input>
        <table className='my-2'>
          <tr >
            {colors.map((color) => <td id={color} className={`bg-${color}-500 border-2 px-1.5 ${selColor === color ? "border-black" : `bg-${color}-100`}`} onClick={(e: MouseEvent) => { handleSelect(e) }}>{color}</td>)}
          </tr>
        </table>
        <div>
          <input type="checkbox" className='my-2' checked={random} onChange={() => setRandom(!random)} />
          <label > Random</label>
        </div>


        <div className={`containers`}>
          {/* ${gridDsiplay(grid)} */}
          {genCube(gridNum ** 2)}
        </div>
      </div>
    </>
  )
}

export default App
