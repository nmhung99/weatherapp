import './App.css';
import Wethear from './Wethear';

function App() {
  return (
    <div className="weatherApp">
      <Wethear/>
      {/* <ul>
        <li id="Quảng Ninh" onClick={(e) => getWethear(e.target.innerText)}>Quảng Ninh</li>
        <li id="Hà Nội" onClick={(e) => getWethear(e.target.innerText)}>Hà Nội</li>
        <li id="Hồ Chí Minh" onClick={(e) => getWethear(e.target.innerText)}>Hồ Chí Minh</li>
        <li id="Đà Nẵng" onClick={(e) => getWethear(e.target.innerText)}>Đà Nẵng</li>
        <li id="Đà Nẵng" onClick={(e) => getWethear(e.target.innerText)}>Bình Thuận</li>
      </ul> */}
      {/* <input
        value={search}
        onChange={(e) => { setSearch(e.target.value) }}
      />
      <button onClick={getWethear}>Get info</button>
      <h1>{data.temperature}</h1>
      <h1>{data.city}</h1>
      <h1>{data.humidity}</h1>
      <h1>{data.description}</h1>
      <h1>{data.error}</h1> */}
    </div>
  );
}

export default App;
