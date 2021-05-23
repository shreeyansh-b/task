import { useState } from "react";
import useFetch from "../hooks/useFetch";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TablePagination,
  TableRow,
  TableSortLabel,
  Avatar,
  Checkbox,
  TableHead,
  Button,
} from "@material-ui/core";
import _ from "lodash";
import { useRouter } from "next/router";

import { makeStyles } from "@material-ui/core/styles";

import Skeleton from "@material-ui/lab/Skeleton";

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

const Landing = (props) => {
  const router = useRouter();
  const classes = useStyles();

  const [maxBidType, setMaxBidType] = useState(true);

  const [response, loading, error] = useFetch(
    "https://intense-tor-76305.herokuapp.com/merchants/",
    {}
  );
  const [currentSortType, setCurrentSortType] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const merchantsWithMaxAndMinBids = response?.map((merchant) => {
    return {
      ...merchant,
      maxBid: _.maxBy(merchant.bids, function (o) {
        return o.amount;
      }),
      minBid: _.minBy(merchant.bids, function (o) {
        return o.amount;
      }),
    };
  });

  const sortedMerchantsPerBid = currentSortType
    ? _.orderBy(
        merchantsWithMaxAndMinBids,
        function (o) {
          if (maxBidType && o.maxBid) {
            return o.maxBid.amount;
          } else if (!maxBidType && o.minBid) {
            return o.minBid.amount;
          } else if (!o.maxBid && !o.minBid) {
            if (currentSortType === "desc") {
              return -Infinity;
            } else if (currentSortType === "asc") {
              return Infinity;
            }
          }
        },
        currentSortType
      )
    : merchantsWithMaxAndMinBids;

  const merchantsForCurrentPage = sortedMerchantsPerBid?.filter(
    (merchant, index) => {
      if (
        index >= currentPage * rowsPerPage &&
        index <= (currentPage + 1) * rowsPerPage - 1
      ) {
        return merchant;
      }
    }
  );

  const bidTypeHandler = (merchant) => {
    if (maxBidType && merchant.maxBid) {
      return merchant.maxBid;
    } else if (!maxBidType && merchant.minBid) {
      return merchant.minBid;
    } else if (!merchant.maxBid && !merchant.minBid) {
      return <i>No bids placed</i>;
    }
  };

  if (loading)
    return (
      <>
        <Skeleton animation="wave" variant="rect" className={classes.media} />
      </>
    );

  return (
    <Paper className={classes.root}>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-end",
          margin: "1rem",
        }}
      >
        <Button
          title="Toggle between max and min bid"
          variant="outlined"
          color="secondary"
          size="small"
          onClick={() => setMaxBidType((prev) => !prev)}
        >
          {!maxBidType ? "Max " : "Min "} bid
        </Button>
        <TableContainer className={classes.container}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                <TableCell component="th" scope="row">
                  <span>Customer name</span>
                </TableCell>
                <TableCell component="th" scope="row">
                  <span>Email</span>
                </TableCell>
                <TableCell align="center" component="th" scope="row">
                  <span>Phone</span>
                </TableCell>
                <TableCell align="center" component="th" scope="row">
                  <span>Premium user</span>
                </TableCell>
                <TableCell align="center" component="th" scope="row">
                  <TableSortLabel
                    active={currentSortType}
                    direction={currentSortType ?? ""}
                    onClick={() => {
                      setCurrentSortType((prevSortType) => {
                        if (!prevSortType) {
                          return "desc";
                        } else if (prevSortType === "desc") {
                          return "asc";
                        } else if (prevSortType === "asc") {
                          return "desc";
                        }
                      });
                    }}
                  >
                    <span>{maxBidType ? "Max bid" : "Min bid"}</span>
                  </TableSortLabel>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {merchantsForCurrentPage?.map((merchant, index) => (
                <TableRow
                  hover
                  key={index}
                  onClick={() => {
                    router.push(`/merchant/${merchant.id}`);
                  }}
                  style={{ cursor: "pointer" }}
                >
                  <TableCell
                    component="th"
                    scope="row"
                    padding="none"
                    title={`View ${merchant.firstname} ${merchant.lastname}`}
                  >
                    <div
                      style={{
                        textTransform: "capitalize",
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      <Avatar
                        alt={`${merchant.firstname} ${merchant.lastname}`}
                        src={merchant.avatarUrl}
                      />
                      <span style={{ marginLeft: "10px" }}>
                        {merchant.firstname} {merchant.lastname}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell component="th" scope="row" padding="none">
                    <span>{merchant.email}</span>
                  </TableCell>
                  <TableCell
                    align="center"
                    component="th"
                    scope="row"
                    padding="none"
                  >
                    <span>{merchant.phone}</span>
                  </TableCell>
                  <TableCell
                    align="center"
                    component="th"
                    scope="row"
                    padding="none"
                  >
                    <Checkbox checked={merchant.hasPremium} />
                  </TableCell>
                  <TableCell
                    align="center"
                    component="th"
                    scope="row"
                    padding="none"
                  >
                    <span>
                      {bidTypeHandler(merchant).amount ??
                        bidTypeHandler(merchant)}
                    </span>
                    <span
                      style={{
                        display: "block",
                        color: "#3f3f3f",
                        fontSize: "small",
                        textTransform: "capitalize",
                      }}
                    >
                      {bidTypeHandler(merchant).carTitle ?? null}
                    </span>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[]}
          component="div"
          count={response?.length}
          rowsPerPage={rowsPerPage}
          page={currentPage}
          onChangePage={(e, newPage) => {
            setCurrentPage(newPage);
          }}
        />
      </div>
    </Paper>
  );
};
export default Landing;
