import "./Loading.css";
import LinearProgress from "@mui/material/LinearProgress";

function Loading(props) {
  const { message = "Loading" } = props;
  return (
    <div className="grid place-items-center h-screen">
      <div id="loadingLabel">
        <p>{message}</p>
        <LinearProgress />
      </div>
    </div>
  );
}

export default Loading;
