import React from 'react';
import moment from 'moment';
import IpcService from 'renderer/lib/ipc-service';
import { useParams, RouteComponentProps } from 'react-router';
import { Affix, Avatar, Card, PageHeader, Space, Spin, Typography } from 'antd';
import { CaretLeftFilled, UserOutlined } from '@ant-design/icons';
import { TeamInfoResponse } from 'shared/types';
import * as IPCRouting from 'shared/ipc-routing';


interface RouteParams {
  id?: string;
}


/**
 * MATCH RESULT COMPONENT
 */

function MatchResult( props: any ) {
  const team1win = props.match.m[ 0 ] > props.match.m[ 1 ];
  const team2win = props.match.m[ 1 ] > props.match.m[ 0 ];
  const team1text = [
    <span key="team1_flag" className={`fp ${props.match.team1.Country.code.toLowerCase()}`} />,
    props.match.team1.name
  ];
  const team2text = [
    <span key="team2_flag" className={`fp ${props.match.team2.Country.code.toLowerCase()}`} />,
    props.match.team2.name
  ];

  return (
    <Card.Grid style={{ width: '50%' }}>
      <p className="small-caps">
        <Typography.Text type="secondary">{props.description}</Typography.Text>
      </p>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <Space direction="vertical">
          {team1win
            ? <p>{team1text}</p>
            : <p><Typography.Text type="secondary">{team1text}</Typography.Text></p>
          }
          {team2win
            ? <p>{team2text}</p>
            : <p><Typography.Text type="secondary">{team2text}</Typography.Text></p>
          }
        </Space>
        <Space size="middle">
          <Space direction="vertical">
            <p>
              {team1win
                ? [ props.match.m[ 0 ], <CaretLeftFilled key="team1" /> ]
                : <Typography.Text type="secondary">{props.match.m[ 0 ]}</Typography.Text>
              }
            </p>
            <p>
              {team2win
                ? [ props.match.m[ 1 ], <CaretLeftFilled key="team1" /> ]
                : <Typography.Text type="secondary">{props.match.m[ 1 ]}</Typography.Text>
              }
            </p>
          </Space>
          <Space direction="vertical" align="center">
            <Typography.Text type="secondary">
              {moment( props.date ).format( 'MM/DD/YY' )}
            </Typography.Text>
            <p>{props.match.data.map}</p>
          </Space>
        </Space>
      </div>
    </Card.Grid>
  );
}


/**
 * Team Route Component
 */

function Team( props: RouteComponentProps ) {
  const { id } = useParams<RouteParams>();
  const [ data, setData ] = React.useState<TeamInfoResponse>();
  const [ loading, setLoading ] = React.useState( true );

  React.useEffect( () => {
    IpcService
      .send( IPCRouting.Database.TEAM_GET, {
        params: { id }
      })
      .then( res => { setData( res ); setLoading( false ); })
    ;
  }, []);

  if( loading || !data ) {
    return (
      <div id="team">
        <PageHeader
          ghost={false}
          title={<Spin />}
        />
      </div>
    );
  }

  return (
    <div id="team">
      <Affix>
        <PageHeader
          ghost={false}
          title={'Team Info'}
          onBack={() => props.history.goBack()}
        />
      </Affix>

      <section className="content">
        <Space align="start">
          <Avatar size={128} icon={<UserOutlined />} />
          <Space direction="vertical">
            <Typography.Title>
              <span className={`fp ${data.Country.code.toLowerCase()}`} />
              {data.name}
            </Typography.Title>
          </Space>
        </Space>

        <Card className="ant-card-contain-grid" style={{ marginTop: 20 }}>
          {data.matches.map( match => (
            <MatchResult
              key={JSON.stringify( match.match.id )}
              {...match}
            />
          ))}
        </Card>
      </section>
    </div>
  );
}


export default Team;
