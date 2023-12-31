import axios from "axios";
import { useEffect, useState } from "react";

const useRugbyFixtures = () => {
  const [rugbyFixtures, setRugbyFixtures] = useState([]);
  const [loading, setLoading] = useState(true);
  const [dates, setDates] = useState(true);

  useEffect(() => {
    const fetchFixtures = async () => {
      try {
        const data = await axios.get(
          "https://apis.tisini.co.ke/apiagent2.php?fixtype=rugby15"
        );

        const groupDataByDate = (data) => {
          const groupedData = {};

          data.forEach((item) => {
            const date = item.game_date.split(" ")[0]; // Extract the date without the time part
            if (!groupedData[date]) {
              groupedData[date] = [];
            }
            groupedData[date].push(item);
          });

          return groupedData;
        };

        // console.log(data.data);

        const groupedData = groupDataByDate(data.data);

        // console.log(groupedData);

        const groupDataByLeague = (data) => {
          const groupedData = {};

          for (const [key, value] of Object.entries(data)) {
            if (!groupedData[key]) {
              groupedData[key] = {};
            }

            value.forEach((item) => {
              const league = item.league;

              if (!groupedData[key][league]) {
                groupedData[key][league] = [];
              }

              groupedData[key][league].push(item);
            });
          }

          return groupedData;
        };

        const fixtures = groupDataByLeague(groupedData);

        setDates(Object.keys(fixtures));
        // setRugbyFixtures(Object.entries(fixtures));
        setRugbyFixtures(fixtures);
        setLoading(false);
      } catch (error) {
        console.error(error);
      }
    };

    fetchFixtures();
  }, []);

  // console.log(rugbyFixtures);

  return [rugbyFixtures, dates, loading];
};

export default useRugbyFixtures;
