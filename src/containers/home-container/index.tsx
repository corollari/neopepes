import React from 'react';
import { Helmet } from 'react-helmet';
import Header from '../../components/header';
import Footer from '../../components/footer';
import { Button } from 'accessible-ui';
import { paths } from '../../routes';
import A from '../../assets/images/pepe.png';
import B from '../../assets/images/asset_b.png';
import C from '../../assets/images/asset_c.png';
import D from '../../assets/images/asset_d.png';
import E from '../../assets/images/asset_e.png';

const Home = (props) => {
  const { history } = props;
  const documentTitle = `NeoPepes - Home`;
  return (
    <div>
      <Header {...props} />
      <Helmet>
        <title>{documentTitle}</title>
      </Helmet>

      <section
        style={{
          paddingTop: 180,
          paddingBottom: 160,
          backgroundColor: '#162255',
          color: 'white'
        }}
      >
        <div className="container d-flex">
          <div className="row">
            <div className="col-xs-12 col-sm-12 col-md-12 col-lg-4">
              <div className="my-5">
                <h1 style={{ marginTop: 120 }}>
                  <b>LEARN TO CODE SMART CONTRACTS ON NEO</b>
                </h1>

                <p className="py-3">A step by step interactive tutorial centered around writing, deploying and interacting with Smart Contracts on the NEO blockchain</p>
                <Button
                  className="px-5"
                  level="secondary"
                  theme="dark"
                  onClick={() => history.push(paths.chapterList)}
                  text="Get Started"
                />
              </div>
            </div>
            <div className="col-xs-12 col-sm-12 col-md-12 col-lg-8">
              <div>
                <img
                  className="img-fluid mx-auto"
                  src={A}
                  alt="asset a"
                  style={{ marginTop: 50 }}
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
