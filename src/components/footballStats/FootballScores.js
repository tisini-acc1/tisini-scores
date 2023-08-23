import React, { useEffect, useState } from "react";
import useFootballFixtures from "../../hooks/useFootballFixtures";
import { Box, Typography, useMediaQuery, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import Spinner from "../loading/Spinner";
import SingleResult from "./SingleResult";

const FootballScores = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [ballFixtures, ballDates, ballState] = useFootballFixtures();

  const [fixtures, setFixtures] = useState([]);
  const [filterDate, setFilterDate] = useState(ballDates[0]);

  const isSmallScreen = useMediaQuery((theme) => theme.breakpoints.down("sm"));

  useEffect(() => {
    setFilterDate(ballDates[0]);
  }, [ballDates]);

  useEffect(() => {
    const fetchDayFixtures = () => {
      const date = filterDate;
      ballFixtures.forEach((day) => {
        if (day[0] === date) {
          setFixtures(Object.entries(day[1]));
        }
      });
    };

    fetchDayFixtures();
  }, [ballFixtures, ballDates, filterDate]);

  if (ballState) {
    return <Spinner />;
  }

  return (
    <Box display="flex" flexDirection="row" width="100%" p={0.5} pt={0}>
      {!isSmallScreen && (
        <Box
          mr={0.5}
          width={`${100 - 85}%`}
          border="1px solid black"
          bgcolor={colors.primary[400]}
        >
          Kenya
        </Box>
      )}

      <Box width="100%" mt={0.5}>
        {fixtures.map((league, key) => (
          <Box mb={2} key={key}>
            <Box display="flex" bgcolor={colors.primary[600]} mb={0.2} p={0.7}>
              <Box display="flex" gap={0.5} color={colors.gray[100]}>
                <Typography variant="h6" fontSize="small" fontWeight="bold">
                  Kenya:
                </Typography>
                <Typography variant="h6" fontSize="small" fontWeight="bold">
                  {league[0]}
                </Typography>
              </Box>
            </Box>

            {league[1].map((fixtures, key) => (
              <Box key={key}>
                <SingleResult
                  homeTeam={fixtures.team1_name}
                  awayTeam={fixtures.team2_name}
                  homeScore={fixtures.home_score}
                  awayScore={fixtures.away_score}
                  fixtureId={fixtures.id}
                  fixtureType={fixtures.fixture_type}
                  fixtureState={fixtures.game_status}
                  minute={fixtures.minute}
                />
              </Box>
            ))}
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default FootballScores;