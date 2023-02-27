import '../style/components/Dashboard.css';
import AverageLineChart from './Charts/AverageLineChart';
import DailyBarChart from './Charts/DailyBarChart';
import Nutritional from './Nutritional';
import ObjectifRadialChart from './Charts/ObjectifRadialChart';
import PerformanceRadarChart from './Charts/PerformanceRadarChart';
import { useEffect, useState } from 'react';

const Dashboard = ({ data }) => {
  const [userName, setUserName] = useState();
  const [nutritionalDatas, setNutritionalDatas] = useState();
  const [userSessions, setUserSessions] = useState();
  const [userSessionsLength, setUserSessionsLength] = useState();
  const [userPerformance, setUserPerformance] = useState();
  const [userObjectives, setUserObjectives] = useState();

  useEffect(() => {
    if (data) {
      setUserName(data.userMainData.userInfos.firstName);
      setNutritionalDatas(data.userMainData.nutritionals);
      setUserSessions(data.userActivity.sessions);
      setUserSessionsLength(data.userAverageSessions.sessions);
      setUserPerformance(data.userPerformance);
      setUserObjectives(data.userMainData.todayScore);
    }
  }, [data]);

  return (
    <div className="dashboard">
      <div className="dashboard__header">
        <p className="dashboard__header__greetings">
          Bonjour <span className="dashboard__header__greetings__name">{userName}</span>
        </p>
        <p className="dashboard__header__feedback">
          Félicitation ! Vous avez explosé vos objectifs hier 👏
        </p>
      </div>
      <div className="dashboard__stats">
        <div className="charts">
          <div className="charts-top">
            {userSessions ? <DailyBarChart data={userSessions} /> : null}
          </div>
          <div className="charts-bottom">
            {userSessionsLength ? <AverageLineChart data={userSessionsLength} /> : null}
            {userPerformance ? <PerformanceRadarChart data={userPerformance} /> : null}
            {userObjectives ? <ObjectifRadialChart data={userObjectives} /> : null}
          </div>
        </div>
        <div className="nutritionals">
          {nutritionalDatas
            ? Object.keys(nutritionalDatas).map((dataKey, index) => (
                <Nutritional key={index} data={{ key: dataKey, data: nutritionalDatas[dataKey] }} />
              ))
            : null}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
