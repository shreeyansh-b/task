import {
  Avatar,
  Card,
  CardContent,
  CardHeader,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  TableHead,
  Typography,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import moment from "moment";

//   styling
const useStyles = makeStyles({
  root: {
    width: "100%",
  },
  container: {
    maxHeight: 440,
  },
  media: {
    minHeight: 300,
  },
});

const Merchant = (props) => {
  const { merchant } = props;
  const classes = useStyles();

  return (
    <>
      {merchant ? (
        <Card>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <CardHeader
              avatar={
                <Avatar
                  alt={`${merchant.firstname} ${merchant.lastname}`}
                  src={merchant.avatarUrl}
                />
              }
              title={`${merchant.firstname} ${merchant.lastname}`}
              subheader={merchant.email}
            ></CardHeader>
          </div>

          <CardContent>
            <Typography align="center">Bids placed</Typography>
            <TableContainer className={classes.container}>
              <Table stickyHeader aria-label="sticky table">
                <TableHead>
                  <TableRow>
                    <TableCell align="center" component="th" scope="row">
                      <span>Car</span>
                    </TableCell>
                    <TableCell align="center" component="th" scope="row">
                      <span>Amount </span>
                    </TableCell>
                    <TableCell align="center" component="th" scope="row">
                      <span>Bid placed on</span>
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {merchant.bids?.map((bid, index) => (
                    <TableRow hover key={index}>
                      <TableCell
                        align="center"
                        component="th"
                        scope="row"
                        padding="none"
                      >
                        <span style={{ textTransform: "capitalize" }}>
                          {bid.carTitle}
                        </span>
                      </TableCell>
                      <TableCell
                        align="center"
                        component="th"
                        scope="row"
                        padding="none"
                      >
                        <span>{bid.amount}</span>
                      </TableCell>
                      <TableCell
                        align="center"
                        component="th"
                        scope="row"
                        padding="none"
                      >
                        <span>{moment(+bid.created).format("LLL")}</span>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </CardContent>
        </Card>
      ) : null}
    </>
  );
};
export default Merchant;
