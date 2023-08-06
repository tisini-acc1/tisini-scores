import { tokens } from "../../theme";
import React, { useEffect, useState } from "react";
import SingleResult from "../footballStats/SingleResult";
import { Box, Typography, useMediaQuery, useTheme } from "@mui/material";

const RugbyScores = ({ allFixtures, dates, loading }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [fixtures, setFixtures] = useState([]);

  const isSmallScreen = useMediaQuery((theme) => theme.breakpoints.down("sm"));

  useEffect(() => {
    const fetchDayFixtures = () => {
      allFixtures.forEach((day) => {
        if (day[0] === dates[0]) {
          setFixtures(Object.entries(day[1]));
        }
      });
    };

    fetchDayFixtures();
  }, [allFixtures, dates, loading]);

  // console.log(fixtures);
  // console.log(dates[0]);
  // console.log(allFixtures);

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
              <Box display="flex" color={colors.gray[100]} gap={0.5}>
                <Typography variant="h6" fontSize="small" fontWeight="bold">
                  Kenya:
                </Typography>
                <Typography variant="h6" fontSize="small" fontWeight="bold">
                  {league[0]} - {league[1][0].series}
                </Typography>
              </Box>
            </Box>

            {league[1].map((fixtures, key) => (
              <Box key={key}>
                {fixtures["status"] !== "inactive" && (
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
                )}
              </Box>
            ))}
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default RugbyScores;
