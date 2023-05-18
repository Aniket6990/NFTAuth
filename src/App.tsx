import React from "react";
import { makeStyles } from "@mui/styles";
import { ToastContainer } from "react-toastify";
import TabsBody from "./components/TabsBody";
import { useSmartAccountContext } from "./contexts/SmartAccountContext";
import { useWeb3AuthContext } from "./contexts/SocialLoginContext";
import Button from "./components/Button";

const App: React.FC = () => {
  const classes = useStyles();
  const { connect, address, loading: eoaWalletLoading } = useWeb3AuthContext();
  const { loading } = useSmartAccountContext();

  if (!address) {
    return (
      <div className={classes.bgCover}>
        <div className={classes.container}>
          <h1 className={classes.title}>
            <img
              width={60}
              style={{
                marginRight: 20,
              }}
              src="/logo.svg"
              alt=""
            />
            TWallet
          </h1>
          <Button
            style={{
              marginRight: 20,
              height: 50,
              borderRadius: "50px",
              paddingRight: "20px",
              paddingLeft: "20px",
            }}
            title="Get Started"
            onClickFunc={connect}
            isLoading={eoaWalletLoading}
          />
        </div>
        <div className={classes.slogan}>
          <img className={classes.curveImg} src="/img/curve.svg" alt="curve" />
          <h1>Discover the Benefits of Token with Security</h1>
          <p className={classes.subTitle}>
            Safety tokens offered by our website are designed to provide a
            secure and reliable investment option with minimal risk and high
            returns.
          </p>
          <Button
            style={{
              marginRight: 20,
              height: 50,
              borderRadius: "50px",
              paddingRight: "20px",
              paddingLeft: "20px",
            }}
            title={`Get Started`}
            onClickFunc={connect}
            isLoading={eoaWalletLoading}
          />
        </div>
      </div>
    );
  }

  return (
    <div className={classes.bgCover}>
      <TabsBody loading={loading} />
      <ToastContainer position="bottom-left" newestOnTop theme="dark" />
    </div>
  );
};

const useStyles = makeStyles(() => ({
  bgCover: {
    width: "100%",
    height: "fit-content",
    background: "#FFFFFF",
    display: "flex",
    flexDirection: "column",
    color: "#e6e6e6",
    justifyContent: "start",
    alignItems: "center",
  },
  container: {
    width: "100%",
    height: "15vh",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: "30px",
    justifyContent: "space-between",
  },
  title: {
    display: "flex",
    flexDirection: "row",
    gap: "10px",
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 20,
    fontSize: 50,
    fontWeight: 200,
    color: "#000000",
  },
  curveImg: {
    position: "absolute",
    top: "30vh",
    left: 0,
  },
  slogan: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    fontSize: "44px",
    fontWeight: 700,
    color: "#000000",
    width: "60%",
    textAlign: "center",
    gap: "30px",
  },
  subTitle: {
    fontSize: 22,
  },
}));

export default App;
