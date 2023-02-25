import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setAppState } from "../../redux/features/appStateSlice";

const PageWrapper = ({ state, children }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setAppState(state));
  }, []);

  return <div>PageWrapper</div>;
};

export default PageWrapper;
