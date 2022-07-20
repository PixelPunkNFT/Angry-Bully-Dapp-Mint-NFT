import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import store from "../redux/store";
import {
    SMART_CONTRACT,
    COST,
    openseaCollectionURL,
  } from "../config";
  import landingImg from "../assets/images/landing.png";
  import { fetchData } from "../redux/data/dataActions";

import disableScroll from 'disable-scroll';
disableScroll.on();
function Mint() {

    const dispatch = useDispatch();
    // const [chain, setChain] = useState("");
    const [blockchain, setBlockchain] = useState();
    const data = useSelector((state) => state.data);
    const [feedback, setFeedback] = useState("");
    const [claimingNft, setClaimingNft] = useState(false);

    useEffect(() => {

      const state = store.getState();

      if (!state.blockchain.account) {
  
        store.subscribe(() => {

          const bc = store.getState();
          setBlockchain(bc.blockchain);

      });
  
      } else {
        
        setBlockchain(state.blockchain);
  
      }

      }, []);

      const getData = () => {
        if (blockchain.account && blockchain.smartContract) {
          dispatch(fetchData(blockchain.account));
        }
      };

      const claimNFTs = (_amount) => {
        if (_amount <= 0) {
          return;
        }
        setFeedback("Minting your Angry Bully Yacht Club...");
        setClaimingNft(true);
        blockchain.smartContract.methods
          .mint(blockchain.account, _amount)
          .send({
            gas: "400000",
            maxPriorityFeePerGas: null,
            maxFeePerGas: null,
            to: SMART_CONTRACT,
            from: blockchain.account,
            value: blockchain.web3.utils.toWei(
              (COST * _amount).toString(),
              "ether"
            ),
          })
          .once("error", (err) => {
            // console.log(err);
            setFeedback("Sorry, something went wrong, please try again later and make sure you got the WL");
            setClaimingNft(false);
          })
          .then((receipt) => {
            setFeedback(
              "WOW, you now own a Angry Bully Yacht Club. Go visit Opensea.io to view it."
            );
            setClaimingNft(false);
            dispatch(fetchData(blockchain.account));
          });
        }
  return (
    <div className="row">
      
        <div className="row mb-50px">
          <div>
          <img className=" home-wallpaper " src={landingImg} alt="Enter the Angry Bully" />
        
              
                <div className="row justify-content-center home-wallpaper-text font-size-30px  m-auto ">
                {!blockchain?.account ? (
                  <div className="text-center">
                   
                  </div>
                ) : (
                  
                  <div
                    className="row  justify-content-center m-auto "
                    style={{ fontSize: "22px" }}
                  >
                    {!data.totalSupply ? (
                      
                      <div className=" spinner-border text-warning " style={{ fontSize: "12px" }}></div>
                      
                      
                    ) : data.totalSupply < 2000 ? (
                      <div className="col ">
                        
                        <div className="  text-center  m-auto  cursor-pointer text-mint "> {data.totalSupply}/2000 </div>
                        
                        {!claimingNft ? (
                          <div
                          
                           className="btn btn-outline-warning   text-center  m-auto  cursor-pointer btn-mint " 
                            
                            style={{
                              border: "1px solid white",
                              borderRadius: "0px",
                              width:"140px",
                            
                              
                              
                            }}
                            
                            disabled={claimingNft ? 1 : 0}
                            onClick={(e) => {
                              e.preventDefault();
                              claimNFTs(1);
                              getData();
                            }}
                          >
                            Mint NFT
                          </div>
                        ) : null}
                        <div className="mt-2">{feedback}</div>
                        <div className="mt-2">
                          
                          
                        </div>
                      </div>
                    ) : (
                      <div className="mt-5">
                        <div>
                          There are no more Angry Bully  Yacht Club  available for minting.
                        </div>
                        <div>
                          You can still find Angry Bully  Yacht Club  on{" "}
                          <a
                            target="_blank"
                            rel="noopener noreferrer"
                            href={openseaCollectionURL}
                          >
                            OPENSEA
                          </a>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
          </div> 
  );
}

export default Mint;
