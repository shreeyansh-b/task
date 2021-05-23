import useFetch from "../../hooks/useFetch";
import { useRouter } from "next/router";
import Merchant from "../../components/Merchant";
import { Container } from "@material-ui/core";

const MerchantPage = () => {
  const router = useRouter();
  const { merchantid } = router.query;
  const [merchantData, loading, error] = useFetch(
    `https://intense-tor-76305.herokuapp.com/merchants/${merchantid}`
  );

  if (loading) return <></>;

  return (
    <Container>
      <Merchant merchant={merchantData} />
    </Container>
  );
};
export default MerchantPage;
