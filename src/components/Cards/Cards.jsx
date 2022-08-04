import React from "react";
import styles from "./Cards.module.css";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import { CircularProgress } from "@mui/material";
import CountUp from "react-countup";

export default function Cards({
  data: { NewConfirmed, NewDeaths, Retrieved, TotalConfirmed, TotalDeaths },
}) {
  if (!TotalConfirmed) {
    return <CircularProgress />;
  }

  return (
    <div className={styles.container}>
      <Grid container space={3} sx={{ justifyContent: "center" }}>
        <Grid
          item
          xs={12}
          md={2}
          className={`${styles.card} ${styles.infected}`}
        >
          <Card>
            <CardContent>
              <Typography color="text.secondary" gutterBottom>
                Total Confirmed
              </Typography>
              <Typography variant="h5">
                <CountUp end={TotalConfirmed} duration={0.5} separator="," />
              </Typography>
              <Typography color="text.secondary">
                Date Retrieved: {new Date(Retrieved).toDateString()}
              </Typography>
              <Typography variant="body2">
                Number of active cases of COVID-19
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid
          item
          xs={12}
          md={2}
          className={`${styles.card} ${styles.newInfected}`}
        >
          <Card>
            <CardContent>
              <Typography color="text.secondary" gutterBottom>
                New Infected
              </Typography>
              <Typography variant="h5">
                <CountUp end={NewConfirmed} duration={0.5} separator="," />
              </Typography>
              <Typography color="text.secondary">
                Date Retrieved: {new Date(Retrieved).toDateString()}
              </Typography>
              <Typography variant="body2">
                Number of new cases of COVID-19
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={2} className={`${styles.card} ${styles.deaths}`}>
          <Card>
            <CardContent>
              <Typography color="text.secondary" gutterBottom>
                Total Deaths
              </Typography>
              <Typography variant="h5">
                <CountUp end={TotalDeaths} duration={0.5} separator="," />
              </Typography>
              <Typography color="text.secondary">
                Date Retrieved: {new Date(Retrieved).toDateString()}
              </Typography>
              <Typography variant="body2">
                Number of deaths caused by COVID-19
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid
          item
          xs={12}
          md={2}
          className={`${styles.card} ${styles.newDeaths}`}
        >
          <Card>
            <CardContent>
              <Typography color="text.secondary" gutterBottom>
                New Deaths
              </Typography>
              <Typography variant="h5">
                <CountUp end={NewDeaths} duration={0.5} separator="," />
              </Typography>
              <Typography color="text.secondary">
                Date Retrieved: {new Date(Retrieved).toDateString()}
              </Typography>
              <Typography variant="body2">
                Number of new deaths from COVID-19
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
}
