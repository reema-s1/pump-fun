import { ethers } from "ethers"

function List({ toggleCreate, fee, provider, factory }) {

  return (
    <div className="list">
      <p>create token</p>

      <button onClick={toggleCreate} className="btn--fancy">[ cancel ]</button>
    </div>
  );
}

export default List;