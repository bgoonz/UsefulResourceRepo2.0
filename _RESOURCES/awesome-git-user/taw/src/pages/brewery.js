import React from "react";
import Layout from "../components/layout";
import Footer from "../components/footer";
import "../styles/brewery.scss";

const Brewery = () => {
  return (
    <Layout>
      <div className="brewery">
        <div className="brewery-main">
          <h1 className="brewery-main-title">OUR BREWERY</h1>
          <div className="brewery-main-body">
            <div className="brewery-main-body-description">
              <h2 className="brewery-main-body-description-heading">
                Craft Revolution, Not Just Evolution
              </h2>
              <h3 className="brewery-main-body-description-heading">
                「クラフトの進化だけではなく、革命を 」
              </h3>
              <hr />
              <p>
                クラフトビールの進化は、新しいものを追い求めることに囚われず
              </p>
              <p>つねに基本に立ち返ることから始まる。</p>
              <p>
                <strong>"Back to the Basics"</strong>
              </p>
              <p>原点を見失わず クラフトビールを創造し続けていく中に</p>
              <p>新しい発見と可能性は開かれていく</p>
              <p>そうした挑戦をサポートすることで</p>
              <p>真のクラフトマンシップの変革を起こし</p>
              <p>人と人をつなぐブリューイングの架け橋になる</p>
              <p>
                それがTOKYO ALEWORKSが目指す「コミューナルブリューイング」です。
              </p>
            </div>
            <br />
            <br />
            <div className="brewery-main-body-description">
              <h3 className="brewery-main-body-description-heading">
                東京の板橋から、ブリューイングで世界の懸け橋に
              </h3>
              <h2 className="brewery-main-body-description-heading">
                From Itabashi To The World
              </h2>
              <hr />
              <p>かつて江戸の四宿の一つであった板橋。</p>
              <p>
                私達「TOKYO ALEWORKS」は、そんな東京の玄関口ともいえる街で、
              </p>
              <p>真のクラフト・ビールの醍醐味を伝え</p>
              <p>板橋から世界へつなげるブリューイングの懸け橋となる</p>
              <p>コミュニティーを築いていきます。</p>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </Layout>
  );
};

export default Brewery;
