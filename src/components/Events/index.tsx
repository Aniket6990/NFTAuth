import React, { useEffect, useState } from "react";
import { ethers } from "ethers";
import { makeStyles } from "@mui/styles";
import Button from "../Button";
import { useWeb3AuthContext } from "../../contexts/SocialLoginContext";
import { useSmartAccountContext } from "../../contexts/SmartAccountContext";
import {
  configInfo as config,
  showErrorMessage,
  showInfoMessage,
  showSuccessMessage,
} from "../../utils";
import axios from "axios";

const Events: React.FC = () => {
  const classes = useStyles();
  const { web3Provider } = useWeb3AuthContext();
  const { selectedAccount, wallet } = useSmartAccountContext();
  const [scwAddress, setScwAddress] = useState(
    selectedAccount?.smartAccountAddress || ""
  );

  const makeTx = async () => {
    if (!selectedAccount?.smartAccountAddress || !web3Provider || !wallet) {
      showErrorMessage("Please connect your wallet");
      return;
    }
    showInfoMessage("Initiating Faucet...");
    try {
      let smartAccount = wallet;
      const faucetContract = new ethers.Contract(
        config.faucet.address,
        config.faucet.abi,
        web3Provider
      );
      const faucetTxData = await faucetContract.populateTransaction.drip(
        scwAddress
      );
      const tx1 = {
        to: config.faucet.address,
        data: faucetTxData.data,
      };

      const txResponse = await smartAccount.sendTransaction({
        transaction: tx1,
      });
      console.log("userOpHash", txResponse);
      const txHash = await txResponse.wait();
      console.log("txHash", txHash);
      showSuccessMessage(
        `Tokens sent ${txHash.transactionHash}`,
        txHash.transactionHash
      );
    } catch (error: any) {
      console.error(error);
      showErrorMessage(error.message);
    }
  };

  
  return (
    // <div style={{ marginTop: "16vh" }}>
    //   <HuddleIframe config={iFrameConfig} />
    // </div>
    <>
      <div></div>
    </>
  );
};

const useStyles = makeStyles(() => ({
  main: {
    padding: "10px 20px",
    width: "100%",
    height: "100%",
    gap: 20,
    color: "#e6e6e6",
    display: "flex",
    flexDirection: "column",
    alignItems: "start",
    justifyContent: "start",
    marginTop: "12vh",
  },
  subTitle: {
    color: "#000000",
    fontSize: 36,
    margin: 0,
  },
  h3Title: {
    color: "#000000",
    margin: 0,
  },
  eventHeader: {
    width: "100%",
    paddingLeft: "15%",
    height: "15vh",
    backgroundColor: "#645CAA",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "start",
    borderRadius: "15px",
    color: "#FFFFFF",
    fontSize: "24px",
    gap: "20%",
  },
  container: {
    // backgroundColor: "rgb(29, 31, 33)",
  },
  containerBtn: {
    display: "flex",
    gap: 15,
    // justifyContent: "space-between",
  },
  tab: {
    padding: "5px 15px",
    backgroundColor: "#FCF8E8",
    marginBottom: 10,
  },
  listHover: {
    "&:hover": {
      color: "#FF9551",
    },
  },
  input: {
    maxWidth: 350,
    width: "100%",
    padding: "12px 12px",
    color: "#e6e6e6",
    outline: "1px solid #5B3320",
    backgroundColor: "#151520",
    borderRadius: 6,
    border: "none",
  },
}));

export default Events;
