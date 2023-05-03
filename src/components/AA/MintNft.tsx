import React, { useCallback, useEffect, useState } from "react";
import { ethers } from "ethers";
import { makeStyles } from "@mui/styles";
import Button from "../Button";
import { useWeb3AuthContext } from "../../contexts/SocialLoginContext";
import { useSmartAccountContext } from "../../contexts/SmartAccountContext";
import {
  configInfo as config,
  showErrorMessage,
  showSuccessMessage,
} from "../../utils";
import * as fs from "fs";
import Papa from "papaparse";
import { abi } from "../../utils/configs/NFTcontract";

interface txnInterface {
  to: string;
  data: string | undefined;
  gasLimit: number;
}

const MintNft: React.FC = () => {
  const classes = useStyles();
  const { web3Provider } = useWeb3AuthContext();
  const { state: walletState, wallet } = useSmartAccountContext();
  const [nftCount, setNftCount] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);

  const getNftCount = useCallback(async () => {
    if (!walletState?.address || !web3Provider) return;
    const nftContract = new ethers.Contract(
      config.nft.address,
      config.nft.abi,
      web3Provider
    );
    const count = await nftContract.balanceOf(walletState?.address);
    console.log("count", Number(count));
    setNftCount(Number(count));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    getNftCount();
  }, [getNftCount, walletState]);

  const mintNft = async () => {
    if (!wallet || !walletState || !web3Provider) return;
    try {
      setLoading(true);
      let smartAccount = wallet;
      const nftContract = new ethers.Contract(
        config.nft.address,
        config.nft.abi,
        web3Provider
      );
      console.log("smartAccount.address ", smartAccount.address);
      const safeMintTx = await nftContract.populateTransaction.safeMint(
        config.nft.address
      );
      let transactions: Array<txnInterface> = [];
      if (data.length > 0) {
        transactions = data.map((address: string) => {
          showSuccessMessage(`address: ${address.slice(0, 42)}`);
          const txn = {
            to: config.nft.address,
            data: safeMintTx.data,
            gasLimit: 6000000,
          };
          return txn;
        });
      }
      const txns: Array<txnInterface> = transactions.map((txnData: any) => {
        return txnData;
      });
      console.log(txns);
      if (txns.length > 0) {
        const txResponse = await smartAccount.sendTransaction({
          transaction: txns[0],
        });
        console.log("Tx sent, userOpHash:", txResponse);
        console.log("Waiting for tx to be mined...");
        const txHash = await txResponse.wait();
        console.log("txHash", txHash);
        showSuccessMessage(
          `Minted Nft ${txHash.transactionHash}`,
          txHash.transactionHash
        );
      } else {
        showErrorMessage("No transactions found.");
      }
      setLoading(false);
      await new Promise((resolve) => setTimeout(resolve, 2000));
      getNftCount();
    } catch (err: any) {
      setLoading(false);
      showErrorMessage(err.message || "Error in sending the transaction");
    }
  };

  // This state will store the parsed data
  const [data, setData] = useState<Array<any>>([]);

  // It state will contain the error when
  // correct file extension is not used
  const [error, setError] = useState("");

  // It will store the file uploaded by the user
  const [file, setFile] = useState();

  // This function will be called when
  // the file input changes

  const allowedExtensions = ["csv"];
  const handleFileChange = (e: any) => {
    setError("");

    // Check if user has entered the file
    if (e.target.files.length) {
      const inputFile = e.target.files[0];

      // Check the file extensions, if it not
      // included in the allowed extensions
      // we show the error
      const fileExtension = inputFile?.type.split("/")[1];
      if (!allowedExtensions.includes(fileExtension)) {
        setError("Please input a csv file");
        return;
      }

      // If input type is correct set the state
      setFile(inputFile);
    }
  };
  const handleParse = () => {
    // If user clicks the parse button without
    // a file we show a error
    if (!file) return setError("Enter a valid file");

    // Initialize a reader which allows user
    // to read any file or blob.
    const reader = new FileReader();

    // Event listener on reader when the file
    // loads, we parse it and set the data.
    reader.onload = async ({ target }) => {
      const csv: any = Papa.parse(target?.result as any, { header: true });
      const parsedData = csv?.data;
      console.log(parsedData);
      const columns = parsedData.map((data: any, index: any) => {
        const keyData = Object.values(parsedData[index]).toString();
        const address = keyData.split("//");
        return address[0];
      });
      setData(columns);
    };
    reader.readAsText(file);
  };

  return (
    <main className={classes.main}>
      <h3 className={classes.subTitle}>Mint NFT</h3>

      <p>
        Nft Contract Address: {"0x85cc96421966f8f1b3f1498f25554e949af9a833"}{" "}
      </p>
      <p style={{ marginBottom: 30, marginTop: 30, fontSize: 24 }}>
        Nft Balance in SCW:{" "}
        {nftCount === null ? (
          <p style={{ color: "#7E7E7E", display: "contents" }}>fetching...</p>
        ) : (
          nftCount
        )}
      </p>

      <div>
        <label htmlFor="csvInput" style={{ display: "block" }}>
          Enter CSV File
        </label>
        <input
          className={classes.input}
          onChange={handleFileChange}
          id="csvInput"
          name="file"
          type="File"
        />
        <div>
          <Button title="Parse data" onClickFunc={handleParse} />
        </div>
        <div style={{ marginTop: "3rem" }}>
          {error ? error : data.map((col, idx) => <div key={idx}>{col}</div>)}
        </div>
      </div>
      <Button title="Mint NFT" isLoading={loading} onClickFunc={mintNft} />
    </main>
  );
};

const useStyles = makeStyles(() => ({
  main: {
    padding: "10px 40px",
    color: "#000000",
  },
  subTitle: {
    color: "#000000",
    fontSize: 36,
    margin: 0,
  },
  h3Title: {
    color: "#e6e6e6",
  },
  input: {
    width: "max-content",
    background: "#645CAA",
    position: "relative",
    cursor: "pointer",
    border: 0,
    borderRadius: "6px",
    height: 40,
    lineHeight: "36px",
    padding: "0px 12px",
    display: "flex",
    alignItems: "center",
    color: "#E6E6E6",
    transition: "0.3s",
    fontSize: 17,
    marginBottom: "20px",

    "@media (max-width:599px)": {
      padding: "0 5px",
    },

    "&:hover": {
      backgroundColor: "#645CAA",
    },

    // disable button
    "&:disabled": {
      cursor: "not-allowed",
      opacity: 0.5,
    },

    "& div": {
      "@media (max-width:599px)": {
        margin: 0,
        display: "none",
      },
    },
  },
}));

export default MintNft;
