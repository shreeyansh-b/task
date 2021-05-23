import useFetch from "../../hooks/useFetch";
import { useRouter } from "next/router";
import Merchant from "../../components/Merchant";
import { Container } from "@material-ui/core";
import Skeleton from "@material-ui/lab/Skeleton";
import { makeStyles } from "@material-ui/core/styles";

//   styling
const useStyles = makeStyles({
  media: {
    minHeight: 300,
  },
});

const MerchantPage = () => {
  const router = useRouter();
  const classes = useStyles();

  const { merchantid } = router.query;
  const [merchantData, loading, error] = useFetch(
    `https://intense-tor-76305.herokuapp.com/merchants/${merchantid}`
  );

  if (loading)
    return (
      <>
        <Container>
          <Skeleton animation="wave" variant="rect" className={classes.media} />
        </Container>
      </>
    );

  return (
    <Container>
      <Merchant merchant={merchantData} />
    </Container>
  );
};
export default MerchantPage;
