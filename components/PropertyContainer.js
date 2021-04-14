import PropertyFilter from "./PropertyFilter";
import PropertyList from "./PropertyList";
import Loading from "./Loading";
import {useRouter} from "next/router"
import { withPropertyConsumer } from "../contexts/PropertyContext";

function PropertyContainer({ context }) {
  // const location = useLocation();
  const router = useRouter()
  var fromPage = router.query !== undefined ? router.query.purpose : null;

  const { loading, properties, sortedProperties } = context;
  if (loading) {
    return <Loading />;
  }
  return (
    <>
      <PropertyFilter properties={properties} defaultFilter={fromPage} />
      <PropertyList properties={sortedProperties} />
    </>
  );
}

export default withPropertyConsumer(PropertyContainer);
