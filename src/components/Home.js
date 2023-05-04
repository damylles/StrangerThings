import React from 'react';

const Home = () => {
  return (
    <>
      <main>
        <div className="herobox1">
          <h2>Welcome</h2>
          <p>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Laudantium
            molestiae quaerat debitis magnam non libero saepe veniam maxime,
            voluptate unde assumenda architecto.
          </p>
          <p>
            Fast, convenient bike servicing with up-front pricing. All without
            the hassle of taking your bike into a shop.
          </p>
        </div>
        <div className="herobox2"></div>
      </main>

      <div className="cards">
        <div className="card1">
          <a href="#">
            <h2>Sell Online</h2>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Deleniti
              nemo cumque odit. Nostrum, et ducimus?
            </p>
          </a>
        </div>
        <div className="card2">
          <a href="#">
            <h2>Buy Online</h2>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Deleniti
              nemo cumque odit. Nostrum, et ducimus?
            </p>
          </a>
        </div>
        <div className="card3">
          <a href="#">
            <h2>Sell and Buy</h2>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Deleniti
              nemo cumque odit. Nostrum, et ducimus?
            </p>
          </a>
        </div>
      </div>
    </>
  );
};

export default Home;
